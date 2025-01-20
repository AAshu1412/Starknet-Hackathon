import React, { useState } from 'react';
import { 
  Heart, 
  Eye, 
  MessageCircle, 
  Share2, 
  ChevronDown,
  Send
} from 'lucide-react';

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  timestamp: string;
}

interface NFT {
  id: string;
  title: string;
  image: string;
  description: string;
  creator: {
    name: string;
    avatar: string;
  };
  owner: {
    name: string;
    avatar: string;
  };
  price: number;
  likes: number;
  views: number;
  comments: Comment[];
  created: string;
  contractAddress: string;
  tokenId: string;
  traits: Array<{
    trait_type: string;
    value: string;
  }>;
}

const sampleNFT: NFT = {
  id: '1',
  title: 'Cosmic Dreamscape #42',
  image: 'https://images.unsplash.com/photo-1634973357973-f2ed2657db3c',
  description: 'A mesmerizing digital artwork that explores the boundaries between reality and imagination. This piece combines elements of abstract art with cosmic themes, creating a unique visual experience that captures the essence of digital creativity.',
  creator: {
    name: 'CryptoArtist',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'
  },
  owner: {
    name: 'NFTCollector',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956'
  },
  price: 2.5,
  likes: 423,
  views: 1892,
  comments: [
    {
      id: '1',
      user: {
        name: 'PixelMaster',
        avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d'
      },
      text: 'This is absolutely stunning! The attention to detail is remarkable.',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      user: {
        name: 'ArtLover',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
      },
      text: 'The color palette is so vibrant and eye-catching. Great work!',
      timestamp: '5 hours ago'
    }
  ],
  created: '2024-03-15',
  contractAddress: '0x1234...5678',
  tokenId: '42',
  traits: [
    { trait_type: 'Background', value: 'Cosmic Night' },
    { trait_type: 'Style', value: 'Abstract' },
    { trait_type: 'Color Scheme', value: 'Vibrant' }
  ]
};

const relatedNFTs = [
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
    title: 'Digital Metropolis',
    creator: 'NFTMaster',
    price: 1.8,
    likes: 892
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1633101585272-9511612d3936',
    title: 'Abstract Reality',
    creator: 'PixelPirate',
    price: 3.2,
    likes: 1247
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e',
    title: 'Neon Dreams',
    creator: 'CryptoArtist',
    price: 4.0,
    likes: 756
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5',
    title: 'Virtual Horizons',
    creator: 'NFTMaster',
    price: 2.1,
    likes: 543
  }
];

export default function Nft() {
  const [isLiked, setIsLiked] = useState(false);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showMetadata, setShowMetadata] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: sampleNFT.title,
          text: `Check out this NFT: ${sampleNFT.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Add comment logic here
      setNewComment('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#42007a] to-[#7f20ff]">
      {/* Header */}
      {/* <header className="sticky top-0 z-50 bg-gradient-to-r from-[#42007a]/95 to-[#7f20ff]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <button 
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
              >
                <ChevronLeft size={20} />
                <span>Back</span>
              </button>
              <div className="flex items-center gap-2">
                <ImageIcon className="w-8 h-8 text-white" />
                <span className="text-xl font-bold text-white">Blazy</span>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
              >
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <ChevronDown size={16} className={`text-white transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20 overflow-hidden">
                  <div className="p-2 space-y-1">
                    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors">
                      <User size={16} />
                      <span>Profile</span>
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors">
                      <ExternalLink size={16} />
                      <span>View on Explorer</span>
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-pink-500 hover:bg-white/10 transition-colors">
                      <LogOut size={16} />
                      <span>Disconnect</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header> */}

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm shadow-xl group">
              <img
                src={sampleNFT.image}
                alt={sampleNFT.title}
                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="space-y-6 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-white">{sampleNFT.title}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={sampleNFT.creator.avatar}
                      alt={sampleNFT.creator.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-white/60 text-sm">Creator</p>
                      <p className="text-white font-medium">{sampleNFT.creator.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src={sampleNFT.owner.avatar}
                      alt={sampleNFT.owner.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-white/60 text-sm">Owner</p>
                      <p className="text-white font-medium">{sampleNFT.owner.name}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Description</h2>
                <p className="text-white/80 leading-relaxed">
                  {sampleNFT.description}
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setShowMetadata(!showMetadata)}
                  className="flex items-center gap-2 text-white font-medium"
                >
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${
                      showMetadata ? 'rotate-180' : ''
                    }`}
                  />
                  Details
                </button>
                {showMetadata && (
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-white/60 text-sm">Contract Address</p>
                        <p className="text-white font-medium">{sampleNFT.contractAddress}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-white/60 text-sm">Token ID</p>
                        <p className="text-white font-medium">{sampleNFT.tokenId}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-white/60 text-sm">Created</p>
                        <p className="text-white font-medium">{sampleNFT.created}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-white/60 text-sm">Traits</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {sampleNFT.traits.map((trait, index) => (
                          <div
                            key={index}
                            className="bg-white/5 rounded-lg p-2 text-center"
                          >
                            <p className="text-white/60 text-xs">{trait.trait_type}</p>
                            <p className="text-white font-medium">{trait.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Stats and Interactions */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-6">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 text-lg font-medium transition-colors ${
                      isLiked ? 'text-pink-500' : 'text-white'
                    }`}
                  >
                    <Heart
                      size={24}
                      className={isLiked ? 'fill-current' : ''}
                    />
                    <span>{isLiked ? sampleNFT.likes + 1 : sampleNFT.likes}</span>
                  </button>
                  <div className="flex items-center gap-2 text-lg font-medium text-white">
                    <Eye size={24} />
                    <span>{sampleNFT.views}</span>
                  </div>
                </div>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <Share2 size={24} className="text-white" />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div>
                  <p className="text-white/60 text-sm">Current Price</p>
                  <p className="text-2xl font-bold text-white">{sampleNFT.price} ETH</p>
                </div>
                <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#42007a] to-[#7f20ff] hover:from-[#4b0088] hover:to-[#8c37ff] text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Comments */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <MessageCircle size={24} className="text-white" />
                <h2 className="text-xl font-semibold text-white">Comments</h2>
              </div>
              <div className="space-y-4 mb-6">
                {sampleNFT.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-white">
                          {comment.user.name}
                        </p>
                        <span className="text-white/40 text-sm">
                          {comment.timestamp}
                        </span>
                      </div>
                      <p className="text-white/80">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSubmitComment} className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 bg-white/5 rounded-xl px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-gradient-to-r from-[#42007a] to-[#7f20ff] hover:from-[#4b0088] hover:to-[#8c37ff] text-white transition-all duration-300"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Related NFTs */}
        <div className="mt-16 space-y-8">
          <h2 className="text-2xl font-bold text-white">More NFTs You May Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {relatedNFTs.map((nft) => (
              <div
                key={nft.id}
                className="rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm group"
              >
                <div className="relative">
                  <img
                    src={nft.image}
                    alt={nft.title}
                    className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-medium mb-1">{nft.title}</h3>
                      <p className="text-white/80 text-sm">{nft.creator}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-white font-medium">{nft.price} ETH</p>
                        <div className="flex items-center gap-1 text-white">
                          <Heart size={16} />
                          <span className="text-sm">{nft.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}