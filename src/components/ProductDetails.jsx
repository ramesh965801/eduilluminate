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

  // ⭐ Generate Stars
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar && "☆"}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

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

            {/* PRICE + RATING */}
            <div className="price-rating">
              <span className="price">${product.price}</span>
              <span className="rating">
                {renderStars(product.rating)}
                <span className="rating-number">
                  ({product.rating})
                </span>
              </span>
            </div>

            <p>{product.details}</p>

            <button className="action-btn">
              Buy / Book Now
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;