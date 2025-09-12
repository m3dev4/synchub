import { communityTags } from "@/constants/communityTags";
import { PrismaClient } from "@/lib/prisma-client-js";

const prisma = new PrismaClient();

export const seedCommunityTags = async () => {
  try {
    console.log("🏷️ Seeding community tags...");

    //vreifier si les tags existent deja
    const exisitingCommunityTags = await prisma.communityTags.findMany({
      where: {
        name: {
          in: communityTags.map((tag) => tag.name),
        },
      },
    });

    if (exisitingCommunityTags.length > 0) {
      console.log(
        `⚠️ ${exisitingCommunityTags.length} community tags existent déjà.`,
      );
    }

    //Filtrer les tags qui n'existent pas encore
    const existingNames = exisitingCommunityTags.map(
      (tag: { name: string }) => tag.name,
    );
    const newCommunityTags = communityTags.filter(
      (tag) => !existingNames.includes(tag.name),
    );

    if (newCommunityTags.length === 0) {
      console.log("✅ Tous les tags existent déjà dans la base de données.");
      return;
    }

    //creer les nouveax tags
    console.log(`📝 Création de ${newCommunityTags.length} nouveaux tags...`);

    const newCommunityTagsCreated = await prisma.communityTags.createMany({
      data: newCommunityTags.map((tag) => ({
        name: tag.name,
        slug: tag.slug,
        description: tag.description,
        createdAt: tag.createdAt,
        updatedAt: tag.updateAt,
      })),
    });

    console.log(`✅ ${newCommunityTagsCreated.count} tags créés avec succès !`);

    if (newCommunityTags.length > 0) {
      console.log("🏁 Exemples de tags créés :");
      newCommunityTags.slice(0, 5).forEach((tag) => {
        console.log(`   - ${tag.name} (${tag.slug})`);
      });
      if (newCommunityTags.length > 5) {
        console.log(`   ... et ${newCommunityTags.length - 5} autres tags`);
      }
    }
  } catch (error) {
    console.error("❌ Erreur lors du seeding des tags de communauté :", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

// Execute the seeding function
seedCommunityTags()
  .then(() => {
    console.log("✅ Seeding completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  });
