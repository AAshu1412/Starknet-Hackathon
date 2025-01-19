import Link from 'next/link'
import { User, Settings, LogOut, Heart } from 'lucide-react'

const ProfileDropdown = ({ onClose }) => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-[#2A2A3C] rounded-lg shadow-lg overflow-hidden z-50">
      <div className="py-1">
        <Link href="/profile" className="block px-4 py-2 text-sm text-white hover:bg-[#1E1E2F] transition-colors duration-200" onClick={onClose}>
          <User className="inline-block mr-2" size={16} />
          Profile
        </Link>
        <Link href="/settings" className="block px-4 py-2 text-sm text-white hover:bg-[#1E1E2F] transition-colors duration-200" onClick={onClose}>
          <Settings className="inline-block mr-2" size={16} />
          Settings
        </Link>
        <Link href="/favorites" className="block px-4 py-2 text-sm text-white hover:bg-[#1E1E2F] transition-colors duration-200" onClick={onClose}>
          <Heart className="inline-block mr-2" size={16} />
          Favorites
        </Link>
        <button className="w-full text-left px-4 py-2 text-sm text-[#F13D78] hover:bg-[#1E1E2F] transition-colors duration-200" onClick={onClose}>
          <LogOut className="inline-block mr-2" size={16} />
          Logout
        </button>
      </div>
    </div>
  )
}

export default ProfileDropdown

