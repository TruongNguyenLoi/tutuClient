import React from "react";
import { useEffect } from "react";

export default function Title(props) {
  let title = " ";
  const { totalProducts } = props;

  return (
    <>
      <div className="col l-12 m-12 c-12">
        <div className="home-product-category-item">
          <h3 className="home-product-title">
            {title}:
            <span className="home-product-subtitle">
              {totalProducts} KẾT QUẢ
            </span>
          </h3>
        </div>
      </div>
    </>
  );
}
