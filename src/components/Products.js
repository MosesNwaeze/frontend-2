import React, { useState } from "react";
import Product from "./Product";

function Products({ products }) {
  if (products.length > 0) {
    return (
      <div className="all-products">
        {products.map((item, index) => (
          <Product product={item} key={index} />
        ))}
      </div>
    );
  } else {
    return <Product empty={true} />;
  }
}

export default Products;
