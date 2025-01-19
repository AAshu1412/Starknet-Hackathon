import { Home, Compass, PlusCircle, User } from 'lucide-react'

const DesktopSidebar = () => {
  return (
    <aside className="w-64 bg-gradient-to-b from-[#233343] to-[#1E2A47] p-6 flex flex-col">
      <h1 className="text-4xl font-bold text-[#00B8D4] font-['Poppins'] mb-12 text-glow">Blazy</h1>
      <nav className="flex-grow">
        <ul className="space-y-6">
          <NavItem icon={<Home size={24} />} label="Home" />
          <NavItem icon={<Compass size={24} />} label="Explore" />
          <NavItem icon={<PlusCircle size={24} />} label="Create NFT" isHighlighted />
          <NavItem icon={<User size={24} />} label="Profile" />
        </ul>
      </nav>
    </aside>
  )
}
//@ts-expect-error heleo
const NavItem = ({ icon, label, isHighlighted = false }) => (
  <li>
    <button className={`flex items-center space-x-4 ${isHighlighted ? 'text-[#F13D78]' : 'text-[#B8BCC3]'} hover:text-[#00B8D4] transition-colors w-full`}>
      <div className={`${isHighlighted ? 'glow-pink-hover' : 'glow-hover'} p-2 rounded-full`}>
        {icon}
      </div>
      <span className="text-lg font-['Inter']">{label}</span>
    </button>
  </li>
)

export default DesktopSidebar

