import React, { useEffect, useState } from "react";
import "./Products.css";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const API = "http://localhost:5000/api/admin";
  const BASE_URL = "http://localhost:5000";

  // Fetch latest product
  useEffect(() => {
    fetch(`${API}/products`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          // Show latest added product
          const latestProduct = data[data.length - 1];
          setProduct(latestProduct);
        }
      })
      .catch(err => console.error(err));
  }, []);

  if (!product) return null;

  return (
    <section className="products">
      <h2 className="section-title">Our Product</h2>

      {/* Keep grid layout */}
      <div className="product-grid single-product">
        <div
          className="product-card slide-up"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <img
            src={`${BASE_URL}/uploads/${product.image}`}
            alt={product.title}
          />
          <h3>{product.title}</h3>
          <p>{product.description}</p>
        </div>
      </div>

      {/* Buy Now button BELOW card */}
      <div className="buy-wrapper">
        <button
          className="more-products-btn"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          Pre Booking Now
        </button>
      </div>
    </section>
  );
};

export default Products;