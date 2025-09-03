"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth/authState";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  Edit,
  Link2,
  MapPin,
  Navigation,
  Calendar,
  Users,
  TrendingUp,
  Award,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import GetExperience from "@/components/experience";
import GetEducation from "@/components/education";
import Skills from "@/components/skills";
import { AvatarUpload } from "@/components/ui/avatar-upload";
import { CoverUpload } from "@/components/ui/cover-upload";

const page = () => {
  const { user } = useAuthStore();
  const [countryName, setCountryName] = useState<string>("Chargement...");

  // Récupérer le nom du pays depuis l'API
  useEffect(() => {
    const fetchCountryName = async () => {
      if (!user?.nationalityId) {
        setCountryName("Pays non défini");
        return;
      }

      try {
        const response = await fetch(`/api/nationality/${user.nationalityId}`);
        if (response.ok) {
          const nationality = await response.json();
          setCountryName(nationality.name);
        } else {
          setCountryName("Pays non trouvé");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du pays:", error);
        setCountryName("Erreur de chargement");
      }
    };

    fetchCountryName();
  }, [user?.nationalityId]);

  return (
    <div className="min-h-screen bg-background my-14">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Cover and Profile */}
        <div className="relative">
          {/* Cover Image */}
          <div className="relative w-full h-48 md:h-full lg:h-full bg-gradient-to-r from-primary/20 to-secondary/20 rounded-b-3xl  overflow-hidden">
            <CoverUpload currentCover={user?.coverPicture || undefined} />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Profile Info Overlay */}
          <div className="relative px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between -mt-24 lg:-mt-20">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col lg:flex-row lg:items-end lg:gap-6">
                <div className="relative z-50">
                  <AvatarUpload
                    currentAvatar={user?.avatarPicture || undefined}
                    userName={`${user?.firstName} ${user?.lastName}`}
                    size="lg"
                  />
                </div>

                <div className="mt-4 lg:mt-20 lg:mb-4 space-y-2">
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                      {user?.firstName} {user?.lastName}
                    </h1>
                    {user?.title && (
                      <p className="text-xl lg:text-2xl  font-medium">
                        {user.title}
                      </p>
                    )}
                    {user?.titleProfession && (
                      <Badge variant="secondary" className="mt-2">
                        {user.titleProfession}
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm ">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{countryName}</span>
                    </div>
                    {user?.location && (
                      <div className="flex items-center gap-1">
                        <Navigation className="w-4 h-4" />
                        <span>{user.location}</span>
                      </div>
                    )}
                    {user?.linkWebsite && (
                      <Link
                        href={user.linkWebsite}
                        target="_blank"
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        <Link2 className="w-4 h-4" />
                        <span>Site web</span>
                      </Link>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Rejoint en{" "}
                        {new Date(user?.createdAt || "").getFullYear()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 lg:px-8 py-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-none lg:flex">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Aperçu</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Activité</span>
              </TabsTrigger>
              <TabsTrigger
                value="dashboard"
                className="flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span className="hidden sm:inline">Statistiques</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="space-y-8">
                {/* About Section - Full Width */}
                {user?.description && (
                  <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 border border-border/50">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-3 text-foreground">
                          À propos de moi
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-base">
                          {user.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Skills Section - Full Width with Better Layout */}
                <div className="bg-gradient-to-r from-secondary/5 to-primary/5 rounded-2xl p-6 border border-border/50">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-secondary/10 rounded-xl">
                      <Award className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">
                        Mes compétences
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        Technologies et outils que je maîtrise
                      </p>
                    </div>
                  </div>
                  <Skills />
                </div>

                {/* Experience & Education Grid */}
                <div className="flex flex-col gap-6 h-auto">
                  {/* Experience Section */}
                  <div className=" rounded-2xl p-6 border border-border/50">
                    <ScrollArea className="h-[500px] pr-4">
                      <GetExperience />
                    </ScrollArea>
                  </div>

                  {/* Education Section */}
                  <div className=" rounded-2xl p-6 border border-border/50">
                    <ScrollArea className="h-[400px] pr-4">
                      <GetEducation />
                    </ScrollArea>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activité récente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Aucune activité récente
                    </h3>
                    <p className="text-muted-foreground">
                      Les activités liées au compte seront affichées ici.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dashboard" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Stats Cards */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Connexions
                        </p>
                        <p className="text-2xl font-bold">0</p>
                      </div>
                      <Users className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Publications
                        </p>
                        <p className="text-2xl font-bold">0</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Vues profil
                        </p>
                        <p className="text-2xl font-bold">0</p>
                      </div>
                      <Award className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Projets
                        </p>
                        <p className="text-2xl font-bold">0</p>
                      </div>
                      <Briefcase className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Statistiques détaillées</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Statistiques à venir
                    </h3>
                    <p className="text-muted-foreground">
                      Les statistiques détaillées de votre activité seront
                      affichées ici.
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

export default page;
