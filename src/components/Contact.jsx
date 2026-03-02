import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact-section">

      {/* MAP BACKGROUND */}
      <div className="map-wrapper">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14968.375318007103!2d85.824272!3d20.296383!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d5170aa5%3A0xfc580e2b68b33fa8!2sBhubaneswar%2C%20Odisha%2C%20India!5e0!3m2!1sen!2sus!4v1772379283073!5m2!1sen!2sus"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Bhubaneswar Map"
        ></iframe>
      </div>

      {/* CONTACT CARD */}
      <div className="contact-card">

        <div className="contact-top">

          <div className="contact-left">
            <h4>Email</h4>
            <p>
              <a href="mailto:mishra.arjon2010@gmail.com">
                mishra.arjon2010@gmail.com
              </a>
            </p>

            <h4>Contact Info</h4>
            <p>
              <a href="tel:+919691898096">
                +91-9691898096
              </a> - Eduilluminate
            </p>
          </div>

          <div className="contact-right">
            <h4>Address</h4>
            <p>Bhubaneswar, Odisha, India</p>

            <h4>Working Hours</h4>
            <p>Mon - Fri : 08:00 AM - 07:00 PM</p>
          </div>

        </div>

        <form className="contact-form">

          <div className="form-row">
            <input type="text" placeholder="Your Name" required />
            <input type="tel" placeholder="Phone Number" required />
          </div>

          <input type="email" placeholder="Email Address" required />

          <textarea placeholder="Your Message" rows="4" required></textarea>

          <button type="submit">Send Message</button>

        </form>

      </div>

    </section>
  );
};

export default Contact;