import React from 'react';
import { motion } from 'framer-motion';
import { Network, Database, Brain, Rocket } from 'lucide-react';

const About = () => {
  const benefits = [
    { title: "Smart Decision Making", desc: "Automate your customer segmentation and analysis for better target marketing.", icon: <Brain size={24} /> },
    { title: "Real-time Processing", desc: "Our engine delivers predictions as you type, for a seamless classification experience.", icon: <Rocket size={24} /> },
    { title: "Scalable Data Model", desc: "Built with the Mall Customers dataset, allowing for wide demographic classification.", icon: <Database size={24} /> }
  ];

  return (
    <div className="about-page">
      <section className="section" style={{ paddingBottom: '20px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ fontSize: '3rem', marginBottom: '20px' }}
          >
            About KNN Customer Classifier
          </motion.h1>
          <p style={{ color: '#6B7280', maxWidth: '800px', margin: '0 auto 40px', fontSize: '1.1rem' }}>
            We've combined modern web technology with advanced machine learning 
            to help businesses understand their customer demographics better.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="about-card"
            >
              <h2 style={{ marginBottom: '20px', fontSize: '1.8rem', color: '#6366F1' }}>Our Mission</h2>
              <p style={{ color: '#4B5563', lineHeight: '1.8' }}>
                The core of this project is built around the K-Nearest Neighbors (KNN) 
                algorithm — a versatile machine learning model. Our mission is to make 
                these complex data insights accessible through a clean, intuitive, 
                and modern user interface.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="about-card"
            >
              <h2 style={{ marginBottom: '20px', fontSize: '1.8rem', color: '#6366F1' }}>The KNN Engine</h2>
              <p style={{ color: '#4B5563', lineHeight: '1.8' }}>
                K-Nearest Neighbors is a classification algorithm that identifies 
                patterns by looking at the most similar data points in its training 
                history. In our application, we use it to group customers into 
                High, Medium, and Low spending segments based on their age and income.
              </p>
            </motion.div>
          </div>

          <div className="benefits-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginTop: '60px' }}>
            {benefits.map((b, i) => (
              <motion.div 
                key={i} 
                className="benefit-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div style={{ width: '50px', height: '50px', background: 'rgba(99, 102, 241, 0.1)', color: '#6366F1', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  {b.icon}
                </div>
                <h3 style={{ marginBottom: '10px' }}>{b.title}</h3>
                <p style={{ color: '#6B7280' }}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
