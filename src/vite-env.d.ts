/// <reference types="vite/client" />

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

