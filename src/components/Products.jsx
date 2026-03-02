import React from "react";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import productData from "./productData";

const Products = () => {
  const navigate = useNavigate();

  return (
    <section className="products">
      <h2 className="section-title">Our Product</h2>

      <div className="product-grid">
        {productData.slice(0, 3).map((product, index) => (
          <div
            key={product.id}
            className={`product-card ${
              index === 0
                ? "slide-left"
                : index === 1
                ? "slide-up"
                : "slide-right"
            }`}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.details}</p>
          </div>
        ))}
      </div>

      {/* ✅ More Products Button */}
      <div className="more-products-wrapper">
        <button
          className="more-products-btn"
          onClick={() => navigate("/products")}
        >
          View More Products
        </button>
      </div>
    </section>
  );
};

export default Products;