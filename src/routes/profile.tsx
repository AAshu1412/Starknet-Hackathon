import React, { useState } from "react";
import {
  Heart,
  Share2,
  Grid,
  TextSelection as Collection,
  MoreHorizontal,
} from "lucide-react";

interface NFTCardProps {
  imageUrl: string;
  title: string;
  creator: string;
  price: number;
  likes: number;
  comments: number;
}

function ProfileNFTCard({
  imageUrl,
  title,
  creator,
  price,
  likes,
}: NFTCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showActions, setShowActions] = useState(false);

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

  return (
    <div className="break-inside-avoid mb-4">
      <div className="relative overflow-hidden rounded-xl bg-navy/30 backdrop-blur-sm group">
        <img
          src={imageUrl}
          alt={title}
          className="w-full object-cover aspect-[3/4] transition-transform duration-300 md:group-hover:scale-105"
          loading="lazy"
        />

        {/* Mobile Actions Button */}
        <button
          className="md:hidden absolute top-2 right-2 p-2 rounded-full bg-black/50 backdrop-blur-sm"
          onClick={() => setShowActions(!showActions)}
        >
          <MoreHorizontal size={20} />
        </button>

        {/* Mobile Actions Menu */}
        {showActions && (
          <div className="md:hidden absolute top-12 right-2 bg-black/90 backdrop-blur-sm rounded-lg p-2 space-y-2">
            <button
              className="flex items-center gap-2 p-2 w-full text-left hover:bg-white/10 rounded-lg"
              onClick={handleLike}
            >
              <Heart
                size={18}
                fill={isLiked ? "currentColor" : "none"}
                className={isLiked ? "text-pink-500" : ""}
              />
              <span>{isLiked ? "Unlike" : "Like"}</span>
            </button>
            <button
              className="flex items-center gap-2 p-2 w-full text-left hover:bg-white/10 rounded-lg"
              onClick={handleShare}
            >
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        )}

        {/* Desktop Overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent p-4">
          <h3 className="font-poppins font-bold text-lg truncate mb-1">
            {title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-aqua-500 font-semibold">{price} ETH</span>
            <div className="hidden md:flex items-center gap-3">
              <button
                className={`flex items-center gap-1 ${
                  isLiked ? "text-pink-500" : "text-gray-300"
                } transition-colors`}
                onClick={handleLike}
              >
                <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                <span>{isLiked ? likes + 1 : likes}</span>
              </button>
              <button
                className="text-gray-300 hover:text-white transition-colors"
                onClick={handleShare}
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// function ProfileDropdown() {
//   const [isOpen, setIsOpen] = useState(false);
//   const address = "0x1234...5678";

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex items-center gap-2 px-4 py-2 rounded-full bg-aqua-500/20 hover:bg-aqua-500/30 transition-colors"
//       >
//         <Wallet size={16} />
//         <span>{address}</span>
//         <ChevronDown
//           size={16}
//           className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
//         />
//       </button>

//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-48 rounded-xl bg-navy/90 backdrop-blur-md shadow-lg border border-white/10 overflow-hidden">
//           <div className="p-2 space-y-1">
//             <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
//               <Settings size={16} />
//               <span>Settings</span>
//             </button>
//             <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
//               <ExternalLink size={16} />
//               <span>View on Explorer</span>
//             </button>
//             <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-pink-500 hover:bg-white/10 transition-colors">
//               <LogOut size={16} />
//               <span>Disconnect</span>
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"created" | "collected">(
    "created"
  );

  const profileNFTs = [
    {
      imageUrl: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c",
      title: "Cosmic Dreamscape #42",
      creator: "CryptoArtist",
      price: 2.5,
      likes: 423,
      comments: 21,
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
      title: "Digital Metropolis",
      creator: "NFTMaster",
      price: 1.8,
      likes: 892,
      comments: 45,
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e",
      title: "Neon Dreams",
      creator: "CryptoArtist",
      price: 4.0,
      likes: 756,
      comments: 34,
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5",
      title: "Virtual Horizons",
      creator: "NFTMaster",
      price: 2.1,
      likes: 543,
      comments: 28,
    },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-6 p-4 md:p-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <div className="profile-image w-32 h-32 md:w-40 md:h-40">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-poppins font-bold mb-2">
                CryptoArtist
              </h2>
              <p className="text-gray-400 mb-4">@cryptoartist</p>
              <p className="text-lg mb-6 max-w-2xl">
                Digital artist exploring the boundaries of NFTs and creative
                expression.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <button className="px-6 py-2 rounded-full bg-aqua-500 hover:bg-aqua-500/80 transition-colors font-medium glow-hover">
                  Follow
                </button>
                {/* <button className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors font-medium">
                  Message
                </button> */}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center md:justify-start gap-12 mb-12">
            <div className="stat-item">
              <span className="stat-value">1.2K</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">847</span>
              <span className="stat-label">Following</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">42</span>
              <span className="stat-label">NFTs</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center md:justify-start gap-4 mb-8">
            <button
              className={`tab-button flex items-center gap-2 ${
                activeTab === "created" ? "active" : ""
              }`}
              onClick={() => setActiveTab("created")}
            >
              <Grid size={18} />
              <span>Created</span>
            </button>
            <button
              className={`tab-button flex items-center gap-2 ${
                activeTab === "collected" ? "active" : ""
              }`}
              onClick={() => setActiveTab("collected")}
            >
              <Collection size={18} />
              <span>Collected</span>
            </button>
          </div>
        </div>

        {/* NFT Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {profileNFTs.map((nft, index) => (
            <ProfileNFTCard key={index} {...nft} />
          ))}
        </div>
      </div>
    </div>
  );
}
