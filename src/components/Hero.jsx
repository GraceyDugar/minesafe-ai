import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function useCounter(target, duration = 2000, suffix = '') {
  const [count, setCount] = useState(target)
  useEffect(() => {
    if (!target) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])
  return count + suffix
}

function StatItem({ label, value, suffix, color }) {
  const count = useCounter(value, 2000, suffix)
  return (
    <div style={styles.statItem}>
      <span style={{ ...styles.statVal, color }}>{count}</span>
      <span style={styles.statLabel}>{label}</span>
    </div>
  )
}

export default function Hero() {
 

  // Fetch real data from your backend on load
 

  const STATS = [
    { label: 'Tunnels Analyzed',   value: 1000, suffix: '',  color: '#3be8b0' },
    { label: 'High Risk Zones',    value: 824,  suffix: '',  color: '#f4a233' },
    { label: 'Detection Accuracy', value: 94,   suffix: '%', color: '#e8eaf0' },
    { label: 'Avg Depth',          value: 108,  suffix: 'm', color: '#4d9fff' },
  ]

  return (
    <section style={styles.section}>
      <div style={styles.grid} />
      <div style={styles.glow} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={styles.eyebrow}
      >
        ROS · YOLO · Digital Twin · LoRa · LiDAR
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={styles.title}
      >
        Mining Intelligence<br />
        That <span style={styles.highlight}>Sees Underground</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={styles.sub}
      >
        Cognitive Digital Twin meets autonomous hazard detection.
        Real-time YOLO perception, predictive rockfall analysis,
        and memory-driven safe navigation for the mines of tomorrow.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={styles.ctas}
      >
        <a href="#detect" style={styles.btnPrimary}>⚡ Try Live Detection</a>
        <a href="#digital-twin" style={styles.btnGhost}>↓ View Digital Twin</a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        style={styles.statsBar}
      >
        {STATS.map((s) => (
          <StatItem key={s.label + s.value} {...s} />
  ))}
      </motion.div>
    </section>
  )
}

const styles = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: '120px 48px 80px',
    textAlign: 'center',
    overflow: 'hidden',
  },
  grid: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
    `,
    backgroundSize: '60px 60px',
    WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)',
    maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)',
  },
  glow: {
    position: 'absolute',
    width: '600px', height: '600px',
    background: 'radial-gradient(circle, rgba(244,162,51,0.08) 0%, transparent 70%)',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
  },
  eyebrow: {
    fontFamily: 'DM Mono, monospace',
    fontSize: '11px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: '#f4a233',
    marginBottom: '24px',
    position: 'relative',
  },
  title: {
    fontFamily: 'Syne, sans-serif',
    fontWeight: 800,
    fontSize: 'clamp(40px, 7vw, 88px)',
    lineHeight: 1.0,
    letterSpacing: '-3px',
    color: '#fff',
    maxWidth: '900px',
    marginBottom: '28px',
    position: 'relative',
  },
  highlight: {
    background: 'linear-gradient(135deg, #f4a233, #3be8b0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  sub: {
    fontSize: '16px',
    color: '#5a5f72',
    maxWidth: '560px',
    lineHeight: 1.7,
    marginBottom: '48px',
    position: 'relative',
  },
  ctas: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    marginBottom: '64px',
    position: 'relative',
  },
  btnPrimary: {
    background: '#f4a233',
    color: '#000',
    fontFamily: 'Syne, sans-serif',
    fontWeight: 700,
    fontSize: '13px',
    padding: '14px 28px',
    borderRadius: '8px',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  },
  btnGhost: {
    background: 'transparent',
    color: '#e8eaf0',
    fontFamily: 'DM Mono, monospace',
    fontSize: '12px',
    padding: '14px 28px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.07)',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  },
  statsBar: {
    display: 'flex',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '12px',
    overflow: 'hidden',
    maxWidth: '700px',
    width: '100%',
    position: 'relative',
  },
  statItem: {
    flex: 1,
    padding: '20px 24px',
    borderRight: '1px solid rgba(255,255,255,0.07)',
    background: '#0d0f14',
    textAlign: 'center',
  },
  statVal: {
    fontFamily: 'Syne, sans-serif',
    fontWeight: 800,
    fontSize: '26px',
    display: 'block',
  },
  statLabel: {
    fontFamily: 'DM Mono, monospace',
    fontSize: '10px',
    color: '#5a5f72',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    marginTop: '4px',
    display: 'block',
  },
}