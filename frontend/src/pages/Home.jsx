import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const Home = () => {
  const steps = [
    { title: "Input Customer Data", desc: "Fill in the simple form with basic customer demographics like age, gender, and income.", number: 1 },
    { title: "KNN Match Engine", desc: "Our algorithm compares the input against historical mall customer datasets to find similar patterns.", number: 2 },
    { title: "Get Prediction Result", desc: "Receive an instant classification of the customer's spending score and segment.", number: 3 }
  ];

  return (
    <div className="home-page">
      <Hero />
      <Features />

      {/* How it Works Section */}
      <section className="section" style={{ background: '#F0F4FF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>How It Works</h2>
            <p style={{ color: '#6B7280', maxWidth: '600px', margin: '0 auto' }}>
              Predicting customer behavior is simple when you follow our optimized 
              machine learning workflow.
            </p>
          </div>

          <div className="steps-container">
            {steps.map((step, i) => (
              <motion.div 
                key={i} 
                className="step-item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h3 style={{ marginBottom: '10px' }}>{step.title}</h3>
                  <p style={{ color: '#6B7280' }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              padding: '60px',
              borderRadius: '32px',
              background: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
              color: 'white'
            }}
          >
            <h2 style={{ fontSize: '3rem', marginBottom: '24px' }}>Ready to Classify?</h2>
            <p style={{ fontSize: '1.25rem', marginBottom: '40px', opacity: 0.9, maxWidth: '700px', margin: '0 auto 40px' }}>
              Start using our powerful machine learning tool to get instant results 
              on your mall customer data.
            </p>
            <a href="/predict" className="btn" style={{ background: 'white', color: '#6366F1' }}>
              Get Started Now
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
