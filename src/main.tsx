import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import Header from './components/header.tsx';
import { DataProvider } from './store/data.tsx'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <DataProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header></Header>
        <App />
      </ThemeProvider>
      </DataProvider>
  </StrictMode>,
)
