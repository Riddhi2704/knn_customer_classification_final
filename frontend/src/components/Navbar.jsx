import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Network, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" className="logo" onClick={closeMenu}>
            <Network size={32} />
            <span>KNN Classifier</span>
          </Link>
        </motion.div>

        {/* Desktop Links */}
        <div className="nav-links">
          {['Home', 'About', 'Contact Us'].map((link, i) => (
            <motion.div
              key={link}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <NavLink 
                to={link === 'Home' ? '/' : link === 'About' ? '/about' : '/contact'} 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                end={link === 'Home'}
              >
                {link}
              </NavLink>
            </motion.div>
          ))}
        </div>

        {/* Mobile Toggle */}
        <motion.div 
          className="menu-toggle" 
          onClick={toggleMenu}
          whileTap={{ rotate: 90, scale: 0.8 }}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.div>
      </div>

      {/* Mobile Menu Slide from Right */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                background: 'rgba(0,0,0,0.1)',
                backdropFilter: 'blur(2px)',
                zIndex: 998
              }}
            />
            {/* Menu */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="mobile-menu"
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: '280px',
                height: '100vh',
                background: 'white',
                padding: '100px 30px',
                boxShadow: '-10px 0 30px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
                zIndex: 999
              }}
            >
              <NavLink to="/" className="nav-link" onClick={closeMenu}>Home</NavLink>
              <NavLink to="/about" className="nav-link" onClick={closeMenu}>About</NavLink>
              <NavLink to="/contact" className="nav-link" onClick={closeMenu}>Contact Us</NavLink>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
