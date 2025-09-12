"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link2, MapPin, MessageCircle, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserExperience from "@/components/user-experience";
import UserEducation from "@/components/user-education";
import { UserAvatar } from "@/components/ui/user-avatar";
import { User } from "@/types/user";
import { useFollow } from "@/hooks/follow/useFollow";
import { useAuthStore } from "@/stores/auth/authState";

const UserProfilePage = () => {
  const params = useParams();
  const userId = params?.id as string;
  const { user: currentUser } = useAuthStore();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hook pour gérer le follow/unfollow
  const {
    isFollowing,
    followersCount,
    followingCount,
    loading: followLoading,
    toggleFollow,
  } = useFollow(userId);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || "Utilisateur non trouvé");
        }

        setUser(result.user);
      } catch (err) {
        console.error("Erreur lors de la récupération de l'utilisateur:", err);
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Erreur</h1>
          <p className="text-muted-foreground mb-4">
            {error || "Utilisateur non trouvé"}
          </p>
          <Button asChild>
            <Link href="/profile">Retour au profil</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col w-full py-4 sm:py-6 my-2 sm:my-6">
      <div className="flex flex-col w-full">
        {/* Header - Cover + Avatar */}
        <div className="relative w-full h-32 sm:h-48 coverBox rounded-xl sm:rounded-2xl overflow-hidden">
          <Image
            src={
              user.coverPicture ||
              "https://via.placeholder.com/1200x400/e5e7eb/6b7280?text=Cover"
            }
            alt="Cover"
            fill
            className="object-cover"
          />

          <div className="absolute left-0 bottom-0">
            <div className="relative w-20 h-20 sm:w-26 sm:h-26 top-6 sm:top-10 ml-3 sm:ml-5 mb-4">
              <UserAvatar
                avatarPicture={user.avatarPicture}
                firstName={user.firstName}
                lastName={user.lastName}
                size="lg"
              />
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="flex flex-col items-start justify-start space-y-1 my-8 sm:my-14 mx-3 sm:mx-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold truncate">
                {user.firstName} {user.lastName}
              </h1>
              <span className="text-base sm:text-lg font-semibold text-muted-foreground">
                {user.title}
              </span>
              <div className="flex gap-2 items-center mt-1">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm sm:text-base truncate">
                  {user.nationality?.name || "Pays non défini"}
                </span>
              </div>

              {/* Statistiques de suivi */}
              <div className="flex gap-3 sm:gap-4 items-center mt-2 text-xs sm:text-sm text-muted-foreground">
                <span>
                  <strong>{followersCount}</strong> abonnés
                </span>
                <span>
                  <strong>{followingCount}</strong> abonnements
                </span>
              </div>
              {user.linkWebsite && (
                <div className="flex gap-2 items-center mt-1">
                  <Link2 className="w-4 h-4 flex-shrink-0" />
                  <Link
                    href={user.linkWebsite}
                    target="_blank"
                    className="text-blue-500 hover:underline text-sm sm:text-base truncate"
                  >
                    Site web
                  </Link>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {currentUser?.id && currentUser.id !== userId && (
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Message</span>
                  <span className="sm:hidden">Envoyer un message</span>
                </Button>
                <Button
                  size="sm"
                  onClick={toggleFollow}
                  disabled={followLoading}
                  variant={isFollowing ? "outline" : "default"}
                  className="w-full sm:w-auto"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  {followLoading
                    ? "..."
                    : isFollowing
                      ? "Ne plus suivre"
                      : "Suivre"}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Content Tabs */}
        <div className="p-3 sm:p-5 w-full">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="overview" className="text-sm sm:text-base">
                Aperçu
              </TabsTrigger>
              <TabsTrigger value="activity" className="text-sm sm:text-base">
                Activité
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4 sm:mt-6">
              {/* Description */}
              {user.description && (
                <Card className="w-full mb-4 sm:mb-6">
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="text-base sm:text-lg">
                      À propos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {user.description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Experience & Education */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4 sm:space-y-6">
                  <Card>
                    <CardContent className="p-0">
                      <UserExperience experiences={user.experience || []} />
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <Card>
                    <CardContent className="p-0">
                      <UserEducation educations={user.education || []} />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Skills */}
              {user.userSkills && user.userSkills.length > 0 && (
                <Card className="w-full mt-4 sm:mt-6">
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="text-base sm:text-lg">
                      Compétences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2">
                      {user.userSkills.map((userSkill) => (
                        <div
                          key={userSkill.id}
                          className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm"
                        >
                          <span className="font-medium">
                            {userSkill.skill.title}
                          </span>
                          {userSkill.level && (
                            <span className="ml-1 text-xs opacity-70">
                              ({userSkill.level})
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="activity" className="mt-4 sm:mt-6">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center text-muted-foreground">
                    <p className="text-sm sm:text-base">
                      Les activités de cet utilisateur apparaîtront ici.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
