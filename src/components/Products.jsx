import React, { useEffect, useState } from "react";
import "./Products.css";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const API = "http://localhost:5000/api/admin";
  const BASE_URL = "http://localhost:5000";

  // Fetch all products
  useEffect(() => {
    fetch(`${API}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!products || products.length === 0) return <p>No products available.</p>;

  return (
    <section className="products">
      <h2 className="section-title">Our Products</h2>

     

      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card slide-up"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img
              src={`${BASE_URL}/uploads/${product.image}`}
              alt={product.title}
            />
            <h3>{product.title}</h3>
            <p>{product.description || "No description available"}</p>
            <div className="buy-wrapper">
              <button
                className="more-products-btn"
                onClick={(e) => {
                  e.stopPropagation(); // prevent card click
                  navigate(`/product/${product.id}`);
                }}
              >
                Pre Booking Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;