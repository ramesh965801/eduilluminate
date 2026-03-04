import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [success, setSuccess] = useState(false);

  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: null
  });

  const [preview, setPreview] = useState(null);

  const API = "http://localhost:5000/api/admin";

  useEffect(() => {
    fetch(`${API}/total-products`)
      .then(res => res.json())
      .then(data => setTotalProducts(data.total));

    fetch(`${API}/total-prebookings`)
      .then(res => res.json())
      .then(data => setTotalUsers(data.total));

    fetch(`${API}/total-revenue`)
      .then(res => res.json())
      .then(data => setTotalRevenue(data.revenue));
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setNewProduct({ ...newProduct, image: file });

      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    }
  };

  // Handle Submit
  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", newProduct.title);
    formData.append("price", newProduct.price);
    formData.append("description", newProduct.description);
    formData.append("image", newProduct.image);

    const response = await fetch(`${API}/add-product`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (response.ok) {
      setSuccess(true);

      setNewProduct({
        title: "",
        price: "",
        description: "",
        image: null
      });

      setPreview(null);

      setTimeout(() => {
        setSuccess(false);
        window.location.reload();
      }, 1500);
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Products</h3>
          <h2>{totalProducts}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Pre-Bookings</h3>
          <h2>{totalUsers}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Revenue</h3>
          <h2>₹ {totalRevenue}</h2>
        </div>
      </div>

      <div className="product-form-section">
        <h2>Add New Product</h2>

        {success && (
          <div className="success-message">
            ✅ Product Added Successfully!
          </div>
        )}

        <form onSubmit={handleAddProduct} className="product-form">
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={newProduct.title}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Product Description"
            value={newProduct.description}
            onChange={handleChange}
            required
          />

          {/* Image Upload */}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />

          {/* Image Preview */}
          {preview && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={preview}
                alt="Preview"
                width="150"
                style={{ borderRadius: "8px" }}
              />
            </div>
          )}

          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;