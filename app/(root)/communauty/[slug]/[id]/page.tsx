"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useCategory } from "@/hooks/communities/useCategory";
import { useChannels } from "@/hooks/communities/useChannels";
import { useCommunityById } from "@/hooks/communities/useCommunityById";
import { useMember } from "@/hooks/communities/useMember";
import { Community } from "@/lib/prisma-client-js";
import { Loader2, Users } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface CommunityPageProps {
  params: {
    slug: string;
    id: string;
  };
}

const CommunityPage = ({ params }: CommunityPageProps) => {
  const [communityId, setCommunityId] = useState<Community | null>(null);
  const { community, isLoading, error } = useCommunityById(params.id);
  const {
    channels,
    isLoading: isChannelsLoading,
    error: channelsError,
  } = useChannels(params.id);
  const {
    members,
    isLoading: isMembersLoading,
    error: membersError,
  } = useMember(params.id);
  const {
    category,
    isLoading: isCategoryLoading,
    error: categoryError,
  } = useCategory(params.id);

  useEffect(() => {
    if (community) {
      setCommunityId(community);
    }
  }, [community]);

  if (isLoading || isChannelsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-muted-foreground">
            Chargement de la communauté...
          </p>
        </div>
      </div>
    );
  }

  if (error || channelsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Erreur</h1>
          <p className="text-muted-foreground mb-4">
            {error?.message ||
              channelsError?.message ||
              "Erreur lors du chargement de la communauté"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 my-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="relative">
                {communityId?.avatarUrl && (
                  <Image
                    src={communityId.avatarUrl}
                    alt={communityId.name || "Avatar de la communauté"}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
              </div>

              <div className="flex-1 space-y-2">
                <CardTitle className="text-2xl font-bold">
                  {communityId?.name}
                </CardTitle>
                <p className="text-muted-foreground">
                  {communityId?.description || "Aucune description"}
                </p>
                <div className="flex items-center gap-2">
                  <Badge>
                    <Users className="w-4 h-4" />
                    {members?.[0]?.community.members.length}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default CommunityPage;
