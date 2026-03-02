import React from "react";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import productData from "./productData";

const Products = () => {
  const navigate = useNavigate();
  const product = productData[0]; // Only one product

  return (
    <section className="products">
      <h2 className="section-title">Our Product</h2>

      {/* Keep grid layout */}
      <div className="product-grid single-product">
        <div
          className="product-card slide-up"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>{product.details}</p>
        </div>
      </div>

      {/* Buy Now button BELOW card */}
      <div className="buy-wrapper">
        <button
          className="more-products-btn"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          Buy Now
        </button>
      </div>
    </section>
  );
};

export default Products;