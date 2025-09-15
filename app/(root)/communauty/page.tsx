import ListCommunities from "@/components/communities/listCommunities";
import { Button } from "@/components/ui/button";
import { Calendar, TrendingUp } from "lucide-react";
import React from "react";

const CommunityPage = () => {
  return (
    <main className="min-h-screen py-10 my-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold">Communauté</h1>
        {/* Section Tendances */}
        <section className="flex items-center space-y-4 py-4 justify-between">
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
          <div className="flex flex-col gap-4 bg-amber-500 ">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">Calendrier</h3>
                <Calendar className="w-4 h-4" />
              </div>
            </div>
          </div>
        </section>

        <ListCommunities />
      </div>
    </main>
  );
};

export default CommunityPage;
