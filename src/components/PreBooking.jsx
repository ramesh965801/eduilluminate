import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./PreBooking.css";

const PreBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: 1,
    address: "",
  });

  const API = "http://localhost:5000/api/admin";

  // ✅ Fetch product from backend
  useEffect(() => {
    fetch(`${API}/products`)
      .then(res => res.json())
      .then(data => {
        const foundProduct = data.find(
          (item) => item.id === parseInt(id)
        );
        setProduct(foundProduct);
      })
      .catch(err => console.error("Product fetch error:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product) return;

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/prebooking",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product_id: product.id,
            ...formData
          })
        }
      );

      const data = await response.json();

      if (response.ok && (data.success || data.id)) {
        alert(
          `✅ Pre-Booking Successful!\nBooking ID: ${
            data.bookingId || data.id
          }`
        );

        // Clear form after success
        setFormData({
          name: "",
          email: "",
          phone: "",
          quantity: 1,
          address: "",
        });

        navigate(-1);
      } else {
        alert(`❌ ${data.message || "Failed to submit pre-booking"}`);
      }
    } catch (err) {
      console.error("Pre-booking error:", err);
      alert("Something went wrong while saving your pre-booking.");
    }

    setLoading(false);
  };

  if (!product) {
    return (
      <div className="prebooking-page">
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "100px" }}>
          Loading Product...
        </h2>
        <Footer />
      </div>
    );
  }

  return (
    <div className="prebooking-page">
      <Navbar />
      <div className="prebooking-wrapper">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="prebooking-card">
          <h1>Pre-Booking for {product.title}</h1>
          <p>
            Please fill the details below to reserve your product.
          </p>

          <form
            className="prebooking-form"
            onSubmit={handleSubmit}
          >
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

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Pre-Booking"}
            </button>
          </form>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default PreBooking;