import React from 'react';
import { Link } from 'react-router-dom';
import { Network, Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="footer">
      <motion.div 
        className="container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="footer-grid">
          <div className="footer-info">
            <Link to="/" className="footer-logo logo" style={{ marginBottom: '20px' }}>
              <Network size={32} />
              <span style={{ color: 'white' }}>KNN Classifier</span>
            </Link>
            <p className="footer-desc">
              Leveraging the power of K-Nearest Neighbors to deliver 
              smart customer segmentation for modern mall management.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>ML Services</h4>
            <ul>
              <li><Link to="/predict">Prediction Tool</Link></li>
              <li><Link to="/about">KNN Data</Link></li>
              <li><Link to="/#features">Features</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Support</h4>
            <ul>
              <li><Link to="/contact">Help Center</Link></li>
              <li><Link to="/contact">API Docs</Link></li>
              <li><Link to="/contact">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} KNN Customer Classifier. All rights reserved.</p>
          <div className="social-icons">
            {[ Facebook, Twitter, Instagram, Linkedin, Github ].map((Icon, i) => (
              <motion.a 
                key={i} 
                href="#"
                whileHover={{ scale: 1.2, color: "white" }}
                whileTap={{ scale: 0.9 }}
                style={{ color: '#6B7280', transition: 'color 0.2s ease' }}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
