import React, { createContext, useContext, useState, ReactNode } from "react";
interface DataContextType {
  ipfsHash: string;
  setIpfsHash: React.Dispatch<React.SetStateAction<string>>;
}
export const DataContext = createContext<DataContextType | undefined>(undefined);
interface DataProviderProps {
  children: ReactNode;
}
export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [ipfsHash, setIpfsHash] = useState<string>("");
  return (
    <DataContext.Provider value={{ ipfsHash, setIpfsHash }}>
      {children}
    </DataContext.Provider>
  );
};
export const useData = (): DataContextType => {
  const dataContextValue = useContext(DataContext);
  if (!dataContextValue) {
    throw new Error("useData must be used within a DataProvider");
  }
  return dataContextValue;
};