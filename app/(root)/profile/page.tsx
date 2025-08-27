"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth/authState";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Edit, Link2, MapPin, Navigation } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BentoGridDemo } from "@/components/bento";
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
    <div className="min-h-screen flex flex-col w-full">
      <div className="flex flex-col w-full">
        {/* header - Cover + avatar */}
        <div className="relative w-full h-48 coverBox rounded-2xl">
          <CoverUpload currentCover={user?.coverPicture || undefined} />

          <div className="absolute left-0 bottom-0 ">
            <div className="relative w-26 h-26 top-10 ml-5 mb-4">
              <AvatarUpload
                currentAvatar={user?.avatarPicture || undefined}
                userName={`${user?.firstName} ${user?.lastName}`}
                size="lg"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start space-y-1 my-14 mx-5">
          <h1 className="text-2xl font-bold">
            {user?.firstName} {user?.lastName}
          </h1>
          <span className="text-lg font-semibold">{user?.title}</span>
          <span className="flex gap-2 items-center">
            <MapPin className="w-4 h-4" /> {countryName}
          </span>
          {user?.linkWebsite && (
            <div className="flex gap-2 items-center">
              <Link2 className="w-4 h-4" />
              <Link
                href={user?.linkWebsite || "#"}
                target="_blank"
                className="text-blue-500"
              >
                My website
              </Link>
            </div>
          )}
        </div>

        <div className="p-5 w-full">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              {/* info */}
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{user?.description}</p>
                </CardContent>
              </Card>

              <div className="parent space-x-2 space-y-2 my-10">
                <div className="experience">
                  <GetExperience />
                </div>
                <div className="education">
                  <GetEducation />
                </div>
                <div className="skills">
                  <Skills />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="activity">
              Tout les activité liées du comptes seront exposé ici.
            </TabsContent>
            <TabsContent value="dashboard">
              Une statistique des activités liées au comptes seront exposé ici.
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default page;
