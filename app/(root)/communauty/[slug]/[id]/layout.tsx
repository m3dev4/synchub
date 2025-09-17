"use client";
import { useCommunityById } from "@/hooks/communities/useCommunityById";
import { useChannels } from "@/hooks/communities/useChannels";
import { Loader2, Users, Hash, Volume2, Megaphone, Bug } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface CommunityPageProps {
  params: {
    slug: string;
    id: string;
  };
}

const CommunityPage = ({ params }: CommunityPageProps) => {
  const {
    community,
    isLoading: isLoadingCommunity,
    error: communityError,
  } = useCommunityById(params.id);
  const {
    channels,
    isLoading: isLoadingChannels,
    error: channelsError,
  } = useChannels(params.id);

  if (isLoadingCommunity || isLoadingChannels) {
    return (
      <div className="h-screen flex items-center justify-center flex-col gap-2">
        <h3 className="text-lg font-medium">Chargement de la communauté</h3>
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (communityError || channelsError) {
    return (
      <div className="h-screen flex items-center justify-center flex-col gap-2">
        <h3 className="text-lg font-medium text-red-600">Erreur</h3>
        <p className="text-sm text-gray-600">
          {communityError?.message ||
            channelsError?.message ||
            "Une erreur est survenue"}
        </p>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="h-screen flex items-center justify-center flex-col gap-2">
        <h3 className="text-lg font-medium">Communauté non trouvée</h3>
      </div>
    );
  }

  const getChannelIcon = (type: string) => {
    switch (type) {
      case "GENERAL":
        return <Hash className="w-4 h-4" />;
      case "VOICE":
        return <Volume2 className="w-4 h-4" />;
      case "ANNOUNCEMENT":
        return <Megaphone className="w-4 h-4" />;
      case "BUG_REPORT":
        return <Bug className="w-4 h-4" />;
      default:
        return <Hash className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen py-10 my-10">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* En-tête de la communauté */}
        <Card>
          <CardHeader>
            <div className="flex items-start gap-4">
              {community.avatarUrl && (
                <Image
                  src={community.avatarUrl}
                  alt={community.name}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
              )}
              <div className="flex-1">
                <CardTitle className="text-2xl">{community.name}</CardTitle>
                <p className="text-muted-foreground mt-2">
                  {community.description || "Aucune description"}
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <Badge variant="outline">
                    <Users className="w-4 h-4 mr-1" />
                    {community._count?.members || 0} membres
                  </Badge>
                  <Badge variant="outline">
                    <Hash className="w-4 h-4 mr-1" />
                    {community._count?.channels || 0} channels
                  </Badge>
                  <Badge>{community.category?.name}</Badge>
                  <Badge
                    variant={community.isPrivate ? "destructive" : "default"}
                  >
                    {community.isPrivate ? "Privée" : "Publique"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Liste des channels */}
        <Card>
          <CardHeader>
            <CardTitle>Channels ({channels?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {channels?.map((channel: any) => (
                <div
                  key={channel.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {getChannelIcon(channel.type)}
                    <h3 className="font-medium">{channel.name}</h3>
                    {channel.isPrivate && (
                      <Badge variant="secondary" className="text-xs">
                        Privé
                      </Badge>
                    )}
                  </div>
                  {channel.description && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {channel.description}
                    </p>
                  )}
                  <div className="text-xs text-muted-foreground">
                    {channel._count?.messages || 0} messages
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Membres de la communauté */}
        {community.members && community.members.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Membres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {community.members.slice(0, 8).map((member: any) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-2 p-2 border rounded"
                  >
                    {member.user.avatarPicture && (
                      <Image
                        src={member.user.avatarPicture}
                        alt={member.user.username}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {member.user.username}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Niveau {member.level}
                      </p>
                    </div>
                    {member.user.isOnline && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;
