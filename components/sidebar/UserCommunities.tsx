"use client";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useUserCommunities } from "@/hooks/communities/useUserCommunities";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Crown, Hash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface UserCommunity {
  id: string;
  name: string;
  slug: string;
  customLink: string;
  avatarUrl?: string;
  isPrivate: boolean;
  ownerId: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  _count: {
    members: number;
    channels: number;
  };
}

export function UserCommunities({ userId }: { userId: string }) {
  const { userCommunities, isLoading, error } = useUserCommunities();
  const pathname = usePathname();

  if (error) {
    return null; // Ne pas afficher en cas d'erreur
  }

  if (isLoading) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Mes Espaces</SidebarGroupLabel>
        <SidebarMenu>
          {[1, 2, 3].map((i) => (
            <SidebarMenuItem key={i}>
              <div className="flex items-center gap-2 p-2">
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="h-4 flex-1" />
              </div>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  if (!userCommunities || userCommunities.length === 0) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Mes Espaces</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <Users className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-xs text-gray-500">
                Aucune communauté rejointe
              </p>
              <Link
                href="/communauty"
                className="text-xs text-blue-500 hover:underline mt-1"
              >
                Découvrir →
              </Link>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex items-center justify-between">
        <span>Mes Espaces</span>
        <Badge variant="secondary" className="text-xs">
          {userCommunities.length}
        </Badge>
      </SidebarGroupLabel>

      <SidebarMenu>
        {userCommunities.slice(0, 8).map((community: UserCommunity) => {
          const communityPath = `/communauty/${community.slug}/${community.id}`;
          const isActive = pathname.startsWith(communityPath);
          const isOwner = community.ownerId === userId;

          return (
            <SidebarMenuItem key={community.id}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                className={cn(
                  "w-full justify-start group",
                  isActive
                    ? "bg-neutral-800 rounded-2xl boxShadowLight dark:boxShadow"
                    : "hover:bg-neutral-700/50"
                )}
              >
                <Link href={communityPath}>
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    {/* Avatar de la communauté */}
                    <div className="relative">
                      {community.avatarUrl ? (
                        <Image
                          src={community.avatarUrl}
                          alt={community.name}
                          width={20}
                          height={20}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <Hash className="w-3 h-3 text-white" />
                        </div>
                      )}

                      {/* Indicateur propriétaire */}
                      {isOwner && (
                        <Crown className="w-2 h-2 text-yellow-500 absolute -top-1 -right-1" />
                      )}
                    </div>

                    {/* Nom et info */}
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-sm font-medium truncate">
                        {community.name}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Users className="w-3 h-3" />
                        <span>{community._count.members}</span>
                        {community.isPrivate && (
                          <Badge variant="outline" className="text-xs px-1 py-0">
                            Privée
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}

        {/* Lien vers toutes les communautés si plus de 8 */}
        {userCommunities.length > 8 && (
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/communauty" className="text-xs text-blue-500">
                Voir toutes ({userCommunities.length - 8} de plus) →
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}

        {/* Lien pour découvrir plus de communautés */}
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href="/communauty" className="text-xs text-gray-400 hover:text-white">
              + Découvrir plus
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
