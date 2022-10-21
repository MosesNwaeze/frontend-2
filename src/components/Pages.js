import React from "react";
import { Route, Routes } from "react-router-dom";
import Index from "../pages/Index";
import EditOrders from "../pages/EditOrder";
import Item from "../pages/Item";

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="edit-account" element={<EditOrders />} />
      <Route path="product-item/:product_id" element={<Item />} />
    </Routes>
  );
}

export default Pages;
