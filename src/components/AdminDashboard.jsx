import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPreBookings, setTotalPreBookings] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const [products, setProducts] = useState([]);
  const [preBookings, setPreBookings] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [orders, setOrders] = useState([]);

  const [activeSection, setActiveSection] = useState("");
  const [success, setSuccess] = useState(false);

  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: null
  });

  const [preview, setPreview] = useState(null);

  const API = "http://localhost:5000/api/admin";
  const BASE_URL = "http://localhost:5000";

  // ================= LOAD DASHBOARD DATA =================
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Fetch products
      const productRes = await fetch(`${API}/products`);
      const productData = await productRes.json();
      setProducts(productData);
      setTotalProducts(productData.length);

      // Fetch prebookings
      const preRes = await fetch("http://localhost:5000/api/prebooking");
      const preData = await preRes.json();
      setPreBookings(preData);
      setTotalPreBookings(preData.length);

      // Calculate Revenue
      let revenue = 0;
      preData.forEach(item => {
        if (item.price && item.quantity) {
          revenue += Number(item.price) * Number(item.quantity);
        }
      });
      setTotalRevenue(revenue);

    } catch (error) {
      console.log("Dashboard Load Error:", error);
    }
  };

  // ================= FETCH FUNCTIONS =================
  const fetchProducts = async () => {
    const res = await fetch(`${API}/products`);
    const data = await res.json();
    setProducts(data);
    setTotalProducts(data.length);
    setActiveSection("products");
  };

  const fetchPreBookings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/prebooking");
      const data = await res.json();
      setPreBookings(data);
      setTotalPreBookings(data.length);

      // Recalculate revenue
      let revenue = 0;
      data.forEach(item => {
        if (item.price && item.quantity) {
          revenue += Number(item.price) * Number(item.quantity);
        }
      });
      setTotalRevenue(revenue);

      setActiveSection("prebookings");
    } catch (error) {
      console.log("Error fetching prebookings:", error);
    }
  };

  const fetchOrders = async () => {
    const res = await fetch(`${API}/orders`);
    const data = await res.json();
    setOrders(data);
    setActiveSection("orders");
  };

  const showAddProduct = () => {
    setActiveSection("addProduct");
  };

  // ================= ADD PRODUCT =================
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setNewProduct({ ...newProduct, image: file });
      if (file) setPreview(URL.createObjectURL(file));
    } else {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    }
  };

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

    if (response.ok) {
      setSuccess(true);
      setNewProduct({ title: "", price: "", description: "", image: null });
      setPreview(null);
      loadDashboardData();
      setTimeout(() => setSuccess(false), 1500);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure?")) return;

    await fetch(`${API}/delete-${type}/${id}`, {
      method: "DELETE"
    });

    loadDashboardData();

    if (type === "product") fetchProducts();
    if (type === "prebooking") fetchPreBookings();
    if (type === "order") fetchOrders();
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      {/* ================= DASHBOARD CARDS ================= */}
      <div className="dashboard-cards">

        <div className="dashboard-card" onClick={fetchProducts}>
          <h3>Total Products</h3>
          <h2>{totalProducts}</h2>
        </div>

        <div className="dashboard-card" onClick={fetchPreBookings}>
          <h3>Total Pre-Bookings</h3>
          <h2>{totalPreBookings}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Revenue</h3>
          <h2>₹ {totalRevenue}</h2>
        </div>

        <div className="dashboard-card" onClick={showAddProduct}>
          <h3>Add Product</h3>
          <h2>+</h2>
        </div>

      </div>

      {/* ================= PRODUCTS TABLE ================= */}
      {activeSection === "products" && (
        <div className="details-section">
          <h2>Product Details</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <img
                      src={`${BASE_URL}/uploads/${item.image}`}
                      alt=""
                      width="60"
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>₹ {item.price}</td>
                  <td>{item.description}</td>
                  <td>
                    <button onClick={() => handleDelete(item.id, "product")}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= PREBOOKINGS TABLE ================= */}
      {activeSection === "prebookings" && (
        <div className="details-section">
          <h2>Pre-Booking Details</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Quantity</th>
                <th>Address</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {preBookings.length > 0 ? (
                preBookings.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.product_name}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.quantity}</td>
                    <td>{item.address}</td>
                    <td>
                      {item.created_at
                        ? new Date(item.created_at).toLocaleString()
                        : "-"}
                    </td>
                    <td>
                      <button onClick={() => handleDelete(item.id, "prebooking")}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No Pre-Bookings Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= ADD PRODUCT FORM ================= */}
      {activeSection === "addProduct" && (
        <div className="product-form-section">
          <h2>Add New Product</h2>

          {success && <div>✅ Product Added Successfully!</div>}

          <form onSubmit={handleAddProduct}>
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
              placeholder="Description"
              value={newProduct.description}
              onChange={handleChange}
              required
            />

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />

            {preview && <img src={preview} alt="Preview" width="100" />}

            <button type="submit">Add Product</button>
          </form>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;