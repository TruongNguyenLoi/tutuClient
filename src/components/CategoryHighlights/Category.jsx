import React from "react";
import { Link } from "react-router-dom";

const categories = [
  
  {
    title: 'CHĂM SÓC DA MẶT',
    img: 'https://res.cloudinary.com/dk4pzxlqt/image/upload/v1669606267/products/22/izzbzqwhy3nvm7zoel4r.jpg',
    url: 'SC'
  },
  {
    title: 'CHĂM SÓC TÓC',
    img: 'https://res.cloudinary.com/dk4pzxlqt/image/upload/v1669605288/products/18/desc/gm4narjlrxpw22itbpmi.jpg',
    url: 'HC'
  },
  {
    title: 'CHĂM SÓC CƠ THỂ',
    img: 'https://res.cloudinary.com/dk4pzxlqt/image/upload/v1669605286/products/18/uuxborlvfaxp7zuwld4m.jpg',
    url: 'BC'
  },
  {
    title: 'TRANG ĐIỂM',
    img: 'https://res.cloudinary.com/dk4pzxlqt/image/upload/v1669607425/products/33/desc/yylxpfdclbfnzs0iknss.jpg ',
    url: 'MU'
  },
  {
    title: 'NƯỚC HOA',
    img: 'https://res.cloudinary.com/dk4pzxlqt/image/upload/v1668510587/products/bdmlhqfn0fhbs1urelau.jpg',
    url: 'Pf'
  },
  {
    title: 'DỤNG CỤ LÀM ĐẸP',
    img: 'https://res.cloudinary.com/dk4pzxlqt/image/upload/v1669609504/products/54/i8rdjwwhug6k1gs3bqzv.jpg',
    url: 'BI'
  },
]

export default function Category() {
  return (
    <>
  <br></br>
            <div className="col l-12 m-12 c-12 "  style={{ backgroundColor: '#FFFFFF' }}>
                <br></br>
                <h1 className="home-product-title" style={{ textAlign: 'center' }}> DANH MỤC NỔI BẬT</h1>
                <br></br>
              </div>
            <div className="row sm-gutter section__item" style={{backgroundColor:"#F1E1A6"}}>
            
              <div className="col l-12 m-12 c-12">
              <div className="row sm-gutter section__content " style={{justifyContent: 'center'}} >
              
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
              </div>
            </div>

    </>
  );
}
