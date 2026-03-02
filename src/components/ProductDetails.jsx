import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import productData from "./productData";
import "./ProductDetails.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = productData.find(
    (item) => item.id === parseInt(id)
  );

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Product Not Found</h2>;
  }

  return (
    <div className="details-page">
      <Navbar />

      <div className="details-content-wrapper">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="details-card">
          <img src={product.image} alt={product.title} />

          <div className="details-content">
            <h1>{product.title}</h1>

            {/* PRICE */}
            <div className="price-rating">
              <span className="price">Price Yet To Be Released</span>
            </div>

            <p>{product.details}</p>

            <button
              className="action-btn"
              onClick={() => navigate(`/prebooking/${product.id}`)}
            >
              Pre-Booking
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;