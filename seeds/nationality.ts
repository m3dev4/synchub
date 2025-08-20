import { countries } from "@/constants/nationality/countries";
import { PrismaClient } from "@/lib/prisma-client-js";

const prisma = new PrismaClient();

export const seedNationality = async () => {
  try {
    console.log("🌏 Seeding nationality...");

    const existingNationality = await prisma.nationality.findMany({
      where: {
        name: {
          in: countries.map((country) => country.name),
        },
      },
    });

    if (existingNationality.length > 0) {
      console.log(
        `⚠️ ${existingNationality.length} nationality existent déjà.`,
      );
    }

    // Filtrer les pays qui n'existent pas encore
    const existingNames = existingNationality.map(
      (n: { name: string }) => n.name,
    );
    const newCountries = countries.filter(
      (country) => !existingNames.includes(country.name),
    );

    if (newCountries.length === 0) {
      console.log("✅ Tous les pays existent déjà dans la base de données.");
      return;
    }

    // Créer les nouveaux pays
    console.log(`📝 Création de ${newCountries.length} nouveaux pays...`);

    const createdCountries = await prisma.nationality.createMany({
      data: newCountries.map((country) => ({
        name: country.name,
        flag: country.flag,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      skipDuplicates: true,
    });

    console.log(`✅ ${createdCountries.count} pays créés avec succès !`);

    // Afficher quelques exemples
    if (newCountries.length > 0) {
      console.log("🏁 Exemples de pays créés :");
      newCountries.slice(0, 5).forEach((country) => {
        console.log(`   - ${country.name} (${country.flag})`);
      });
      if (newCountries.length > 5) {
        console.log(`   ... et ${newCountries.length - 5} autres pays`);
      }
    }
  } catch (error) {
    console.error("❌ Erreur lors du seeding des nationalités :", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

// Execute the seeding function
seedNationality()
  .then(() => {
    console.log("✅ Seeding completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  });
