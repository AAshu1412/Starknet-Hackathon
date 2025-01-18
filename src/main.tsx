import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import './index.css'
import Header from './components/header'
import About from './routes/about'
import Contact from './routes/contact'
import Feed from './routes/feed'
import { HelmetProvider } from 'react-helmet-async'
import { StarknetProvider } from './utils/starknet-provider'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <StarknetProvider>
        <HelmetProvider>
          <BrowserRouter>
            <Header/>
            <Routes>
              <Route path='/' element={<Feed/>} />
              <Route path='/about' element={<About/>} />
              <Route path='/contact' element={<Contact/>} />
              <Route path="/feed" element={<Feed />} />
            </Routes>
          </BrowserRouter>
        </HelmetProvider>
      </StarknetProvider>
    </ThemeProvider>
  </StrictMode>,
)
