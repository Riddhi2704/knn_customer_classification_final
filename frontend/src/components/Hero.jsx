import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, Target, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-badge"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles size={16} /> Powered by AI
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            Customer Classification <br /> Using KNN
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          >
            Optimize your business logic with machine learning. Our K-Nearest Neighbors 
            prediction engine analyzes customer data to deliver precise segmentation 
            and spending insights instantly.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6, type: "spring", bounce: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/predict" className="btn btn-primary">
                Start Prediction <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Icons for illustration */}
        <div className="hero-visual" style={{ position: 'relative', width: '400px', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: 'absolute', top: 0, left: '20%', background: 'white', padding: '20px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
          >
            <Zap size={40} color="#6366F1" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            style={{ position: 'absolute', bottom: '10%', right: '10%', background: 'white', padding: '20px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
          >
            <BarChart2 size={40} color="#6366F1" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: '250px', height: '250px', background: 'linear-gradient(135deg, #6366F1 0%, #A5B4FC 100%)', borderRadius: '50%', filter: 'blur(30px)', opacity: 0.2 }}
          />
        </div>
      </div>
      <div className="hero-image"></div>
    </section>
  );
};

export default Hero;
