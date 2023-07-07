import React from "react";

export default function Title(props) {
  const { type, totalProducts } = props;
  let title = "";
  if (type === "sach") {
    title = "Sách";
  } else if (type === "laptop") {
    title = "Laptop";
  } else if (type === "dien-thoai") {
    title = "Điện thoại";
  } else if (type === "may-tinh-bang") {
    title = "Máy tính bảng";
  } else if (type === "tivi") {
    title = "Tivi";
  } else if (type === "may-anh") {
    title = "Máy ảnh - Máy quay";
  } else if (type === "may-giat") {
    title = "Máy giặt";
  } else if (type === "thiet-bi-phu-kien") {
    title = "Thiết bị - Phụ kiện";
  }

  return (
    <>
      <div className="col l-12 m-12 c-12">
        <div className="home-product-category-item">
          <h3 className="home-product-title">
            {title}:
            <span className="home-product-subtitle">
              {totalProducts} kết quả
            </span>
          </h3>
        </div>
      </div>
    </>
  );
}
