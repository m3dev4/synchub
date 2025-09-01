import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface NotificationData {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: any;
  createdAt: Date;
}

export const useNotifications = () => {
  const socketRef = useRef<any>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectSocket = (userId: string) => {
    if (socketRef.current?.connected) {
      return;
    }

    // Import dynamique de socket.io-client
    import("socket.io-client").then(({ io }) => {
      const socket = io({
        path: "/api/socket/io",
      });

      socket.on("connect", () => {
        console.log("Socket connected:", socket.id);
        setIsConnected(true);

        // Rejoindre la room de l'utilisateur
        socket.emit("join-user-room", userId);
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected");
        setIsConnected(false);
      });

      socket.on("notification", (notification: NotificationData) => {
        console.log("Notification reçue:", notification);

        // Afficher la notification toast
        toast(notification.title, {
          description: notification.message,
          duration: 5000,
        });
      });

      socketRef.current = socket;
    });
  };

  const disconnectSocket = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    }
  };

  useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, []);

  return {
    connectSocket,
    disconnectSocket,
    isConnected,
  };
};
