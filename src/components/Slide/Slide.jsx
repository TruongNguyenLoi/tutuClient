import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./Slide.css";
import { getAllSlide } from 'actions/services/SlideServices'
function PrevButton({ onClick }) {
  return (
    <button onClick={onClick} className="slick-prev">
      <i className="fas fa-chevron-left"></i>
    </button>
  );
}
function NextButton({ onClick }) {
  return (
    <button onClick={onClick} className="slick-next">
      <i className="fas fa-chevron-right"></i>
    </button>
  );
}
export default function Slide() {

  const [slides, setSlides] = useState([]);

  const getData = () => {
    getAllSlide()
      .then(res => setSlides(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getData();
  }, [])

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevButton />,
    nextArrow: <NextButton />,
  };

  return (
    <>
      <div className="row sm-gutter">
        <div className="col l-12 m-12 c-12">
          <Slider {...settings}>
            {slides.map((slide) => {
              return (
                <section className="features-slide" key={slide.id}>
                  <div className="features-slide-item">
                    <img
                      className="features-slide-img"
                      src={`${slide.image}`}
                      alt=""
                    />
                  </div>
                </section>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
}
