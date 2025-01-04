import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import StandardLeaderboard from './components/leaderboards/StandardLeaderboard.tsx'
import TDMLeaderboard from './components/leaderboards/TDMLeaderboard.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StandardLeaderboard />
    <TDMLeaderboard />
  </StrictMode>,
)
