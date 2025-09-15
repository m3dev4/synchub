"use client";
import { useCommunity } from "@/hooks/communities/useCommunity";
import { useMember } from "@/hooks/communities/useMember";
import { Community } from "@/types/community";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaUsersLine } from "react-icons/fa6";
import { useCategory } from "@/hooks/communities/useCategory";
import { Badge } from "../ui/badge";

const ListCommunities = () => {
  const { communities, isLoading, error } = useCommunity();
  const {
    members,
    isLoading: isLoadingMembers,
    error: errorMembers,
  } = useMember(communities?.[0]?.id || "");
  const {
    category,
    isLoading: isLoadingCategory,
    error: errorCategory,
  } = useCategory(communities?.[0]?.id || "");
  const [allCommunities, setAllCommunities] = useState<Community[]>([]);

  useEffect(() => {
    if (communities) {
      setAllCommunities(communities);
    }
  }, [communities]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center flex-col gap-2">
        <h3 className="text-lg font-medium">Chargement des communautés</h3>
        <Loader2 className="w-4 h-4 animate-spin" />
      </div>
    );
  }

  return (
    <section className="space-y-0">
      <div className="max-w-4xl space-y-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">communautés</h3>
          <p className="text-sm text-muted-foreground">
            Découvrez les communautés de votre domaine
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 space-y-4 w-full">
          {allCommunities && allCommunities.length > 0 ? (
            <>
              {allCommunities.map((community) => (
                <div
                  key={community.id}
                  className="border rounded-lg p-3 sm:p-4 w-full"
                >
                  <div className="flex items-center gap-2 py-2 relative">
                    <div className="w-40 h-26 rounded-2xl overflow-hidden">
                      <Image
                        src={community.avatarUrl || "/placeholder.svg"}
                        alt={community.name}
                        width={160}
                        height={160}
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <h3 className="text-lg font-medium">{community.name}</h3>
                      {community.description ? (
                        <p className="text-sm text-muted-foreground">
                          {community.description}
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Aucune description
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        <FaUsersLine className="w-4 h-4" />
                        <p className="text-sm text-muted-foreground">
                          {" "}
                          {members} membres
                        </p>
                      </div>
                      <Badge>{community.category.name}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">Aucune communauté trouvée</h3>
              <p className="text-sm text-muted-foreground">
                Découvrez les communautés de votre domaine
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ListCommunities;
