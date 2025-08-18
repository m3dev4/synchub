-- CreateTable
CREATE TABLE "public"."Technology" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sousSkillTechId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Technology" ADD CONSTRAINT "Technology_sousSkillTechId_fkey" FOREIGN KEY ("sousSkillTechId") REFERENCES "public"."sousSkill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
