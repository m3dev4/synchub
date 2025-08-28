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
  const userId = params.id as string;
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
    <div className="min-h-screen flex flex-col w-full py-6 my-6">
      <div className="flex flex-col w-full">
        {/* Header - Cover + Avatar */}
        <div className="relative w-full h-48 coverBox rounded-2xl overflow-hidden">
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
            <div className="relative w-26 h-26 top-10 ml-5 mb-4">
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
        <div className="flex flex-col items-start justify-start space-y-1 my-14 mx-5">
          <div className="flex items-center justify-between w-full">
            <div>
              <h1 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
              <span className="text-lg font-semibold">{user.title}</span>
              <div className="flex gap-2 items-center mt-1">
                <MapPin className="w-4 h-4" />
                <span>{user.nationality?.name || "Pays non défini"}</span>
              </div>

              {/* Statistiques de suivi */}
              <div className="flex gap-4 items-center mt-2 text-sm text-muted-foreground">
                <span>
                  <strong>{followersCount}</strong> abonnés
                </span>
                <span>
                  <strong>{followingCount}</strong> abonnements
                </span>
              </div>
              {user.linkWebsite && (
                <div className="flex gap-2 items-center mt-1">
                  <Link2 className="w-4 h-4" />
                  <Link
                    href={user.linkWebsite}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    Site web
                  </Link>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {currentUser?.id && currentUser.id !== userId && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button
                  size="sm"
                  onClick={toggleFollow}
                  disabled={followLoading}
                  variant={isFollowing ? "outline" : "default"}
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
        <div className="p-5 w-full">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="overview">Aperçu</TabsTrigger>
              <TabsTrigger value="activity">Activité</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              {/* Description */}
              {user.description && (
                <Card className="w-full mb-6">
                  <CardHeader>
                    <CardTitle>À propos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {user.description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Experience & Education */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-0">
                      <UserExperience experiences={user.experiences || []} />
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-0">
                      <UserEducation educations={user.educations || []} />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Skills */}
              {user.userSkills && user.userSkills.length > 0 && (
                <Card className="w-full mt-6">
                  <CardHeader>
                    <CardTitle>Compétences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {user.userSkills.map((userSkill) => (
                        <div
                          key={userSkill.id}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {userSkill.skill.title}
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

            <TabsContent value="activity">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center text-muted-foreground">
                    <p>Les activités de cet utilisateur apparaîtront ici.</p>
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
