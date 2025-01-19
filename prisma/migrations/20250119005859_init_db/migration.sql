-- CreateTable
CREATE TABLE "nft_detail" (
    "id" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "uri" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "hasNFTSold" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nft_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follwings" (
    "id" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "follwings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "followers" (
    "id" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,
    "followedId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "followers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "pfp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "engagement" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "engagement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nft_comment" (
    "id" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nft_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nft_like" (
    "id" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nft_like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nft_view" (
    "id" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nft_view_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "nft_detail_tokenId_idx" ON "nft_detail"("tokenId");

-- CreateIndex
CREATE INDEX "nft_detail_userId_idx" ON "nft_detail"("userId");

-- CreateIndex
CREATE INDEX "follwings_followerId_idx" ON "follwings"("followerId");

-- CreateIndex
CREATE INDEX "follwings_followingId_idx" ON "follwings"("followingId");

-- CreateIndex
CREATE INDEX "followers_followerId_idx" ON "followers"("followerId");

-- CreateIndex
CREATE INDEX "followers_followedId_idx" ON "followers"("followedId");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE INDEX "nft_comment_tokenId_idx" ON "nft_comment"("tokenId");

-- CreateIndex
CREATE INDEX "nft_comment_userId_idx" ON "nft_comment"("userId");

-- CreateIndex
CREATE INDEX "nft_like_userId_tokenId_idx" ON "nft_like"("userId", "tokenId");

-- CreateIndex
CREATE INDEX "nft_like_tokenId_idx" ON "nft_like"("tokenId");

-- CreateIndex
CREATE INDEX "nft_view_tokenId_idx" ON "nft_view"("tokenId");

-- CreateIndex
CREATE UNIQUE INDEX "nft_view_userId_tokenId_key" ON "nft_view"("userId", "tokenId");

-- AddForeignKey
ALTER TABLE "nft_detail" ADD CONSTRAINT "nft_detail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "engagement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follwings" ADD CONSTRAINT "follwings_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "followers" ADD CONSTRAINT "followers_followedId_fkey" FOREIGN KEY ("followedId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nft_comment" ADD CONSTRAINT "nft_comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "engagement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nft_like" ADD CONSTRAINT "nft_like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "engagement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nft_view" ADD CONSTRAINT "nft_view_userId_fkey" FOREIGN KEY ("userId") REFERENCES "engagement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
