import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import productData from "../components/productData";
import { useNavigate } from "react-router-dom";
import "./ProductsPage.css";

const ProductsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="products-page">
      <Navbar />

      <section className="products-landing">
        <h1>Our Complete Product Collection</h1>

        <div className="products-grid">
          {productData.map((product) => (
            <div
              key={product.id}
              className="product-card-full"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img src={product.image} alt={product.title} />
              <div className="product-info">
                <h3>{product.title}</h3>
                <p>{product.details}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;