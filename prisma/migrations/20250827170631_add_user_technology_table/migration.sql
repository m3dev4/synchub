-- CreateTable
CREATE TABLE "public"."UserTechnology" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "technologyId" TEXT NOT NULL,
    "level" "public"."SkillLevel" NOT NULL DEFAULT 'BEGINNER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserTechnology_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserTechnology_userId_technologyId_key" ON "public"."UserTechnology"("userId", "technologyId");

-- AddForeignKey
ALTER TABLE "public"."UserTechnology" ADD CONSTRAINT "UserTechnology_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserTechnology" ADD CONSTRAINT "UserTechnology_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "public"."Technology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
