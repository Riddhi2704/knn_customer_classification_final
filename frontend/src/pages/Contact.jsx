import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! Your message has been sent successfully.');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="contact-page">
      <section className="section">
        <div className="container" style={{ textAlign: 'center', marginBottom: '80px' }}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: '3rem', marginBottom: '20px' }}
          >
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: '#6B7280', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}
          >
            Have questions about our KNN classifier? We're here to help you get 
            the most out of our AI tool.
          </motion.p>
        </div>

        <motion.div 
          className="container" 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px' }}
        >
          {/* Contact Info */}
          <motion.div 
            style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}
          >
            <motion.div variants={itemVariants}>
              <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Get In Touch</h2>
              <p style={{ color: '#6B7280', lineHeight: '1.8' }}>
                Fill out the form to the right or use our contact details 
                below. We'll get back to you within 24 hours.
              </p>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {[
                { icon: <Mail size={24} />, title: "Email Us", detail: "support@knnclassifier.com" },
                { icon: <Phone size={24} />, title: "Call Us", detail: "+1 (555) 123-4567" },
                { icon: <MapPin size={24} />, title: "Visit Us", detail: "123 AI Boulevard, Tech City, 94103" }
              ].map((info, i) => (
                <motion.div 
                  key={i}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  style={{ display: 'flex', gap: '20px', alignItems: 'center' }}
                >
                  <div style={{ width: '50px', height: '50px', background: 'rgba(99, 102, 241, 0.1)', color: '#6366F1', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {info.icon}
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '5px' }}>{info.title}</h4>
                    <p style={{ color: '#6B7280' }}>{info.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="contact-form"
          >
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <motion.input 
                  whileFocus={{ scale: 1.01, borderColor: "#6366F1" }}
                  type="text" 
                  className="form-input" 
                  placeholder="John Doe" 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <motion.input 
                  whileFocus={{ scale: 1.01, borderColor: "#6366F1" }}
                  type="email" 
                  className="form-input" 
                  placeholder="john@example.com" 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <motion.textarea 
                  whileFocus={{ scale: 1.01, borderColor: "#6366F1" }}
                  className="form-input" 
                  style={{ minHeight: '150px', resize: 'vertical' }} 
                  placeholder="How can we help you?"
                  required
                ></motion.textarea>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Send Message <Send size={20} />
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
