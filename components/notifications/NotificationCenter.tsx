"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  User,
  Heart,
  MessageCircle,
  UserPlus,
  X,
} from "lucide-react";
import { useNotifications } from "@/contexts/NotificationContext";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotifications,
    fetchNotifications,
  } = useNotifications();

  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    [],
  );

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "FOLLOW":
        return <UserPlus className="w-4 h-4 text-blue-500" />;
      case "LIKE":
        return <Heart className="w-4 h-4 text-red-500" />;
      case "COMMENT":
        return <MessageCircle className="w-4 h-4 text-green-500" />;
      case "MESSAGE":
        return <MessageCircle className="w-4 h-4 text-purple-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleSelectNotification = (notificationId: string) => {
    setSelectedNotifications((prev) =>
      prev.includes(notificationId)
        ? prev.filter((id) => id !== notificationId)
        : [...prev, notificationId],
    );
  };

  const handleMarkSelectedAsRead = () => {
    if (selectedNotifications.length > 0) {
      markAsRead(selectedNotifications);
      setSelectedNotifications([]);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedNotifications.length > 0) {
      deleteNotifications(selectedNotifications);
      setSelectedNotifications([]);
    }
  };

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markAsRead([notification.id]);
    }

    // Navigation basée sur le type de notification
    if (notification.type === "FOLLOW" && notification.data?.followerId) {
      window.location.href = `/profile/${notification.data.followerId}`;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            <CardTitle>Notifications</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        {/* Actions */}
        <div className="px-6 pb-4 flex gap-2 flex-wrap">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs"
            >
              <CheckCheck className="w-3 h-3 mr-1" />
              Tout marquer comme lu
            </Button>
          )}

          {selectedNotifications.length > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkSelectedAsRead}
                className="text-xs"
              >
                <Check className="w-3 h-3 mr-1" />
                Marquer comme lu
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeleteSelected}
                className="text-xs text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Supprimer
              </Button>
            </>
          )}
        </div>

        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-full">
            {loading && notifications.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                Chargement...
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Aucune notification</p>
              </div>
            ) : (
              <div className="space-y-1">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                      !notification.read
                        ? "bg-blue-50/50 dark:bg-blue-950/20"
                        : ""
                    } ${
                      selectedNotifications.includes(notification.id)
                        ? "bg-muted"
                        : ""
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selectedNotifications.includes(
                          notification.id,
                        )}
                        onChange={() =>
                          handleSelectNotification(notification.id)
                        }
                        onClick={(e) => e.stopPropagation()}
                        className="mt-1"
                      />

                      <div className="flex-shrink-0">
                        {notification.data?.followerAvatar ? (
                          <Avatar className="w-8 h-8">
                            <AvatarImage
                              src={notification.data.followerAvatar}
                            />
                            <AvatarFallback>
                              <User className="w-4 h-4" />
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            {getNotificationIcon(notification.type)}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium truncate">
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatDistanceToNow(
                            new Date(notification.createdAt),
                            {
                              addSuffix: true,
                              locale: fr,
                            },
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
