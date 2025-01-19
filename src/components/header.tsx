import { ModeToggle } from "@/components/mood-toggle";
// import { connect, StarknetWindowObject } from 'get-starknet';
// import { WalletAccount } from 'starknet';
import { Button } from "./ui/button";
import { useState } from "react";
import {
  ChevronDown,
  ExternalLink,
  LogOut,
  Search,
  Settings,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAccount, useConnect } from "@starknet-react/core";

// Convert Handle to a React component
const Handle = () => {
  const { address, status } = useAccount();
  // const [walletAccount, setWalletAccount] = useState<WalletAccount | null>(null);
  // const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [walletopen, setWalletopen] = useState(false);
  const { connectors, connect } = useConnect();
  // const handleConnect = async () => {
  //   const selectedWalletSWO: StarknetWindowObject | null = await connect({ modalMode: 'alwaysAsk', modalTheme: "dark" });
  //   if (selectedWalletSWO) {
  //     const myWalletAccount = new WalletAccount({ nodeUrl: myFrontendProviderUrl }, selectedWalletSWO);
  //     setWalletAccount(myWalletAccount);
  //   }
  // };
  console.log(connectors);

  return (
    <div className="relative">
      {status === "disconnected" ? (
        <>
          <Button
            onClick={() => setWalletopen(!walletopen)}
            className="flex items-center gap-2 px-4 py-2 text-white rounded-full bg-aqua-500/20 hover:bg-aqua-500/30 transition-colors"
          >
            Connect Wallet
          </Button>
          {walletopen && (
            <div className="absolute right-0 mt-2 w-52 rounded-xl bg-navy/90 backdrop-blur-md shadow-lg border border-white/10 overflow-hidden">
              <div className="p-2 space-y-1">
                {connectors.map((connector, index) => (
                  <button
                    key={index}
                    onClick={() => connect({ connector })}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <img
                      src={
                        typeof connector.icon === "string"
                          ? connector.icon
                          : connector.icon.dark
                      }
                      height={30}
                      width={30}
                      alt={`${connector.id} icon`}
                    />
                    <span>{connector.id}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-aqua-500/20 hover:bg-aqua-500/30 transition-colors"
          >
            <Wallet size={16} />
            <span>
              {address
                ? `${address.slice(0, 4)}..${address.slice(-3)}`
                : "anon"}
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-52 rounded-xl bg-navy/90 backdrop-blur-md shadow-lg border border-white/10 overflow-hidden">
              <div className="p-2 space-y-1">
                <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
                  <ExternalLink size={16} />
                  <span>View on Explorer</span>
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-pink-500 hover:bg-white/10 transition-colors">
                  <LogOut size={16} />
                  <span>Disconnect</span>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
// return (
// <>
{
  /* <Button
          onClick={handleConnect}
          className="hidden md:block px-4 py-2 text-white rounded-full bg-aqua-500/20 hover:bg-aqua-500/30 transition-colors">
          Connect Wallet
        </Button>
          <div className="hidden md:block overflow-hidden">
            <div
              className="rounded-full w-10 h-10 "
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
                alt="Profile"
                className="rounded-full w-full h-full"
              />
            </div>
            {isProfileOpen && <ProfileDropdown onClose={() => setIsProfileOpen(false)} />}
          </div>
           <button className="lg:hidden text-[#B084F6] hover:text-[#00B8D4] transition-colors">
            <Menu size={24} />
          </button> */
}

{
  /* </> */
}

{
  /* ) */
}

{
  /* }; */
}

const Header = () => {
  return (
    <header className="w-full p-4 md:px-8">
      <nav className="flex justify-between items-center">
        <Link to="/">
          <h1
            className="text-3xl font-bold text-[#00C8FF]
          dark:text-white
          font-['Monoton'] text-glow"
          >
            Blazy
          </h1>
        </Link>
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search NFTs..."
              className="bg-aqua-500/20 text-white rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#00B8D4]"
            />
            <Search
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          <ModeToggle />
          <Handle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
