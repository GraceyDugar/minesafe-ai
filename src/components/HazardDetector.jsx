import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MOCK_RESULTS = [
  { icon: '🪨', name: 'Rockfall Cluster',   confidence: 94, risk: 'HIGH',     color: '#ff4d4d' },
  { icon: '🧑‍🦺', name: 'Worker Detected',   confidence: 97, risk: 'PROXIMITY', color: '#f4a233' },
  { icon: '🔩', name: 'Structural Crack',   confidence: 88, risk: 'HIGH',     color: '#ff4d4d' },
  { icon: '🚛', name: 'Heavy Machinery',    confidence: 91, risk: 'CLEAR',    color: '#3be8b0' },
]

export default function HazardDetector() {
  const [image, setImage]       = useState(null)
  const [loading, setLoading]   = useState(false)
  const [results, setResults]   = useState([])
  const [done, setDone]         = useState(false)

  function handleUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setImage(url)
    setResults([])
    setDone(false)
  }

  async function runDetection() {
    setLoading(true)
    setResults([])
    setDone(false)

    // RIGHT NOW: simulated results
    // LATER: replace this with your real FastAPI call like this:
    // const form = new FormData()
    // form.append('file', imageFile)
    // const res = await axios.post('https://your-backend.railway.app/predict', form)
    // setResults(res.data.detections)

    const formData = new FormData()
formData.append('file', document.getElementById('fileInput').files[0])

const res = await fetch('http://localhost:8000/api/detect', {
  method: 'POST',
  body: formData
})
const data = await res.json()
setResults(data.detections || [])
setLoading(false)
setDone(true)
  }

  return (
    <section id="detect" style={sectionStyle}>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div style={labelStyle}>
          <span style={labelLineStyle} />
          Module 01
        </div>
        <h2 style={titleStyle}>Live Hazard<br />Detection</h2>
        <p style={subStyle}>
          Upload a mining environment image. Our YOLO model trained
          on Tata Steel data identifies workers, rockfall, cracks
          and machinery in real time.
        </p>
      </motion.div>

      {/* Main Grid */}
      <div style={gridStyle}>

        {/* LEFT — Upload */}
        <div>
          <div
            style={{
              ...uploadZoneStyle,
              borderColor: image ? '#3be8b0' : 'rgba(255,255,255,0.07)',
            }}
            onClick={() => document.getElementById('fileInput').click()}
          >
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleUpload}
            />
            {image ? (
              <img
                src={image}
                alt="uploaded"
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  display: 'block',
                }}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                <div style={uploadIconStyle}>📸</div>
                <div style={uploadTextStyle}>Drop a mine image here</div>
                <div style={uploadHintStyle}>PNG, JPG — thermal or visible spectrum</div>
              </div>
            )}
          </div>

          <button
            onClick={runDetection}
            disabled={!image || loading}
            style={{
              ...detectBtnStyle,
              opacity: !image || loading ? 0.5 : 1,
              cursor: !image || loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? '⏳ Running YOLO inference...' : done ? '✅ Run Again' : '⚡ Run YOLO Detection'}
          </button>
        </div>

        {/* RIGHT — Results */}
        <div style={resultsPanelStyle}>
          <div style={resultsHeaderStyle}>
            <span style={resultsTitleStyle}>Detection Results</span>
            <span style={liveBadgeStyle}>
              <span style={liveDotStyle} />
              YOLOv8
            </span>
          </div>

          <div style={{ padding: '24px' }}>
            {/* Empty state */}
            {!loading && results.length === 0 && (
              <div style={emptyStateStyle}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔭</div>
                <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', color: '#5a5f72' }}>
                  Upload an image and run detection
                </p>
              </div>
            )}

            {/* Loading state */}
            {loading && (
              <div style={emptyStateStyle}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  style={{ fontSize: '32px', marginBottom: '12px' }}
                >
                  ⚙️
                </motion.div>
                <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', color: '#5a5f72' }}>
                  Analyzing image...
                </p>
              </div>
            )}

            {/* Results list */}
            <AnimatePresence>
              {results.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  style={hazardItemStyle}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px', height: '36px',
                      borderRadius: '8px',
                      background: item.color + '20',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '16px',
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '13px' }}>
                        {item.name}
                      </div>
                      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#5a5f72' }}>
                        Confidence: {item.confidence}%
                      </div>
                    </div>
                  </div>
                  <span style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '10px',
                    padding: '4px 10px',
                    borderRadius: '100px',
                    background: item.color + '20',
                    color: item.color,
                    border: `1px solid ${item.color}40`,
                  }}>
                    {item.risk}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Confidence bar */}
            {done && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#5a5f72', marginBottom: '8px' }}>
                  <span>Overall Model Confidence</span>
                  <span>94%</span>
                </div>
                <div style={{ height: '4px', background: '#13161e', borderRadius: '100px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '94%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{ height: '100%', background: 'linear-gradient(90deg, #3be8b0, #f4a233)', borderRadius: '100px' }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

const sectionStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '100px 48px',
}
const labelStyle = {
  fontFamily: 'DM Mono, monospace',
  fontSize: '10px',
  letterSpacing: '3px',
  textTransform: 'uppercase',
  color: '#f4a233',
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
}
const labelLineStyle = {
  display: 'inline-block',
  width: '24px', height: '1px',
  background: '#f4a233',
}
const titleStyle = {
  fontFamily: 'Syne, sans-serif',
  fontWeight: 800,
  fontSize: 'clamp(28px, 4vw, 48px)',
  letterSpacing: '-1.5px',
  color: '#fff',
  lineHeight: 1.1,
  marginBottom: '16px',
}
const subStyle = {
  color: '#5a5f72',
  maxWidth: '480px',
  fontSize: '15px',
  lineHeight: 1.7,
  marginBottom: '48px',
}
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '24px',
  alignItems: 'start',
}
const uploadZoneStyle = {
  border: '1.5px dashed',
  borderRadius: '16px',
  background: '#0d0f14',
  cursor: 'pointer',
  overflow: 'hidden',
  transition: 'border-color 0.3s',
}
const uploadIconStyle = {
  width: '56px', height: '56px',
  background: 'rgba(244,162,51,0.1)',
  border: '1px solid rgba(244,162,51,0.2)',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 16px',
  fontSize: '22px',
}
const uploadTextStyle = {
  fontFamily: 'Syne, sans-serif',
  fontWeight: 600,
  fontSize: '15px',
  color: '#e8eaf0',
  marginBottom: '8px',
}
const uploadHintStyle = {
  fontFamily: 'DM Mono, monospace',
  fontSize: '11px',
  color: '#5a5f72',
}
const detectBtnStyle = {
  width: '100%',
  marginTop: '16px',
  background: '#f4a233',
  color: '#000',
  fontFamily: 'Syne, sans-serif',
  fontWeight: 700,
  fontSize: '14px',
  padding: '16px',
  borderRadius: '10px',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  transition: 'all 0.2s',
}
const resultsPanelStyle = {
  background: '#0d0f14',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '16px',
  overflow: 'hidden',
}
const resultsHeaderStyle = {
  padding: '20px 24px',
  borderBottom: '1px solid rgba(255,255,255,0.07)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}
const resultsTitleStyle = {
  fontFamily: 'Syne, sans-serif',
  fontWeight: 700,
  fontSize: '14px',
}
const liveBadgeStyle = {
  fontFamily: 'DM Mono, monospace',
  fontSize: '10px',
  letterSpacing: '1px',
  background: 'rgba(59,232,176,0.1)',
  border: '1px solid rgba(59,232,176,0.25)',
  color: '#3be8b0',
  padding: '4px 10px',
  borderRadius: '100px',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
}
const liveDotStyle = {
  width: '6px', height: '6px',
  background: '#3be8b0',
  borderRadius: '50%',
}
const emptyStateStyle = {
  textAlign: 'center',
  padding: '48px 24px',
}
const hazardItemStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '14px 16px',
  borderRadius: '10px',
  background: '#13161e',
  marginBottom: '10px',
  border: '1px solid rgba(255,255,255,0.07)',
}