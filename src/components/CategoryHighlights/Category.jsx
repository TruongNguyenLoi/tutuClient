import React from "react";
import { Link } from "react-router-dom";

const categories = [
  
  {
    title: 'Chăm sóc da mặt',
    img: 'https://res.cloudinary.com/dk4pzxlqt/image/upload/v1669606267/products/22/izzbzqwhy3nvm7zoel4r.jpg',
    url: 'SC'
  },
  {
    title: 'Chăm sóc tóc',
    img: 'https://res.cloudinary.com/dk4pzxlqt/image/upload/v1669605288/products/18/desc/gm4narjlrxpw22itbpmi.jpg',
    url: 'HC'
  },
  {
    title: 'Chăm sóc cơ thể',
    img: 'https://res.cloudinary.com/dk4pzxlqt/image/upload/v1669605286/products/18/uuxborlvfaxp7zuwld4m.jpg',
    url: 'BC'
  },
  {
    title: 'Trang điểm',
    img: 'https://res.cloudinary.com/dk4pzxlqt/image/upload/v1669607425/products/33/desc/yylxpfdclbfnzs0iknss.jpg ',
    url: 'MU'
  },
  {
    title: 'Nước hoa',
    img: 'https://res.cloudinary.com/dk4pzxlqt/image/upload/v1668510587/products/bdmlhqfn0fhbs1urelau.jpg',
    url: 'Pf'
  },
  {
    title: 'Dụng cụ làm đẹp',
    img: 'https://res.cloudinary.com/dk4pzxlqt/image/upload/v1669609504/products/54/i8rdjwwhug6k1gs3bqzv.jpg',
    url: 'BI'
  },

]

export default function Category() {
  return (
    <>
      <div className="row sm-gutter section__item"  style={{ backgroundColor: '#DAF1DE' }}>
        <div className="col l-12 m-12 c-12">
          <h3 className="home-product-title">Danh mục nổi bật</h3>
        </div>
        <div className="row sm-gutter section__content" style={{ display: 'flex', justifyContent: 'space-between' ,alignItems: 'center' }}>
          <div className="col l-12 m-12 c-12">
            <div className="featured__body" style={{ display: 'flex', justifyContent: 'space-between' ,alignItems: 'center' }}>
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
        </div>
      </div>
    </>
  );
}
