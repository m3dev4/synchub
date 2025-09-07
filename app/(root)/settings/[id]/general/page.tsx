"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSessions, useDeleteSession } from "@/hooks/sessions/useSessions";
import { Session } from "@/types/session";
import {
  Trash2,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Clock,
  MapPin,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

const SecurityPage = () => {
  const { data: sessions, isLoading, error } = useSessions();
  const deleteSessionMutation = useDeleteSession();

  const getDeviceIcon = (userAgent: string) => {
    const ua = userAgent.toLowerCase();
    if (
      ua.includes("mobile") ||
      ua.includes("android") ||
      ua.includes("iphone")
    ) {
      return <Smartphone className="h-5 w-5" />;
    } else if (ua.includes("tablet") || ua.includes("ipad")) {
      return <Tablet className="h-5 w-5" />;
    } else {
      return <Monitor className="h-5 w-5" />;
    }
  };

  const getDeviceInfo = (userAgent: string) => {
    const ua = userAgent.toLowerCase();

    // Browser detection
    let browser = "Navigateur inconnu";
    if (ua.includes("chrome") && !ua.includes("edg")) browser = "Chrome";
    else if (ua.includes("firefox")) browser = "Firefox";
    else if (ua.includes("safari") && !ua.includes("chrome"))
      browser = "Safari";
    else if (ua.includes("edg")) browser = "Edge";
    else if (ua.includes("opera")) browser = "Opera";

    // OS detection
    let os = "OS inconnu";
    if (ua.includes("windows")) os = "Windows";
    else if (ua.includes("mac")) os = "macOS";
    else if (ua.includes("linux")) os = "Linux";
    else if (ua.includes("android")) os = "Android";
    else if (ua.includes("ios") || ua.includes("iphone") || ua.includes("ipad"))
      os = "iOS";

    return `${browser} sur ${os}`;
  };

  const handleDeleteSession = (sessionId: string) => {
    deleteSessionMutation.mutate(sessionId);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Géneral</h1>
          <p className="text-muted-foreground">
            Gérez vos sessions actives et la sécurité de votre compte
          </p>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Sécurité</h1>
          <p className="text-muted-foreground">
            Gérez vos sessions actives et la sécurité de votre compte
          </p>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8 text-red-500">
              <p>Erreur lors du chargement des sessions</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Sécurité</h1>
        <p className="text-muted-foreground">
          Gérez vos sessions actives et la sécurité de votre compte
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Sessions actives
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {sessions?.length || 0} session
            {(sessions?.length || 0) > 1 ? "s" : ""} active
            {(sessions?.length || 0) > 1 ? "s" : ""}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {sessions && sessions.length > 0 ? (
            sessions.map((session: Session) => (
              <div key={session.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getDeviceIcon(session.useAgent)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">
                          {getDeviceInfo(session.useAgent)}
                        </h3>
                        {session.isOnline && (
                          <Badge
                            variant="default"
                            className="bg-green-100 text-green-800 border-green-200"
                          >
                            En ligne
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{session.ipAddress}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            Dernière activité:{" "}
                            {formatDistanceToNow(
                              new Date(session.lastActivityAt),
                              {
                                addSuffix: true,
                                locale: fr,
                              },
                            )}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Créée le{" "}
                        {new Date(session.createdAt).toLocaleDateString(
                          "fr-FR",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </p>
                    </div>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        disabled={deleteSessionMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Supprimer cette session ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Cette action déconnectera définitivement cet appareil.
                          Vous devrez vous reconnecter pour accéder à votre
                          compte depuis cet appareil.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteSession(session.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Supprimer
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Aucune session active trouvée</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conseils de sécurité</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">🔒 Utilisez un mot de passe fort</h4>
              <p className="text-sm text-muted-foreground">
                Choisissez un mot de passe unique avec des lettres, chiffres et
                symboles.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">🔄 Déconnectez-vous régulièrement</h4>
              <p className="text-sm text-muted-foreground">
                Fermez vos sessions sur les appareils partagés ou publics.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">👀 Surveillez vos sessions</h4>
              <p className="text-sm text-muted-foreground">
                Vérifiez régulièrement les connexions suspectes ou inconnues.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">📱 Sécurisez vos appareils</h4>
              <p className="text-sm text-muted-foreground">
                Utilisez un code PIN, empreinte ou reconnaissance faciale.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityPage;
