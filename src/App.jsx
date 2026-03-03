import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Services from "./components/Services";
import ProductDetails from "./components/ProductDetails";
import Testimonialpage from "./pages/Testimonialpage";
import Contact from "./pages/Contactpage";
import ProductsPage from "./pages/ProductsPage";
import Aboutus from "./pages/Aboutus";
import PreBooking from "./components/PreBooking";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/testimonial" element={<Testimonialpage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/prebooking/:id" element={<PreBooking />} />

        <Route path="/admin123" element={<AdminDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;