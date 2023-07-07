import { getAllPromotion } from "actions/services/PromotionServices";
import React, { useEffect, useState } from "react";

export default function Promotion() {

  const [items, setItems] = useState([]);

  const getData = () => {
    getAllPromotion()
      .then(res => setItems(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getData();
  }, [])
  return (
    <>
      <div className="row sm-gutter section__content ">
        <div className="col l-12 m-12 c-12">
          <div className="same-promotion-list">
            <div className="view-more-promo">
              <h3 className="home-product-title">Ưu đãi của bạn</h3>
            </div>
            <div className="never-show-promo">
            </div>

            {
              items.map((item) => {
                return (
                  <div className="same-promotion-item" key={item.id}>
                    <div className="title">{item.title}</div>
                    <div className="content">
                      {item.content}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  );
}
