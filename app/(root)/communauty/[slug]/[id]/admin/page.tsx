"use client";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import { MetricCard } from "@/components/admin/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users,
  MessageSquare,
  Hash,
  TrendingUp,
  RefreshCw,
  Calendar,
  Crown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AdminDashboardProps {
  params: {
    slug: string;
    id: string;
  };
}

const AdminDashboard = ({ params }: AdminDashboardProps) => {
  const { dashboardData, isLoading, error, refetch } = useAdminDashboard(params.id);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-9 w-24" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 mb-2">Erreur de chargement</div>
          <p className="text-muted-foreground mb-4">
            {error instanceof Error ? error.message : "Une erreur est survenue"}
          </p>
          <Button onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  if (!dashboardData) return null;

  const { metrics, recentMembers, topChannels, community } = dashboardData;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Vue d&apos;ensemble de votre communauté {community.name}
          </p>
        </div>
        <Button onClick={() => refetch()} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Actualiser
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total des membres"
          value={metrics.totalMembers}
          change={metrics.memberGrowthPercentage}
          changeLabel="cette semaine"
          trend={metrics.memberGrowthPercentage > 0 ? "up" : metrics.memberGrowthPercentage < 0 ? "down" : "neutral"}
          icon={<Users className="w-4 h-4" />}
        />

        <MetricCard
          title="Nouveaux membres"
          value={metrics.newMembersThisWeek}
          changeLabel="cette semaine"
          icon={<TrendingUp className="w-4 h-4" />}
        />

        <MetricCard
          title="Messages"
          value={metrics.totalMessages}
          change={metrics.messageGrowthPercentage}
          changeLabel="cette semaine"
          trend={metrics.messageGrowthPercentage > 0 ? "up" : metrics.messageGrowthPercentage < 0 ? "down" : "neutral"}
          icon={<MessageSquare className="w-4 h-4" />}
        />

        <MetricCard
          title="Canaux"
          value={metrics.totalChannels}
          icon={<Hash className="w-4 h-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Membres récents</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/communauty/${params.slug}/${params.id}/admin/members`}>
                Voir tous
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentMembers.length > 0 ? (
              <div className="space-y-3">
                {recentMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="relative">
                      {member.user.avatarPicture ? (
                        <Image
                          src={member.user.avatarPicture}
                          alt={member.user.username}
                          width={32}
                          height={32}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">
                            {member.user.firstName?.[0] || member.user.username[0]}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium truncate">
                          {member.user.firstName && member.user.lastName
                            ? `${member.user.firstName} ${member.user.lastName}`
                            : member.user.username}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          Niveau {member.level}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Rejoint {new Date(member.joinedAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-medium">{member.xp} XP</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                Aucun membre récent
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Canaux actifs</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/communauty/${params.slug}/${params.id}/admin/channels`}>
                Gérer
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {topChannels.length > 0 ? (
              <div className="space-y-3">
                {topChannels.map((channel, index) => (
                  <div key={channel.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">#{channel.name}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {channel.type.toLowerCase()}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {channel.messageCount} messages
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                Aucune activité récente
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" asChild className="h-auto flex-col gap-2 p-4">
              <Link href={`/communauty/${params.slug}/${params.id}/admin/members`}>
                <Users className="w-6 h-6" />
                <span className="text-sm">Gérer les membres</span>
              </Link>
            </Button>

            <Button variant="outline" asChild className="h-auto flex-col gap-2 p-4">
              <Link href={`/communauty/${params.slug}/${params.id}/admin/channels`}>
                <Hash className="w-6 h-6" />
                <span className="text-sm">Gérer les canaux</span>
              </Link>
            </Button>

            <Button variant="outline" asChild className="h-auto flex-col gap-2 p-4">
              <Link href={`/communauty/${params.slug}/${params.id}/admin/appearance`}>
                <Crown className="w-6 h-6" />
                <span className="text-sm">Personnaliser</span>
              </Link>
            </Button>

            <Button variant="outline" asChild className="h-auto flex-col gap-2 p-4">
              <Link href={`/communauty/${params.slug}/${params.id}/admin/settings`}>
                <Calendar className="w-6 h-6" />
                <span className="text-sm">Paramètres</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
