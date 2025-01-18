import NFTFeed from './NFTFeed'
import MobileNavigation from './MobileNavigation'

const MobileLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow overflow-y-auto pb-16">
        <NFTFeed />
      </main>
      <MobileNavigation />
    </div>
  )
}

export default MobileLayout

