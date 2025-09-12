"use server";

import { ChannelType, PrismaClient } from "@/lib/prisma-client-js";
import { CommunityResponse } from "@/types/community";
import { getErrorMessage } from "@/utils/errorMessage";
import { createCommunityInput } from "@/validations/community";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const createCommunity = async (
  data: createCommunityInput,
  sessionToken: string,
): Promise<CommunityResponse> => {
  try {
    const session = await prisma.session.findFirst({
      where: {
        token: sessionToken,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    });

    if (!session) {
      return {
        success: false,
        error: "Session invalide ou expirée",
      };
    }

    const slugBase = data.name
      .toLocaleLowerCase()
      .replace(/ /g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .trim();

    let slug = slugBase;
    let counter = 1;

    while (await prisma.community.findUnique({ where: { slug } })) {
      slug = `${slugBase}-${counter}`;  // Fix: utilisez un tiret simple
      counter++;
    }

    // ✅ FIX: Vérifier l'unicité du customLink seulement s'il est fourni
    if (data.customLink) {
      const existingCustomLink = await prisma.community.findUnique({
        where: { customLink: data.customLink },
      });

      if (existingCustomLink) {
        return {
          success: false,
          error: "Ce lien personnalisé est déjà utilisé",
        };
      }
    }

    const category = await prisma.communityTags.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      return {
        success: false,
        error: "Catégorie non trouvée ou invalide",
      };
    }

    // ✅ FIX: Générer un customLink unique s'il n'est pas fourni
    let finalCustomLink = data.customLink;
    if (!finalCustomLink) {
      finalCustomLink = slug;
      let linkCounter = 1;

      while (await prisma.community.findUnique({ where: { customLink: finalCustomLink } })) {
        finalCustomLink = `${slug}-${linkCounter}`;
        linkCounter++;
      }
    }

    const community = await prisma.$transaction(async (tx) => {
      const newCommunity = await tx.community.create({
        data: {
          name: data.name,
          slug: slug,
          description: data.description,
          avatarUrl: data.avatarUrl,
          bannerUrl: data.bannerUrl,
          isPrivate: data.isPrivate || false,
          customLink: finalCustomLink, // ✅ FIX: Toujours fournir une valeur
          ownerId: session.user.id,
          categoryId: data.categoryId,
        },
        include: {
          owner: true,
          category: true,
          channels: true,
          members: {
            include: {
              user: true,
            },
          },
        },
      });

      const defaultChannel = [
        {
          name: "Discussion générale",
          description: "Canal de discussion général de la communauté",
          type: ChannelType.GENERAL,
          position: 0,
          isPrivate: false,
          communityId: newCommunity.id,
        },
        {
          name: "Annonces",
          description: "Canal de discussion annonces de la communauté",
          type: ChannelType.ANNOUNCEMENT,
          position: 1, // ✅ FIX: Position différente pour chaque canal
          isPrivate: false,
          communityId: newCommunity.id,
        },
        {
          name: "Bug reports",
          description: "Canal de discussion bugs de la communauté",
          type: ChannelType.BUG_REPORT,
          position: 2, // ✅ FIX: Position différente pour chaque canal
          isPrivate: false,
          communityId: newCommunity.id,
        },
        {
          name: "Salon vocal",
          description: "Canal de discussion vocal de la communauté",
          type: ChannelType.VOICE,
          position: 3, // ✅ FIX: Position différente pour chaque canal
          isPrivate: false,
          communityId: newCommunity.id,
        },
      ];

      await tx.channel.createMany({
        data: defaultChannel,
      });

      await tx.communityMember.create({
        data: {
          userId: session.user.id,
          communityId: newCommunity.id,
          xp: 0,
          level: 1,
          joinedAt: new Date(),
          lastActive: new Date(),
        },
      });

      const completeCommunity = await tx.community.findUnique({
        where: { id: newCommunity.id },
        include: {
          owner: true,
          category: true,
          channels: {
            orderBy: {
              position: "asc",
            },
          },
          members: {
            include: {
              user: true,
            },
          },
        },
      });
      return completeCommunity;
    });

    revalidatePath("/community");
    revalidatePath(`/communities/${community?.customLink}`);

    return {
      success: true,
      data: community as any,
    };
  } catch (error) {
    console.error("Erreur lors de la création de la communauté:", error);

    if (error instanceof Error) {
      if (error.message.includes("Unique constraint")) {
        return {
          success: false,
          error: "Une communauté avec ce nom ou ce lien existe déjà",
        };
      }
      if (error.message.includes("Foreign key")) {
        return {
          success: false,
          error: "Catégorie non trouvée ou invalide",
        };
      }
    }
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};
