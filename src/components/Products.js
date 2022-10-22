import React, { useEffect, useContext } from "react";
import Product from "./Product";
import ApplicationContext from "./ApplicationContext";

function Products() {
  const [state, dispatch] = useContext(ApplicationContext);
  const { products } = state;

  useEffect(() => {}, [products]);
  if (products.length > 0) {
    return (
      <div className="all-products">
        {products.map((item, index) => (
          <Product product={item} key={index} />
        ))}
      </div>
    );
  } else {
    dispatch(() => ({ type: "LOADING", payload: true }));
    return (
      <div className="empty-product">
        <h2>Products list is empty</h2>
      </div>
    );
  }
}

export default Products;
