import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Services from "./components/Services";
import ProductDetails from "./components/ProductDetails";
import Testimonialpage from "./pages/Testimonialpage";
import Contact from "./pages/Contactpage";
import ProductsPage from "./pages/ProductsPage";
import Aboutus from "./pages/Aboutus";

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

      </Routes>
    </Router>
  );
}

export default App;