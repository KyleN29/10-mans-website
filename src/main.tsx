import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import StandardLeaderboard from './StandardLeaderboard.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StandardLeaderboard />
  </StrictMode>,
)
