import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productData from "./productData";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./PreBooking.css";

const PreBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productData.find(item => item.id === parseInt(id));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: 1,
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Pre-Booking Successful for ${formData.name}!`);
    navigate(-1); // Go back to product page
  };

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Product Not Found</h2>;
  }

  return (
    <div className="prebooking-page">
      <Navbar />

      <div className="prebooking-wrapper">
       <button className="back-btn" onClick={() => navigate(-1)}>
  <span className="arrow"></span>← Back
</button>

        <div className="prebooking-card">
          <h1>Pre-Booking for {product.title}</h1>
          <p>Please fill the details below to reserve your product.</p>

          <form className="prebooking-form" onSubmit={handleSubmit}>
            <label>
              Full Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Phone
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Quantity
              <input
                type="number"
                name="quantity"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Address
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit" className="submit-btn">
              Submit Pre-Booking
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PreBooking;