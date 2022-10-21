import React, { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/productItem.css";
import ApplicationContext from "./ApplicationContext";

function Product({ product, empty }) {
  const context = useContext(ApplicationContext);
  const { setLoading } = context;
  if (!empty) {
    const { data } = product;
    return (
      <div className="products">
        {data.map((item, index) => (
          <div className="product-item" key={index}>
            <Link
              to={`/product-item/${item.id}`}
              state={{ from: "/", data: item }}
              className="display-items"
            >
              <div className="product-desc">
                <img
                  src="http://via.placeholder.com/150"
                  alt="product"
                  className="product-img"
                />
                <span className="cate">{item.product_category}</span>
                <span className="price">&#8358;{item.price}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  } else {
    setLoading(false);
    return (
      <div className="empty-product">
        <h2>Products list is empty</h2>
      </div>
    );
  }
}

export default Product;
