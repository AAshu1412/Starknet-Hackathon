import React, { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
interface NFTProps {
  imageUrl: string;
  title: string;
  creator: string;
  price: number;
  likes: number;
  comments: number;
  trending?: boolean;
  tokenId?: string;
}

function NFTCard({
  imageUrl,
  title,
  creator,
  price,
  likes,
  comments,
  trending,
  tokenId,
}: NFTProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [touchStartTime, setTouchStartTime] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleTouchStart = () => {
    if (isMobile) {
      setTouchStartTime(Date.now());
    }
  };

  const handleTouchEnd = () => {
    if (isMobile) {
      const touchDuration = Date.now() - touchStartTime;
      if (touchDuration < 200) {
        setShowOverlay(!showOverlay);
      }
    }
  };

  const handleLike = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleShare = async (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check out this NFT: ${title} by ${creator}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    }
  };

  const toggleActions = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setShowActions(!showActions);
  };

  return (
    <Link to={`/nft/${tokenId}`}>
      <div
        className="relative group break-inside-avoid mb-4"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative overflow-hidden rounded-xl glow-hover bg-navy/30 backdrop-blur-sm">
          {trending && (
            <div className="absolute top-2 right-2 z-10">
              <span className="bg-pink-500/90 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                Trending 🔥
              </span>
            </div>
          )}
          <img
            src={imageUrl}
            alt={title}
            className="w-full object-cover transition-transform duration-300 md:group-hover:scale-105"
            loading="lazy"
          />

          {/* Mobile Actions Button */}
          <button
            onClick={toggleActions}
            className="md:hidden absolute bottom-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-navy/80 backdrop-blur-sm"
          >
            <MoreHorizontal size={18} />
          </button>

          {/* Mobile Actions Menu */}
          {showActions && (
            <div className="md:hidden absolute bottom-12 right-2 bg-navy/90 backdrop-blur-md rounded-lg p-2 shadow-lg z-20">
              <div className="flex flex-col gap-2">
                <button
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10
                  ${isLiked ? "text-pink-500" : "text-white"}`}
                  onClick={handleLike}
                >
                  <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                  <span>Like ({isLiked ? likes + 1 : likes})</span>
                </button>
                <button
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MessageCircle size={18} />
                  <span>Comment ({comments})</span>
                </button>
                <button
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10"
                  onClick={handleShare}
                >
                  <Share2 size={18} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          )}

          {/* Desktop Overlay */}
          <div
            className={`absolute hidden md:block inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent transition-opacity duration-200
            ${
              showOverlay
                ? "opacity-100"
                : "opacity-0 md:group-hover:opacity-100 hidden md:block"
            }`}
          >
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="font-poppins font-bold text-lg truncate mb-1 glow-text">
                {title}
              </h3>
              <p className="text-sm text-gray-300 mb-2">by {creator}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-aqua-500 font-semibold">{price} ETH</span>
                <button className="bg-aqua-500 text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-aqua-500/80 transition-colors">
                  Bid Now
                </button>
              </div>
              <div className="flex items-center gap-4">
                <button
                  className={`flex items-center gap-1 transition-colors duration-200
                  ${
                    isLiked
                      ? "text-pink-500"
                      : "text-gray-300 hover:text-pink-500"
                  }`}
                  onClick={handleLike}
                >
                  <Heart
                    size={18}
                    fill={isLiked ? "currentColor" : "none"}
                    className={isLiked ? "animate-pulse" : ""}
                  />
                  <span>{isLiked ? likes + 1 : likes}</span>
                </button>
                <button
                  className="flex items-center gap-1 text-gray-300 hover:text-lavender-500 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MessageCircle size={18} />
                  <span>{comments}</span>
                </button>
                <button
                  className="ml-auto text-gray-300 hover:text-aqua-500 transition-colors"
                  onClick={handleShare}
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Title and Price (Always Visible) */}
          <div className="md:hidden p-3">
            <h3 className="font-poppins font-bold text-base truncate">
              {title}
            </h3>
            <div className="flex items-center justify-between mt-1">
              <p className="text-sm text-gray-300">by {creator}</p>
              <span className="text-aqua-500 font-semibold">{price} ETH</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

const nfts = [
  {
    imageUrl: "https://images.unsplash.com/photo-1736264335209-05960b7aa567",
    title: "Cosmic Dreamscape #42",
    token: "fjdsalkf;jjkasdfj;laskdjf",
    creator: "CryptoArtist",
    price: 2.5,
    likes: 423,
    comments: 21,
    trending: true,
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538",
    title: "Abstract Reality",
    token: "fjdsalkf;jjkasdfj;laskdjf",
    creator: "PixelPirate",
    price: 3.2,
    likes: 1247,
    comments: 67,
    trending: true,
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1",
    title: "Desert Mirage",
    creator: "ArtBlock",
    token: "fjdsalkf;jjkasdfj;laskdjf",
    price: 1.5,
    likes: 654,
    comments: 32,
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1682695797221-8164ff1fafc9",
    title: "Neon Forest",
    creator: "CyberArtist",
    token: "fjdsalkf;jjkasdfj;laskdjf",
    price: 4.0,
    likes: 328,
    comments: 15,
    trending: true,
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1735814933921-ab6afbdf5d17",
    title: "Digital Metropolis",
    creator: "NFTMaster",
    price: 1.8,
    token: "fjdsalkf;jjkasdfj;laskdjf",
    likes: 892,
    comments: 45,
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1682686581221-c126206d12f0",
    title: "Future City",
    token: "fjdsalkf;jjkasdfj;laskdjf",
    creator: "Web3Creator",
    price: 2.8,
    likes: 975,
    comments: 54,
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1682686580024-580519d4b2d2",
    title: "Mountain Dreams",
    creator: "NFTLegend",
    price: 1.9,
    likes: 756,
    token: "fjdsalkf;jjkasdfj;laskdjf",
    comments: 38,
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1682686580186-b55d2a91053c",
    title: "Digital Autumn",
    creator: "CryptoVision",
    price: 2.2,
    likes: 543,
    comments: 27,
    token: "fjdsalkf;jjkasdfj;laskdjf",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1",
    title: "Desert Mirage",
    creator: "ArtBlock",
    price: 1.5,
    likes: 654,
    token: "fjdsalkf;jjkasdfj;laskdjf",
    comments: 32,
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1682695797221-8164ff1fafc9",
    title: "Neon Forest",
    token: "fjdsalkf;jjkasdfj;laskdjf",
    creator: "CyberArtist",
    price: 4.0,
    likes: 328,
    comments: 15,
    trending: true,
  },
  {
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1690522330973-021425184c2d",
    title: "Digital Metropolis",
    token: "fjdsalkf;jjkasdfj;laskdjf",
    creator: "NFTMaster",
    price: 1.8,
    likes: 892,
    comments: 45,
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1682695797221-8164ff1fafc9",
    title: "Neon Forest",
    creator: "CyberArtist",
    price: 4.0,
    likes: 328,
    token: "fjdsalkf;jjkasdfj;laskdjf",
    comments: 15,
    trending: true,
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1682686581221-c126206d12f0",
    title: "Future City",
    creator: "Web3Creator",
    token: "fjdsalkf;jjkasdfj;laskdjf",
    price: 2.8,
    likes: 975,
    comments: 54,
  },
  {
    token: "fjdsalkf;jjkasdfj;laskdjf",
    imageUrl: "https://images.unsplash.com/photo-1682686580024-580519d4b2d2",
    title: "Mountain Dreams",
    creator: "NFTLegend",
    price: 1.9,
    likes: 756,
    comments: 38,
  },
  {
    token: "fjdsalkf;jjkasdfj;laskdjf",
    imageUrl: "https://images.unsplash.com/photo-1682686581221-c126206d12f0",
    title: "Future City",
    creator: "Web3Creator",
    price: 2.8,
    likes: 975,
    comments: 54,
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1682686580024-580519d4b2d2",
    title: "Mountain Dreams",
    creator: "NFTLegend",
    price: 1.9,
    likes: 756,
    token: "fjdsalkf;jjkasdfj;laskdjf",
    comments: 38,
  },
];

function App() {
  return (
    <div className="min-h-screen pb-20 md:pb-6 p-4 md:p-6">
      <div className="max-w-[2000px] mx-auto flex gap-6">
        <main className="flex-1">
          <div className="card-grid gap-3">
            {nfts.map((nft, index) => (
              <NFTCard key={index} {...nft} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
