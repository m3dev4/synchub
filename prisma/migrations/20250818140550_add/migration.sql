-- CreateTable
CREATE TABLE "public"."sousSkill" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sousSkill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."sousSkill" ADD CONSTRAINT "sousSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "public"."Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
