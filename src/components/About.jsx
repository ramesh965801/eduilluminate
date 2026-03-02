import React from "react";
import "./About.css"; // Import CSS
import aboutImage from "../assets/images/product1.jpg"; // Your image file
import aboutImage2 from "../assets/images/product2.jpg"; // Your image file
const About = () => {
  return (
    <section className="about-section">
      
      {/* LEFT CONTENT OVERLAY */}
      <div className="about-card">
        <img className="about-image" src={aboutImage} alt="About Us Left" />
        <div className="about-content left">
          <h2>About Us</h2>
          <div className="underline"></div>
          <p>
            Welcome to Eduilluminate, where curiosity meets knowledge. Our mission
            is to offer insightful, well-researched articles that broaden your
            understanding on a multitude of topics. From science to arts, we cover
            an extensive range of subjects to fuel your learning journey.
          </p>
        </div>
      </div>

      {/* RIGHT CONTENT OVERLAY */}
      <div className="about-card">
        <img className="about-image" src={aboutImage2} alt="About Us Right" />
        <div className="about-content right">
          <h2>Our Vision</h2>
          <div className="underline"></div>
          <p>
            At Eduilluminate, we aim to empower learners globally. By providing
            engaging and well-researched content, we inspire curiosity and
            facilitate growth across a wide range of subjects, making learning
            accessible, meaningful, and enjoyable for everyone.
          </p>
        </div>
      </div>

    </section>
  );
};

export default About;