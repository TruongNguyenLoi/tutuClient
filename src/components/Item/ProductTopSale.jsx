import React from "react";
import { Link } from "react-router-dom";
import { currency } from "../../utils/FormatCurrency";
function ProductTopSale(props) {
    const { products } = props;

    return (
        <>
            {products.map((item) => {
                const price = currency(item.price);
                return (
                    <div className="col l-2 m-2 c-6" key={item.slug}>
                        <Link to={`/san-pham/${item.product_id}/${item.slug}`} className="home-product-item-link">
                            <div className="home-product-item">
                                <div
                                    className="home-product-item__img"
                                    style={{
                                        backgroundImage: `url(${item.mainImage})`,
                                    }}
                                />
                                <h4 className="home-product-item__name">{item.name}</h4>
                                <div className="home-product-item-price">
                                    <span className="home-product-item-price-new">{price}</span>
                                    <span className="home-product-item-seller">Đã bán {item.seller_count}</span>
                                </div>
                                <div className="home-product-item__info">
                                    <span className="home-product-item__brand">
                                        {item?.brandName}
                                    </span>
                                    <span className="home-product-item__brand-name">
                                        {item?.brandMadeIn}
                                    </span>
                                </div>
                                <div className="home-product-item__favourite">
                                    <i className="fas fa-check" />
                                    <span>Yêu thích</span>
                                </div>
                                <div className="home-product-item__sales">
                                    <span className="home-product-item__sales-percent">{item.percent_discount}%</span>
                                    <span className="home-product-item__sales-label">GIẢM</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </>
    );
}
export default ProductTopSale;
