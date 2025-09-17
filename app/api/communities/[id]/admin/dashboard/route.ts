import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/prisma-client-js";
import { getErrorMessage } from "@/utils/errorMessage";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieHeader = req.headers.get("cookie");
    const sessionTokenMatch = cookieHeader?.match(/sessionToken=([^;]+)/);
    const sessionToken = sessionTokenMatch ? sessionTokenMatch[1] : null;

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, message: "Unauthorized - No session token" },
        { status: 401 }
      );
    }

    // Vérification de la session
    const session = await prisma.session.findFirst({
      where: {
        token: sessionToken,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    });

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Session invalide" },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Vérifier que la communauté existe et que l'utilisateur est propriétaire
    const community = await prisma.community.findFirst({
      where: {
        OR: [
          { id: id },
          { slug: id },
          { customLink: id }
        ]
      }
    });

    if (!community) {
      return NextResponse.json(
        { success: false, message: "Communauté non trouvée" },
        { status: 404 }
      );
    }

    if (community.ownerId !== session.user.id) {
      return NextResponse.json(
        { success: false, message: "Accès refusé - Seul le propriétaire peut accéder" },
        { status: 403 }
      );
    }

    // Calculer les dates pour les statistiques
    const now = new Date();
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Récupérer les métriques en parallèle
    const [
      totalMembers,
      newMembersThisWeek,
      newMembersThisMonth,
      totalChannels,
      totalMessages,
      messagesThisWeek,
      recentMembers,
      topChannels,
      memberGrowthRaw
    ] = await Promise.all([
      // Total des membres
      prisma.communityMember.count({
        where: { communityId: community.id }
      }),

      // Nouveaux membres cette semaine
      prisma.communityMember.count({
        where: {
          communityId: community.id,
          joinedAt: { gte: lastWeek }
        }
      }),

      // Nouveaux membres ce mois
      prisma.communityMember.count({
        where: {
          communityId: community.id,
          joinedAt: { gte: lastMonth }
        }
      }),

      // Total des canaux
      prisma.channel.count({
        where: { communityId: community.id }
      }),

      // Total des messages
      prisma.message.count({
        where: {
          channel: {
            communityId: community.id
          }
        }
      }),

      // Messages cette semaine
      prisma.message.count({
        where: {
          channel: {
            communityId: community.id
          },
          createdAt: { gte: lastWeek }
        }
      }),

      // Membres récents
      prisma.communityMember.findMany({
        where: { communityId: community.id },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
              avatarPicture: true,
            }
          }
        },
        orderBy: { joinedAt: "desc" },
        take: 5
      }),

      // Canaux les plus actifs
      prisma.channel.findMany({
        where: { communityId: community.id },
        include: {
          _count: {
            select: {
              messages: {
                where: {
                  createdAt: { gte: lastWeek }
                }
              }
            }
          }
        },
        orderBy: {
          messages: {
            _count: "desc"
          }
        },
        take: 5
      }),

      // SOLUTION CORRIGÉE : Récupérer les membres de la semaine pour créer le graphique
      prisma.communityMember.findMany({
        where: {
          communityId: community.id,
          joinedAt: { gte: lastWeek }
        },
        select: {
          joinedAt: true
        },
        orderBy: { joinedAt: "asc" }
      })
    ]);

    // Traitement des données de croissance côté application
    const memberGrowth = (() => {
      // Créer un objet pour compter les membres par jour
      const growthByDay: { [key: string]: number } = {};

      // Initialiser tous les jours de la semaine avec 0
      for (let i = 0; i < 7; i++) {
        const date = new Date(lastWeek.getTime() + i * 24 * 60 * 60 * 1000);
        const dateKey = date.toISOString().split('T')[0];
        growthByDay[dateKey] = 0;
      }

      // Compter les membres pour chaque jour
      memberGrowthRaw.forEach(member => {
        const dateKey = member.joinedAt.toISOString().split('T')[0];
        if (growthByDay.hasOwnProperty(dateKey)) {
          growthByDay[dateKey]++;
        }
      });

      // Convertir en tableau pour le graphique
      return Object.entries(growthByDay).map(([date, count]) => ({
        date,
        count
      })).sort((a, b) => a.date.localeCompare(b.date));
    })();

    // Calculer les pourcentages de croissance
    const memberGrowthPercentage = totalMembers > 0
      ? ((newMembersThisWeek / Math.max(totalMembers - newMembersThisWeek, 1)) * 100)
      : 0;

    const messageGrowthPercentage = totalMessages > 0
      ? ((messagesThisWeek / Math.max(totalMessages - messagesThisWeek, 1)) * 100)
      : 0;

    const dashboardData = {
      // Métriques principales
      metrics: {
        totalMembers,
        newMembersThisWeek,
        newMembersThisMonth,
        memberGrowthPercentage: Math.round(memberGrowthPercentage * 100) / 100,
        totalChannels,
        totalMessages,
        messagesThisWeek,
        messageGrowthPercentage: Math.round(messageGrowthPercentage * 100) / 100,
      },

      // Données pour graphiques
      charts: {
        memberGrowth: memberGrowth,
      },

      // Listes
      recentMembers: recentMembers.map(member => ({
        id: member.id,
        user: member.user,
        joinedAt: member.joinedAt,
        level: member.level,
        xp: member.xp,
      })),

      topChannels: topChannels.map(channel => ({
        id: channel.id,
        name: channel.name,
        type: channel.type,
        messageCount: channel._count.messages,
      })),

      // Informations générales
      community: {
        id: community.id,
        name: community.name,
        description: community.description,
        isPrivate: community.isPrivate,
        createdAt: community.createdAt,
      }
    };

    return NextResponse.json({
      success: true,
      data: dashboardData,
      status: 200,
    });

  } catch (error) {
    console.error('Dashboard API Error:', error); // Ajout pour debug
    return NextResponse.json({
      success: false,
      message: "Erreur interne du serveur",
      error: getErrorMessage(error),
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
