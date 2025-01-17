import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import Header from './components/header.tsx'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header></Header>
        <App />
      </ThemeProvider>
  </StrictMode>,
)
