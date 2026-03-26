import React, { useState } from 'react'
import axios from 'axios'
import { User, Calendar, DollarSign, Activity, ChevronRight, RefreshCw, Sparkles, BarChart2, ArrowLeft, Loader2, Award, TrendingUp, Info } from 'lucide-react'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ZAxis } from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'

function Predict() {
  const initialFormState = { gender: 'Male', age: '', income: '' };
  const [formData, setFormData] = useState(initialFormState)
  const [result, setResult] = useState(null)
  const [exactScore, setExactScore] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Dashboard State
  const [view, setView] = useState('predict') // 'predict' | 'dashboard'
  const [dashboardData, setDashboardData] = useState(null)
  const [dashboardLoading, setDashboardLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    setExactScore(null)

    // Age validation
    if (parseInt(formData.age) < 18) {
      setError("Customer age must be 18 or greater ⚠️")
      setLoading(false)
      return
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData)
      if (response.data.status === 'success') {
        const score = response.data.exact_score;
        setExactScore(score);

        let segment = 'Low';
        if (score >= 67) segment = 'High';
        else if (score >= 34) segment = 'Medium';
        
        setResult(segment);
      } else {
        setError("Error predicting data: " + response.data.error)
      }
    } catch (err) {
      setError("Failed to connect to backend. Please ensure Flask is running.")
    } finally {
      setTimeout(() => setLoading(false), 1200); // Artificial delay to show premium loader
    }
  }

  const handleReset = () => {
    setResult(null)
    setExactScore(null)
    setFormData(initialFormState)
  }

  const loadDashboard = async () => {
    setView('dashboard')
    if (dashboardData) return 
    setDashboardLoading(true)
    setError(null)
    try {
      const response = await axios.get('http://127.0.0.1:5000/dashboard-data')
      if (response.data.status === 'success') {
        setDashboardData(response.data)
      } else {
        setError("Error loading dashboard: " + response.data.error)
      }
    } catch (err) {
      setError("Failed to connect to backend for dashboard.")
    } finally {
      setDashboardLoading(false)
    }
  }

  const getSubtext = (segment) => {
    if (segment === "High") return "You are a Premium-Value Customer 🎯"
    if (segment === "Medium") return "You are a Regular-Value Customer 📈"
    return "You are a Budget-Conscious Customer 🛒"
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({ 
      opacity: 1, 
      x: 0, 
      transition: { delay: 0.1 * i, duration: 0.5 } 
    })
  };

  if (view === 'dashboard') {
    return (
      <div className="section" style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #F8FAFC 100%)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Background shapes */}
        <motion.div animate={{ y: [-20, 20, -20] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="bg-shape shape-1"></motion.div>
        <motion.div animate={{ y: [20, -20, 20] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="bg-shape shape-2"></motion.div>

        <div className="container" style={{ maxWidth: '1000px', zIndex: 1 }}>
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="predict-container premium-card" style={{ width: '100%', maxWidth: '1000px', padding: '40px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <BarChart2 size={48} color="#6366F1" style={{ marginBottom: '16px' }} />
              <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Full Dataset Comparison</h1>
              <p style={{ color: '#6B7280' }}>Statistical Analysis & Customer Clusters</p>
            </div>

            {dashboardLoading ? (
              <div style={{ padding: '60px', textAlign: 'center' }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} style={{ display: 'inline-block' }}>
                  <Loader2 size={48} color="#6366F1" />
                </motion.div>
                <p style={{ marginTop: '20px', color: '#6366F1', fontWeight: 500 }}>Analyzing entire dataset...</p>
              </div>
            ) : dashboardData ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                <div className="feature-card" style={{ width: '100%', height: '400px' }}>
                  <h3 style={{ marginBottom: '20px' }}>Income vs Spending Clusters</h3>
                  <ResponsiveContainer width="100%" height="80%">
                    <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                      <XAxis type="number" dataKey="income" name="Income" unit="k$" />
                      <YAxis type="number" dataKey="spending" name="Spending" unit="" />
                      <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Scatter data={dashboardData.scatter_data.filter(d => d.segment === 'High')} fill="#22C55E" name="High" />
                      <Scatter data={dashboardData.scatter_data.filter(d => d.segment === 'Medium')} fill="#6366F1" name="Medium" />
                      <Scatter data={dashboardData.scatter_data.filter(d => d.segment === 'Low')} fill="#F43F5E" name="Low" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>

                <div className="feature-card" style={{ width: '100%' }}>
                  <h3 style={{ marginBottom: '24px' }}>Feature Correlation Heatmap</h3>
                  <div className="heatmap-grid">
                    <div className="heatmap-cell header-cell"></div>
                    {['Age', 'Income', 'Score', 'Gender'].map(h => <div key={h} className="heatmap-cell header-cell">{h}</div>)}
                    {['Age', 'Income', 'Score', 'Gender'].map((rowLabel, rIdx) => (
                      <React.Fragment key={rowLabel}>
                        <div className="heatmap-cell header-cell row-header">{rowLabel}</div>
                        {[0, 1, 2, 3].map(cIdx => {
                          const cellData = dashboardData.heatmap_data.find(d => d.xIdx === cIdx && d.yIdx === rIdx)
                          const val = cellData ? cellData.value : 0
                          const intensity = Math.abs(val)
                          const rgb = val > 0 ? `99, 102, 241` : `244, 63, 94`
                          return (
                            <motion.div key={cIdx} className="heatmap-cell data-cell" whileHover={{ scale: 1.1, zIndex:1 }} style={{ backgroundColor: `rgba(${rgb}, ${intensity * 0.9 + 0.1})`, color: intensity > 0.4 ? 'white' : '#1F2937' }} title={`Correlation: ${val}`}>
                              {val}
                            </motion.div>
                          )
                        })}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setView('predict')} className="btn btn-outline" style={{ marginTop: '40px', width: '100%', justifyContent: 'center' }}>
              <ArrowLeft size={20} /> Back to Prediction
            </motion.button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="section" style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #F8FAFC 100%)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* Background shapes */}
      <motion.div animate={{ y: [-30, 30, -30], scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="bg-shape shape-1"></motion.div>
      <motion.div animate={{ y: [30, -30, 30], scale: [1, 1.2, 1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="bg-shape shape-2"></motion.div>

      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
        <motion.div layout initial="hidden" animate="visible" variants={containerVariants} className="predict-container premium-card" style={{ width: '100%', maxWidth: '550px', padding: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <Activity size={48} color="#6366F1" style={{ marginBottom: '16px' }} />
            </motion.div>
            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ fontSize: '2.4rem', fontWeight: 700 }}>Customer Predictor</motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ color: '#64748B', fontWeight: 500 }}>Predictive AI for spending classification</motion.p>
          </div>

          <AnimatePresence mode='wait'>
            {!result ? (
              <motion.form 
                key="form" 
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
                  },
                  exit: { opacity: 0, x: 20 }
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.4 }} 
                onSubmit={handleSubmit}
              >

                <motion.div custom={1} variants={inputVariants} className="form-group">
                  <label>Gender</label>
                  <div className="input-with-icon">
                    <User className="icon" size={20} />
                    <motion.select whileFocus={{ scale: 1.01, borderColor: "#6366F1", boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.1)" }} className="form-input" style={{ borderRadius: '10px' }} value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </motion.select>
                  </div>
                  <span className="helper-text">Social identification for demographic grouping.</span>
                </motion.div>

                <motion.div custom={2} variants={inputVariants} className="form-group">
                  <label>Customer Age</label>
                  <div className="input-with-icon">
                    <Calendar className="icon" size={20} style={{ color: error ? '#EF4444' : '#94A3B8' }} />
                    <motion.input 
                      whileFocus={{ scale: 1.01, borderColor: "#6366F1", boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.1)" }} 
                      className="form-input" 
                      style={{ 
                        borderRadius: '10px',
                        borderColor: error ? '#EF4444' : '#E5E7EB',
                        backgroundColor: error ? '#FFF7F7' : '#FFFFFF'
                      }} 
                      type="number" 
                      min="1" 
                      max="100" 
                      required 
                      placeholder="e.g. 28" 
                      value={formData.age} 
                      onChange={(e) => {
                        setFormData({ ...formData, age: e.target.value })
                        if (error) setError(null)
                      }} 
                    />
                  </div>
                  <span className="helper-text">{error ? <span style={{ color: '#EF4444' }}>⚠️ Age must be 18 or greater</span> : 'Enter the literal age (minimum 18).'}</span>
                </motion.div>

                <motion.div custom={3} variants={inputVariants} className="form-group">
                  <label>Annual Income (k$)</label>
                  <div className="input-with-icon">
                    <DollarSign className="icon" size={20} />
                    <motion.input whileFocus={{ scale: 1.01, borderColor: "#6366F1", boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.1)" }} className="form-input" style={{ borderRadius: '10px' }} type="number" min="1" required placeholder="e.g. 85" value={formData.income} onChange={(e) => setFormData({ ...formData, income: e.target.value })} />
                  </div>
                  <span className="helper-text">Estimated yearly income in thousands of dollars.</span>
                </motion.div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    style={{ 
                      color: '#B91C1C', 
                      marginBottom: '20px', 
                      textAlign: 'center', 
                      fontSize: '0.85rem', 
                      padding: '12px', 
                      background: '#FEF2F2', 
                      borderRadius: '12px',
                      border: '1px solid #FCA5A5',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Info size={16} /> {error}
                  </motion.div>
                )}

                <motion.button 
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ 
                    width: '100%', 
                    justifyContent: 'center', 
                    borderRadius: '10px', 
                    background: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
                    height: '56px',
                    fontSize: '1.1rem'
                  }} 
                  disabled={loading}
                >
                  {loading ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Loader2 size={24} /></motion.div>
                      Processing Architecture...
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                       Run AI Cloud Analysis <ChevronRight size={20} />
                    </div>
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div 
                key="result" 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
                className="premium-card result-container-new" 
                style={{ 
                  width: '100%', 
                  background: 'rgba(255, 255, 255, 0.9)', 
                  padding: '40px', 
                  borderRadius: '24px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '24px'
                }}

              >
                {/* Header Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{ textAlign: 'center' }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ marginBottom: '12px', display: 'inline-block' }}
                  >
                    <Sparkles size={32} color="#6366F1" />
                  </motion.div>
                  <h2 style={{ 
                    fontSize: '1.8rem', 
                    fontWeight: 800, 
                    background: 'linear-gradient(135deg, #6366F1, #A5B4FC)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '4px'
                  }}>
                    Prediction Complete
                  </h2>
                  <p style={{ color: '#64748B', fontWeight: 500, fontSize: '0.95rem' }}>
                    AI analysis of your spending profile
                  </p>
                </motion.div>

                {/* Score Circle */}
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
                  style={{ position: 'relative', width: '200px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                  <svg width="200" height="200" viewBox="0 0 200 200">
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366F1" />
                        <stop offset="100%" stopColor="#A5B4FC" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    <circle 
                      cx="100" cy="100" r="85" 
                      fill="none" 
                      stroke="#F1F5F9" 
                      strokeWidth="12" 
                    />
                    <motion.circle 
                      cx="100" cy="100" r="85" 
                      fill="none" 
                      stroke="url(#scoreGradient)" 
                      strokeWidth="12" 
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 85}
                      initial={{ strokeDashoffset: 2 * Math.PI * 85 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 85 * (1 - (exactScore || 0) / 100) }}
                      transition={{ delay: 0.6, duration: 1.5, ease: "easeOut" }}

                      style={{ filter: 'url(#glow)' }}
                    />
                  </svg>
                  <div style={{ position: 'absolute', textAlign: 'center' }}>
                    <motion.span 
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      style={{ 
                        fontSize: '2rem', 
                        fontWeight: 800, 
                        color: '#1F2937',
                        display: 'block'
                      }}
                    >
                      {result?.toUpperCase()}
                    </motion.span>

                    <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>Value Cluster</span>
                  </div>
                </motion.div>

                {/* Score Bar Section */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  style={{ width: '100%', maxWidth: '350px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}>
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                  <div style={{ height: '8px', width: '100%', background: '#F1F5F9', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      height: '100%', 
                      width: '100%', 
                      background: 'linear-gradient(to right, #EF4444, #F59E0B, #22C55E)' 
                    }} />
                    <motion.div 
                      initial={{ left: '0%' }}
                      animate={{ left: `${exactScore || 0}%` }}

                      transition={{ delay: 1, duration: 1.2, ease: "easeInOut" }}
                      style={{ 
                        position: 'absolute', 
                        top: '-2px', 
                        height: '12px', 
                        width: '4px', 
                        background: '#1F2937', 
                        borderRadius: '2px',
                        boxShadow: '0 0 4px rgba(0,0,0,0.2)',
                        zIndex: 2
                      }}
                    />
                  </div>
                  <div style={{ textAlign: 'center', marginTop: '12px' }}>
                    <p style={{ fontSize: '0.9rem', color: '#4B5563', fontWeight: 500 }}>
                      Exact Score: <span style={{ fontWeight: 700, color: '#6366F1' }}>{exactScore} / 100</span>
                    </p>
                  </div>
                </motion.div>

                {/* User Details Mini Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  style={{ 
                    width: '100%', 
                    background: '#F9FAFB', 
                    padding: '20px', 
                    borderRadius: '16px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '12px'
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#94A3B8', marginBottom: '4px' }}><User size={16} /></div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500 }}>Gender</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1F2937' }}>{formData.gender}</div>
                  </div>
                  <div style={{ textAlign: 'center', borderLeft: '1px solid #E5E7EB', borderRight: '1px solid #E5E7EB' }}>
                    <div style={{ color: '#94A3B8', marginBottom: '4px' }}><Calendar size={16} /></div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500 }}>Age</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1F2937' }}>{formData.age} yrs</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#94A3B8', marginBottom: '4px' }}><DollarSign size={16} /></div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500 }}>Income</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1F2937' }}>${formData.income}k</div>
                  </div>
                </motion.div>

                {/* Buttons Section */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}
                >
                  <motion.button 
                    whileHover={{ scale: 1.02, backgroundColor: '#6366F1', color: '#FFFFFF' }} 
                    whileTap={{ scale: 0.98 }} 
                    onClick={handleReset} 
                    className="btn btn-outline" 
                    style={{ width: '100%', justifyContent: 'center', borderRadius: '12px', height: '52px', borderColor: '#6366F1', color: '#6366F1' }}
                  >
                    <RefreshCw size={20} /> Run New Prediction
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    onClick={loadDashboard}
                    style={{ 
                      background: 'transparent', 
                      border: 'none', 
                      color: '#4B5563', 
                      fontWeight: 600, 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '8px',
                      fontSize: '0.95rem',
                      position: 'relative'
                    }}
                    className="dashboard-link"
                  >
                    <BarChart2 size={18} /> View Analytics Dashboard
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default Predict
