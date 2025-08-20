import { skills } from "@/constants/skill/skills";
import { PrismaClient } from "@/lib/prisma-client-js";

const prisma = new PrismaClient();

export const seedSkills = async () => {
  try {
    console.log("🛠️ Seeding skills globaux...");

    // Check existing skills
    const existingSkills = await prisma.skill.findMany({
      where: {
        title: {
          in: skills.map((skill) => skill.title),
        },
      },
    });

    if (existingSkills.length > 0) {
      console.log(`⚠️ ${existingSkills.length} skills existent déjà.`);
    }

    // Filter skills that don't exist yet
    const existingTitles = existingSkills.map(
      (s: { title: string }) => s.title,
    );
    const newSkills = skills.filter(
      (skill) => !existingTitles.includes(skill.title),
    );

    if (newSkills.length === 0) {
      console.log("✅ Tous les skills existent déjà dans la base de données.");
      return;
    }

    console.log(
      `📝 Création de ${newSkills.length} nouveaux skills globaux...`,
    );

    // Create skills with nested sousSkills and technologies
    for (const skillData of newSkills) {
      const createdSkill = await prisma.skill.create({
        data: {
          title: skillData.title,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      console.log(`📋 Créé skill: ${createdSkill.title}`);

      // Create sousSkills for this skill
      if (skillData.sousSkills && skillData.sousSkills.length > 0) {
        for (const sousSkillData of skillData.sousSkills) {
          const createdSousSkill = await prisma.sousSkill.create({
            data: {
              title: sousSkillData.title,
              skillId: createdSkill.id,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          });

          console.log(`  📌 Créé sousSkill: ${createdSousSkill.title}`);

          // Create technologies for this sousSkill
          if (
            sousSkillData.technologies &&
            sousSkillData.technologies.length > 0
          ) {
            for (const technologyData of sousSkillData.technologies) {
              await prisma.technology.create({
                data: {
                  title: technologyData.title,
                  sousSkillTechId: createdSousSkill.id,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              });
            }
            console.log(
              `    🔧 Créé ${sousSkillData.technologies.length} technologies pour ${createdSousSkill.title}`,
            );
          }
        }
      }
    }

    console.log(`✅ ${newSkills.length} skills créés avec succès !`);

    // Display some examples
    if (newSkills.length > 0) {
      console.log("🏁 Exemples de skills créés :");
      newSkills.slice(0, 3).forEach((skill) => {
        console.log(
          `   - ${skill.title} (${skill.sousSkills?.length || 0} sous-compétences)`,
        );
      });
      if (newSkills.length > 3) {
        console.log(`   ... et ${newSkills.length - 3} autres skills`);
      }
    }
  } catch (error) {
    console.error("❌ Erreur lors du seeding des skills :", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

// Execute the seeding function
seedSkills()
  .then(() => {
    console.log("✅ Skills seeding completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Skills seeding failed:", error);
    process.exit(1);
  });
