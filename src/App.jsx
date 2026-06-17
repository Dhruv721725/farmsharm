import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Farmers from "./pages/Farmers";
import Labourers from "./pages/Labourers";
import RegisterFarmer from './pages/RegisterFarmer';
import RegisterLabourer from './pages/RegisterLabourer'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/farmers" element={<Farmers />} />
      <Route path="/labourers" element={<Labourers />} />
      <Route path="/register-labourer" element={<RegisterLabourer />} />
      <Route path="/register-farmer" element={<RegisterFarmer />} />
      <Route path="/register-farmer/:id" element={<RegisterFarmer />} />
      <Route path="/register-labourer/:id" element={<RegisterLabourer />} />
    </Routes>
  )
}

export default App;
