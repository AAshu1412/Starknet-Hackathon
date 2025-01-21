import NFTFeed from '@/components/feed/NFTFeed'
import MobileNavigation from '@/components/feed/MobileNavigation'
import { Metadata } from '@/components/meta-tags';
export default function Feed() {
  return (
    <div className="flex flex-col min-h-screen">
      <Metadata name='HyprStark' description='A social nft app' />
      <main className="flex-grow overflow-y-auto pb-16">
        <NFTFeed />
      </main>
      <MobileNavigation />
    </div>
  )
}
