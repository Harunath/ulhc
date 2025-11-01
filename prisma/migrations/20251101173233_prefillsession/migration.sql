-- CreateTable
CREATE TABLE "PrefillSession" (
    "id" TEXT NOT NULL,
    "partnerId" TEXT NOT NULL,
    "vrkpId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "consumed" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "lastIp" TEXT,
    "lastUserAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrefillSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PrefillSession_token_key" ON "PrefillSession"("token");

-- CreateIndex
CREATE INDEX "PrefillSession_vrkpId_idx" ON "PrefillSession"("vrkpId");

-- CreateIndex
CREATE INDEX "PrefillSession_expiresAt_idx" ON "PrefillSession"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "PrefillSession_partnerId_vrkpId_key" ON "PrefillSession"("partnerId", "vrkpId");
