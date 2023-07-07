import React from "react";
import Skeleton from "react-loading-skeleton";

function DetailProductSkeleton(props) {
  return (
    <div className="row sm-gutter section__content">
      <div className="breadcrumb">
        <Skeleton duration={1} height={40} width={440} />
      </div>
      <div className="col l-10 m-12 c-12">
        <div className="home-product">
          <div className="row sm-gutter section__item">
            <div className="product-info col l-5 m-4 c-12">
              <div className="left">
                <Skeleton duration={1} width={360} height={348} />
                <div className="slider">
                  <Skeleton duration={1} width={360} height={120} />
                </div>
              </div>
            </div>
            <div className="col l-7 m-6 c-12">
              <div className="product-detail">
                <p>
                  <Skeleton duration={1} height={17} />
                </p>
                <h4 className="product-name">
                  <Skeleton duration={1} height={32} />
                </h4>
                <p className="product-price">
                  <Skeleton duration={1} height={40} />
                </p>

                <div id="info-1" className="collapse in">
                  <Skeleton duration={1} height={30} />
                </div>
                <div className="group-button">
                  <Skeleton duration={1} height={48} />
                </div>
              </div>
            </div>
          </div>

          <div className="row sm-gutter section__item">
            <div className="col l-12 m-12 c-12">
              <div className="home-product-category-item">
                <h3 className="home-product-title">Thông tin chi tiết</h3>
              </div>
            </div>
            <div className="col l-12 m-12 c-12">
              <div className="group">
                <div className="content has-table">
                  <table>
                    <tbody>
                      {
                        Array(10)
                          .fill()
                          .map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <Skeleton duration={1} />
                                </td>
                                <td>
                                  <Skeleton duration={1} />
                                </td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="row sm-gutter section__item">
            <div className="col l-12 m-12 c-12">
              <div className="home-product-category-item">
                <h3 className="home-product-title">Mô tả sản phẩm</h3>
              </div>
            </div>
            <div className="col l-12 m-12 c-12">
              <div className="group">
                <div className="content">
                  <Skeleton duration={1} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Skeleton duration={1} style={{ height: '100vh', width: 200 }} />
    </div>
  );
}
export default DetailProductSkeleton;
