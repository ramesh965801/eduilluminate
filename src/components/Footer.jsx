import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-brand">
          <h2>Eduilluminate</h2>
          <p>
            Explore, Learn, and Grow with our insightful articles across science, arts, and technology.
          </p>
        </div>

        {/* Links Section */}
        <div className="footer-links">
          <div className="link-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#team">Our Team</a></li>
              <li><a href="#careers">Careers</a></li>
            </ul>
          </div>
          <div className="link-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#guides">Guides</a></li>
              <li><a href="#support">Support</a></li>
            </ul>
          </div>
          <div className="link-section">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:info@eduilluminate.com">info@eduilluminate.com</a></li>
              <li><a href="tel:+1234567890">+1 234 567 890</a></li>
              <li><a href="#location">Our Location</a></li>
              <li><a href="#privacy">Bhubaneswar , Odisha</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="footer-newsletter">
          <h4>Subscribe to our Newsletter</h4>
          <p>Get latest updates and articles delivered directly to your inbox.</p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Eduilluminate. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;