import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: 'Chăm sóc da mặt',
    img: 'https://res.cloudinary.com/dk4pzxlqt/image/upload/v1669606267/products/22/izzbzqwhy3nvm7zoel4r.jpg',
    url: ''
  },
  {
    title: 'Chăm sóc tóc',
    img: 'https://res.cloudinary.com/dk4pzxlqt/image/upload/v1669605288/products/18/desc/gm4narjlrxpw22itbpmi.jpg',
    url: ''
  },
  {
    title: 'Chăm sóc cơ thể',
    img: 'https://res.cloudinary.com/dk4pzxlqt/image/upload/v1669605286/products/18/uuxborlvfaxp7zuwld4m.jpg',
    url: ''
  },
  {
    title: 'Trang điểm',
    img: 'https://res.cloudinary.com/dk4pzxlqt/image/upload/v1669607425/products/33/desc/yylxpfdclbfnzs0iknss.jpg ',
    url: ''
  },
  {
    title: 'Nước hoa',
    img: 'https://res.cloudinary.com/dk4pzxlqt/image/upload/v1668510587/products/bdmlhqfn0fhbs1urelau.jpg',
    url: ''
  },
  {
    title: 'Dụng cụ làm đẹp',
    img: 'https://res.cloudinary.com/dk4pzxlqt/image/upload/v1669609504/products/54/i8rdjwwhug6k1gs3bqzv.jpg',
    url: ''
  },
]

export default function Category() {
  return (
    <>
      <div className="row sm-gutter section__item">
        <div className="col l-12 m-12 c-12">
          <h3 className="home-product-title">Danh mục nổi bật</h3>
        </div>
        <div className="row sm-gutter section__content">
          <div className="col l-12 m-12 c-12">
            <div className="featured__body">
              {
                categories.map((item, index) => {
                  return (
                    <Link to={item.url} className="featured__body-item" key={index}>
                      <img className="featured__img" src={item.img} alt="" />
                      <span>{item.title}</span>
                    </Link>
                  )
                })
              }
            </div>
          </div>
          {/* <div className="col l-3 m-6 c-12">
            <Link to="/" className="home-product-category">
              <img
                src="https://salt.tikicdn.com/cache/w295/ts/banner/a8/39/18/5d93d0296f0cfc27a13c640997309b14.png.jpg"
                alt=""
              />
              <h4 className="home-product-category-name">Sách</h4>
            </Link>
          </div>
          <div className="col l-3 m-6 c-12">
            <Link to="/" className="home-product-category">
              <img
                src="https://salt.tikicdn.com/cache/w295/ts/banner/a8/39/18/5d93d0296f0cfc27a13c640997309b14.png.jpg"
                alt=""
              />
              <h4 className="home-product-category-name">Laptop</h4>
            </Link>
          </div>
          <div className="col l-3 m-6 c-12">
            <Link to="/" className="home-product-category">
              <img
                src="https://salt.tikicdn.com/cache/w295/ts/banner/a8/39/18/5d93d0296f0cfc27a13c640997309b14.png.jpg"
                alt=""
              />
              <h4 className="home-product-category-name">Điện thoại</h4>
            </Link>
          </div>
          <div className="col l-3 m-6 c-12">
            <Link to="/" className="home-product-category">
              <img
                src="https://salt.tikicdn.com/cache/w295/ts/banner/a8/39/18/5d93d0296f0cfc27a13c640997309b14.png.jpg"
                alt=""
              />
              <h4 className="home-product-category-name">Máy tính bảng</h4>
            </Link>
          </div> */}
        </div>
      </div>
    </>
  );
}
