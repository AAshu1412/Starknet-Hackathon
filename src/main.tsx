import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import './index.css'
import Home from "./routes/home"
import Header from './components/header'
import About from './routes/about'
import Contact from './routes/contact'
// import Feed from './routes/feed'
import { HelmetProvider } from 'react-helmet-async'
import { StarknetProvider } from './utils/starknet-provider'
import MobileLayout from './components/feed/MobileLayout'

// Example of using process conditionally
if (typeof process !== 'undefined') {
  // Code that uses process
}

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <StarknetProvider>
        <HelmetProvider>
          <BrowserRouter>
            <Header/>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/about' element={<About/>} />
              <Route path='/contact' element={<Contact/>} />
              <Route path="/feed" element={<MobileLayout/>} />
            </Routes>
          </BrowserRouter>
        </HelmetProvider>
      </StarknetProvider>
    </ThemeProvider>
  </StrictMode>,
)
