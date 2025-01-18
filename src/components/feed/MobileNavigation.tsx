import { Home, Compass, PlusCircle, User } from 'lucide-react'

const MobileNavigation = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#203a2b] to-[#3b546b] shadow-lg">
      <div className="flex justify-around py-2">
        <NavItem icon={<Home size={24} />} />
        <NavItem icon={<Compass size={24} />} />
        <NavItem icon={<PlusCircle size={24} />} isHighlighted />
        <NavItem icon={<User size={24} />} />
      </div>
    </nav>
  )
}

const NavItem = ({ icon, isHighlighted = false }) => (
  <button className={`items-center 
  ${isHighlighted ? 'text-[#F13D78]' : 'text-[#B8BCC3]'}
   hover:text-[#00B8D4] transition-colors`}>
    <div className={`${isHighlighted ? 'glow-pink-hover' : 'glow-hover'} px-2 py-0 rounded-full`}>
      {icon}
    </div>
  </button>
)

export default MobileNavigation

