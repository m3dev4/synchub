"use client";
import CreateCommunityModal from "@/components/communities/CreateCommunityModal";
import ListCommunities from "@/components/communities/listCommunities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserFollow from "@/components/userFollow";
import { Calendar, PlusCircle, TrendingUp } from "lucide-react";
import React, { useState } from "react";

const CommunityPage = () => {
  const [events, seEvents] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <main className="min-h-screen py-10 my-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Communauté</h1>
          <Button variant="outline" onClick={() => setIsCreateModalOpen(true)}>
            <PlusCircle className="w-4 h-4 mr-2" />
            Créer une communauté
          </Button>
        </div>

        <CreateCommunityModal
          isOpen={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
        />
        {/* Section Tendances */}
        <section className="flex items-center space-y-4 py-4 my-16 justify-between gap-4">
          <div className="flex flex-col gap-4 w-4xl md:w-3xl">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">Tendances</h3>
                <TrendingUp className="w-4 h-4" />
              </div>
              <Button variant="outline">Voir toutes les tendances</Button>
            </div>

            {/* Content Tendances */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-4"></div>
          </div>

          {/* Calandrier des événements a venir */}
          <Card className="flex flex-col gap-4 h-[200px] w-[300px] px-2">
            <CardHeader>
              <div className="flex items-start gap-2 p-2 flex-col">
                <h3 className="text-lg font-bold">Événements à venir</h3>
                <p className="text-sm text-muted-foreground">
                  Ces événements sont à venir
                </p>
              </div>
            </CardHeader>
            <CardContent>
              {events && events.length > 0 ? (
                <></>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-sm text-muted-foreground">
                    Aucun événement à venir
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <div className="flex items-center justify-between space-y-4">
          <ListCommunities />
          <UserFollow />
        </div>
      </div>
    </main>
  );
};

export default CommunityPage;
