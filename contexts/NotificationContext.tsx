"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useAuthStore } from "@/stores/auth/authState";
import { toast } from "sonner";
import { io, Socket } from "socket.io-client";

interface Notification {
  id: string;
  userId: string;
  type:
    | "FOLLOW"
    | "UNFOLLOW"
    | "FOLLOW_REQUEST"
    | "LIKE"
    | "COMMENT"
    | "MESSAGE";
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: Date;
}

interface NotificationEvent {
  id: string;
  userId: string;
  type:
    | "FOLLOW"
    | "UNFOLLOW"
    | "FOLLOW_REQUEST"
    | "LIKE"
    | "COMMENT"
    | "MESSAGE";
  title: string;
  message: string;
  data?: any;
  createdAt: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  fetchNotifications: (page?: number, limit?: number) => Promise<void>;
  markAsRead: (notificationIds: string[]) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotifications: (notificationIds: string[]) => Promise<void>;
  refetch: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const { user } = useAuthStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  // Son de notification
  const playNotificationSound = useCallback(() => {
    try {
      // Utiliser le son existant dans public/sounds/
      const audio = new Audio("/sounds/notification.mp3");
      audio.volume = 0.5;
      audio.play().catch(() => {
        // Fallback: créer un son synthétique si le fichier n'existe pas
        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(
          600,
          audioContext.currentTime + 0.1,
        );

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.3,
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      });
    } catch (error) {
      console.error("Error playing notification sound:", error);
    }
  }, []);

  // Initialiser Socket.IO
  useEffect(() => {
    if (!user?.id) return;

    const socketInstance = io(
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_SITE_URL || ""
        : "http://localhost:3000",
      {
        path: "/api/socket/io",
      },
    );

    socketInstance.on("connect", () => {
      console.log("Connected to socket server");
      socketInstance.emit("join-user-room", user.id);
    });

    socketInstance.on("notification", (notification: NotificationEvent) => {
      console.log("Received notification:", notification);

      // Ajouter la notification à la liste
      setNotifications((prev) => [
        {
          ...notification,
          read: false,
        },
        ...prev,
      ]);

      // Incrémenter le compteur non lu
      setUnreadCount((prev) => prev + 1);

      // Jouer le son
      playNotificationSound();

      // Afficher un toast
      toast.success(notification.title, {
        description: notification.message,
        duration: 5000,
      });
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.emit("leave-user-room", user.id);
        socketInstance.disconnect();
      }
    };
  }, [user?.id, playNotificationSound]);

  // Récupérer les notifications
  const fetchNotifications = useCallback(
    async (page = 1, limit = 20) => {
      if (!user?.id) return;

      setLoading(true);
      try {
        const response = await fetch(
          `/api/notifications?page=${page}&limit=${limit}`,
          {
            headers: {
              "x-user-id": user.id,
            },
          },
        );

        const result = await response.json();

        if (response.ok && result.success) {
          if (page === 1) {
            setNotifications(result.notifications);
          } else {
            setNotifications((prev) => [...prev, ...result.notifications]);
          }
          setUnreadCount(result.unreadCount);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        toast.error("Erreur lors du chargement des notifications");
      } finally {
        setLoading(false);
      }
    },
    [user?.id],
  );

  // Marquer comme lu
  const markAsRead = useCallback(
    async (notificationIds: string[]) => {
      if (!user?.id) return;

      try {
        const response = await fetch("/api/notifications", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": user.id,
          },
          body: JSON.stringify({ notificationIds }),
        });

        if (response.ok) {
          setNotifications((prev) =>
            prev.map((notif) =>
              notificationIds.includes(notif.id)
                ? { ...notif, read: true }
                : notif,
            ),
          );
          setUnreadCount((prev) => Math.max(0, prev - notificationIds.length));
        }
      } catch (error) {
        console.error("Error marking notifications as read:", error);
      }
    },
    [user?.id],
  );

  // Marquer toutes comme lues
  const markAllAsRead = useCallback(async () => {
    if (!user?.id) return;

    try {
      const response = await fetch("/api/notifications", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id,
        },
        body: JSON.stringify({ markAllAsRead: true }),
      });

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((notif) => ({ ...notif, read: true })),
        );
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  }, [user?.id]);

  // Supprimer des notifications
  const deleteNotifications = useCallback(
    async (notificationIds: string[]) => {
      if (!user?.id) return;

      try {
        const response = await fetch("/api/notifications", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": user.id,
          },
          body: JSON.stringify({ notificationIds }),
        });

        if (response.ok) {
          setNotifications((prev) =>
            prev.filter((notif) => !notificationIds.includes(notif.id)),
          );
          // Recalculer le compteur non lu
          setUnreadCount((prev) => {
            const deletedUnreadCount = notifications.filter(
              (notif) => notificationIds.includes(notif.id) && !notif.read,
            ).length;
            return Math.max(0, prev - deletedUnreadCount);
          });
        }
      } catch (error) {
        console.error("Error deleting notifications:", error);
      }
    },
    [user?.id, notifications],
  );

  // Charger les notifications au montage
  useEffect(() => {
    if (user?.id) {
      fetchNotifications();
    }
  }, [user?.id, fetchNotifications]);

  const refetch = useCallback(
    () => fetchNotifications(1),
    [fetchNotifications],
  );

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotifications,
    refetch,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
