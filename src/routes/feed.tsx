import MobileLayout from '@/components/feed/MobileLayout'
import DesktopLayout from '@/components/feed/DesktopLayout'

export default function Feed() {
  return (
  <div className="min-h-screen bg-gradient-to-b from-[#1B1B2F] to-[#1E2A47]"> 
     <div className="md:hidden"> 
       <MobileLayout /> 
    </div> 
     <div className="hidden md:block"> 
       <DesktopLayout /> 
     </div> 
   </div> 
  )
}

