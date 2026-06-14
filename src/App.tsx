import { Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import HomePage from '@/pages/HomePage'
import ThreatPage from '@/pages/ThreatPage'
import { SmoothScroll } from '@/components/SmoothScroll'
import { MOTION_EASE } from '@/lib/motion'

export default function App() {
  return (
    <MotionConfig
      transition={{ duration: 0.55, ease: MOTION_EASE }}
      reducedMotion="user"
    >
      <SmoothScroll />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/threat/:id" element={<ThreatPage />} />
      </Routes>
    </MotionConfig>
  )
}
