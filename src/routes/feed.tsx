import NFTFeed from '@/components/feed/NFTFeed'
import MobileNavigation from '@/components/feed/MobileNavigation'

export default function Feed()  {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow overflow-y-auto pb-16">
        <NFTFeed />
      </main>
      <MobileNavigation />
    </div>
  )
}