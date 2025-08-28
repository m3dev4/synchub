"use client";

import React from "react";
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
  RefreshCw,
} from "lucide-react";
import { useNotifications } from "@/contexts/NotificationContext";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

const NotificationsPage = () => {
  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotifications,
    fetchNotifications,
  } = useNotifications();

  const [selectedNotifications, setSelectedNotifications] = React.useState<
    string[]
  >([]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "FOLLOW":
        return <UserPlus className="w-5 h-5 text-blue-500" />;
      case "LIKE":
        return <Heart className="w-5 h-5 text-red-500" />;
      case "COMMENT":
        return <MessageCircle className="w-5 h-5 text-green-500" />;
      case "MESSAGE":
        return <MessageCircle className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
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

  return (
    <div className="min-h-screen w-full py-6 my-7">
      <div className="mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-6 h-6" />
                <CardTitle className="text-2xl">Notifications</CardTitle>
                {unreadCount > 0 && (
                  <Badge variant="destructive">
                    {unreadCount} non lue{unreadCount > 1 ? "s" : ""}
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchNotifications(1)}
                  disabled={loading}
                >
                  <RefreshCw
                    className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
                  />
                  Actualiser
                </Button>

                {unreadCount > 0 && (
                  <Button variant="outline" size="sm" onClick={markAllAsRead}>
                    <CheckCheck className="w-4 h-4 mr-2" />
                    Tout marquer comme lu
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* Actions pour sélection multiple */}
            {selectedNotifications.length > 0 && (
              <div className="p-4 bg-muted/50 border-b flex gap-2">
                <Badge variant="secondary">
                  {selectedNotifications.length} sélectionnée
                  {selectedNotifications.length > 1 ? "s" : ""}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkSelectedAsRead}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Marquer comme lu
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDeleteSelected}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedNotifications([])}
                >
                  Annuler
                </Button>
              </div>
            )}

            <ScrollArea className="h-[600px]">
              {loading && notifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p>Chargement des notifications...</p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Bell className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">
                    Aucune notification
                  </h3>
                  <p>Vous n'avez pas encore reçu de notifications.</p>
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                        !notification.read
                          ? "bg-blue-50/50 dark:bg-blue-950/20 border-l-4 border-l-blue-500"
                          : ""
                      } ${
                        selectedNotifications.includes(notification.id)
                          ? "bg-muted"
                          : ""
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start gap-4">
                        <input
                          type="checkbox"
                          checked={selectedNotifications.includes(
                            notification.id,
                          )}
                          onChange={() =>
                            handleSelectNotification(notification.id)
                          }
                          onClick={(e) => e.stopPropagation()}
                          className="mt-2"
                        />

                        <div className="flex-shrink-0 mt-1">
                          {notification.data?.followerAvatar ? (
                            <Avatar className="w-10 h-10">
                              <AvatarImage
                                src={notification.data.followerAvatar}
                              />
                              <AvatarFallback>
                                <User className="w-5 h-5" />
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                              {getNotificationIcon(notification.type)}
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-sm">
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                            )}
                          </div>

                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>

                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(
                                new Date(notification.createdAt),
                                {
                                  addSuffix: true,
                                  locale: fr,
                                },
                              )}
                            </p>

                            <Badge
                              variant={
                                notification.read ? "secondary" : "default"
                              }
                              className="text-xs"
                            >
                              {notification.read ? "Lu" : "Non lu"}
                            </Badge>
                          </div>
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
    </div>
  );
};

export default NotificationsPage;
