-- CreateTable
CREATE TABLE "Anime" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "episodes" INTEGER,
    "releaseDate" TIMESTAMP(3),

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id")
);
