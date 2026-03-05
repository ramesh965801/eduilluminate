import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./ProductDetails.css";

const ProductDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // VITE ENV VARIABLES
  const API = `${import.meta.env.VITE_API_URL}/api/admin`;
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {

      const res = await fetch(`${API}/products`);
      const data = await res.json();

      const foundProduct = data.find(
        (item) => item.id === Number(id)
      );

      setProduct(foundProduct);

    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="details-page">
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "80px" }}>
          Loading product...
        </h2>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="details-page">
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "80px" }}>
          Product Not Found
        </h2>
        <Footer />
      </div>
    );
  }

  return (
    <div className="details-page">

      <Navbar />

      <div className="details-content-wrapper">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="details-card">

          <img
            src={`${BASE_URL}/uploads/${product.image}`}
            alt={product.title}
            onError={(e) => {
              e.target.src = "/placeholder.png";
            }}
          />

          <div className="details-content">

            <h1>{product.title}</h1>

            <p>{product.description}</p>

           {/* <h3 className="price">
  {product.price ? `₹${product.price}` : "Price yet to be released"}
</h3> */}

<h3 className="price">
  Price yet to be released
</h3>

            <button
              className="action-btn"
              onClick={() => navigate(`/prebooking/${product.id}`)}
            >
              Pre Booking Now
            </button>

          </div>

        </div>

      </div>

      <Footer />

    </div>
  );
};

export default ProductDetails;