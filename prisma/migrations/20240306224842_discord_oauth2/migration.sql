-- CreateTable
CREATE TABLE "Guild" (
    "guild_id" TEXT NOT NULL,
    "channel_log" TEXT NOT NULL,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("guild_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guild_guild_id_key" ON "Guild"("guild_id");

-- CreateIndex
CREATE UNIQUE INDEX "Guild_channel_log_key" ON "Guild"("channel_log");
