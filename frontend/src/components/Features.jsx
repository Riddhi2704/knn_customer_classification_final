import React from 'react';
import { Zap, BarChart3, Users, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const features = [
    {
      icon: <Zap size={32} />,
      title: "Fast Prediction",
      desc: "Get real-time customer segmentation results in milliseconds with our optimized KNN algorithm."
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Data Insights",
      desc: "Understand spending patterns and customer behaviors through detailed ML-driven analysis."
    },
    {
      icon: <Users size={32} />,
      title: "Smart Segmentation",
      desc: "Automatically categorize your customer base into actionable segments for targeted marketing."
    }
  ];

  return (
    <section className="section">
      <div className="container">
        <motion.div 
          style={{ textAlign: 'center', marginBottom: '60px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Powerful ML Features</h2>
          <p style={{ color: '#6B7280', maxWidth: '600px', margin: '0 auto' }}>
            Built with modern technology to provide you with the most accurate 
            customer classification results for your mall data.
          </p>
        </motion.div>

        <motion.div 
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((f, i) => (
            <motion.div 
              key={i} 
              className="feature-card"
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
            >
              <motion.div 
                className="feature-icon"
                whileHover={{ rotate: 15, scale: 1.1 }}
              >
                {f.icon}
              </motion.div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
