import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const API = "http://localhost:5000/api/admin";
  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    fetch(`${API}/products`)
      .then(res => res.json())
      .then(data => {
        const foundProduct = data.find(
          (item) => item.id === parseInt(id)
        );
        setProduct(foundProduct);
      })
      .catch(err => console.error(err));
  }, [id]);

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
          <img
            src={`${BASE_URL}/uploads/${product.image}`}
            alt={product.title}
          />

          <div className="details-content">
            <h1>{product.title}</h1>

         <div className="price-rating">
  <span className="price">Yet to be Released</span>
</div>
            <p>{product.description}</p>

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