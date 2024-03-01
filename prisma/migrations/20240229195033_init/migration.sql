-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "password" TEXT,
    "firstname" TEXT,
    "lastname" TEXT,
    "email" TEXT,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "tokens" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");
