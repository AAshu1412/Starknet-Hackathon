import { Search, Bell } from 'lucide-react'

const MobileHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#2A2A72] to-[#305575] p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#00B8D4] font-['Poppins'] text-glow">Blazy</h1>
        <div className="flex items-center space-x-4">
          <button className="text-[#B8BCC3] hover:text-[#00B8D4] transition-colors">
            <Search size={24} />
          </button>
          <button className="text-[#B8BCC3] hover:text-[#00B8D4] transition-colors">
            <Bell size={24} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default MobileHeader

