-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "presentation" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
