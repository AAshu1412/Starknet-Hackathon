import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";
import Header from "./components/header";
import About from "./routes/about";
import Profile from "./routes/profile";
import Feed from "./routes/feed";
import Create from "./routes/create";
import { DataProvider } from "./store/data";
import { HelmetProvider } from "react-helmet-async";
import { StarknetProvider } from "./utils/starknet-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DataProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <StarknetProvider>
          <HelmetProvider>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/about" element={<About />} />
                <Route path="/create" element={<Create />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/feed" element={<Feed />} />
              </Routes>
            </BrowserRouter>
          </HelmetProvider>
        </StarknetProvider>
      </ThemeProvider>
    </DataProvider>
  </StrictMode>
);
