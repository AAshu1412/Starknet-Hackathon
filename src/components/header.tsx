import { ModeToggle } from "@/components/mood-toggle"
import { connect, StarknetWindowObject } from 'get-starknet'; // Ensure correct imports
import { WalletAccount } from 'starknet'; // Ensure correct imports
import { Button } from "./ui/button";
import { useTheme } from "@/hooks/use-theme";
import React, { useState } from 'react'; // Import React and useState
import { Search } from "lucide-react";
const myFrontendProviderUrl = 'https://free-rpc.nethermind.io/sepolia-juno/v0_7';

// Convert Handle to a React component
const Handle: React.FC<{ theme: string }> = (theme) => {

  const [walletAccount, setWalletAccount] = useState<WalletAccount | null>(null);

  const handleConnect = async () => {
    const selectedWalletSWO: StarknetWindowObject | null = await connect({ modalMode: 'alwaysAsk', modalTheme: `${theme}` });
    if (selectedWalletSWO) {
      const myWalletAccount = new WalletAccount({ nodeUrl: myFrontendProviderUrl }, selectedWalletSWO);
      setWalletAccount(myWalletAccount);
    }
  };

  return <Button
    onClick={handleConnect}
    className="px-4 py-2 text-white rounded-full bg-aqua-500/20 hover:bg-aqua-500/30 transition-colors">
    Connect Wallet
  </Button>
};

const Header = () => {
  const { theme } = useTheme();
  return (
    <header className="w-full p-4 md:px-8">
      <nav className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#00C8FF]
          dark:text-white
          font-['Monoton'] text-glow">Blazy</h1>
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search NFTs..."
              className="bg-aqua-500/20 text-white rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#00B8D4]"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <ModeToggle />
          <Handle theme={theme} />
        </div>
      </nav>
    </header>
  )
}
export default Header
// 