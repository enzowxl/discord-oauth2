-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "role" INTEGER NOT NULL DEFAULT 0,
    "premium" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");
