import React, { useCallback, useEffect, useState } from "react";
import Slide from "components/Slide/Slide";
import Promotion from "components/Promotion/Promotion";
import Category from "components/CategoryHighlights/Category";
import * as services from "actions/services/ProductServices";
import useTimeout from "hooks/useTimeout";
import ProductItem from "components/Item/ProductItem";
import ProductItemSkeleton from "components/Item/ProductItemSkeleton";
import ProductTopSale from "components/Item/ProductTopSale";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "actions/services/UserActions";
import { getListRecommendForUser } from "actions/services/RecommendServices";

function HomePage(props) {
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState([]);
  const [topSale, setTopSale] = useState([]);
  const [mostPopularProduct, setMostPopularProduct] = useState([]);
  const [recommendList, setRecommendList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const getUser = useCallback(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const handleChangePage = (page) => {
    setPage(page + 1);
  };

  const getNewData = useCallback(() => {
    let searchObject = {
      page: page,
      limit: 24,
      keyword: "",
    };
    services
      .getProductList(searchObject)
      .then((res) => {
        setProducts([...products, ...res.data.content]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const getTopSaleProduct = () => {
    services
      .topSaleProduct()
      .then((res) => {
        setTopSale(res.data.content);
      })
      .catch((err) => console.log(err));
  };

  const getPopularProduct = useCallback(() => {
    services
      .getListProductMostPopular()
      .then((res) => setMostPopularProduct(res.data))
      .catch(() => setMostPopularProduct([]));
  }, []);

  useEffect(() => {
    document.title = "Mua hàng online giá tốt, hàng chuẩn, ship nhanh";
    getNewData();
    getTopSaleProduct();
    getPopularProduct();
  }, [getNewData, getPopularProduct]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    if (user) {
      getListRecommendForUser()
        .then((res) => {
          setRecommendList(...recommendList, ...res.data.content);
        })
        .catch(() => setRecommendList([]));
    }
  }, [user]);

  useTimeout(() => setLoading(false), loading ? 1000 : null);

  return (
    <>
      <div
        className="app__container"
        style={{ margin: "var(--header-height)", backgroundColor: "#FFFFFF" }}
      ></div>
      <div className="grid wide">
        <div className="navigation">
          <div className="grid wide">
            <div className="row">
              <div className="col l-2 m-2 c-2">
                <div className="content" style={{ backgroundColor: "FFFFFF" }}>
                  <div className="nav">
                    <div className="slider-bar">
                      <span className="products">
                        <Link to="/SC" className="SC">
                          <div className="product">CHĂM SÓC DA</div>
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col l-2 m-2 c-2">
                <div className="content" style={{ backgroundColor: "FFFFFF" }}>
                  <div className="nav">
                    <div className="slider-bar">
                      <span className="products">
                        <Link to="/HC" className="HC">
                          <div className="product">CHĂM SÓC TÓC</div>
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col l-2 m-2 c-2">
                <div className="content" style={{ backgroundColor: "FFFFFF" }}>
                  <div className="nav">
                    <div className="slider-bar">
                      <span className="products">
                        <Link to="/BC" className="BC">
                          <div className="product">CHĂM SÓC CƠ THỂ</div>
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col l-2 m-2 c-2">
                <div className="content" style={{ backgroundColor: "FFFFFF" }}>
                  <div className="nav">
                    <div className="slider-bar">
                      <span className="products">
                        <Link to="/MU" className="MU">
                          <div className="product">TRANG ĐIỂM</div>
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col l-2 m-2 c-2">
                <div className="content" style={{ backgroundColor: "FFFFFF" }}>
                  <div className="nav">
                    <div className="slider-bar">
                      <span className="products">
                        <Link to="/PF" className="PF">
                          <div className="product">NƯỚC HOA</div>
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col l-2 m-2 c-2">
                <div className="content" style={{ backgroundColor: "FFFFFF" }}>
                  <div className="nav">
                    <div className="slider-bar">
                      <span className="products">
                        <Link to="/BI" className="BI">
                          <div className="product">DỤNG CỤ LÀM ĐẸP</div>
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Slide />

        <Category />

        <div
          className="col l-12 m-12 c-12 "
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <br></br>
          <br></br>
          <h1 className="home-product-title" style={{ textAlign: "center" }}>
            {" "}
            SẢN PHẨM BÁN CHẠY
          </h1>
          <br></br>
        </div>
        <div
          className="row sm-gutter section__content"
          style={{ backgroundColor: "#DAF1DE" }}
        >
          <div className="col l-12 m-12 c-12">
            <div className="home-product">
              <div
                className="row sm-gutter section__item"
                style={{ backgroundColor: "#DAF1DE" }}
              >
                {loading ? (
                  <ProductItemSkeleton total={products.length} />
                ) : (
                  <ProductItem products={topSale} />
                )}
              </div>
            </div>
          </div>

          <div
            className="col l-12 m-12 c-12 "
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <br></br>
            <br></br>
            <h1 className="home-product-title" style={{ textAlign: "center" }}>
              {" "}
              SẢN PHẨM PHỔ BIẾN
            </h1>
            <br></br>
          </div>

          <div className="col l-12 m-12 c-12">
            <div className="home-product">
              <div
                className="row sm-gutter section__item"
                style={{ backgroundColor: "#DAF1DE" }}
              >
                {loading ? (
                  <ProductItemSkeleton total={mostPopularProduct.length} />
                ) : (
                  <ProductItem products={mostPopularProduct} />
                )}
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <div
            className="col l-12 m-12 c-12 "
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <br></br>
            <br></br>
            <h1 className="home-product-title" style={{ textAlign: "center" }}>
              {" "}
              SẢN PHẨM MỚI NHẤT
            </h1>
            <br></br>
          </div>
          <div className="col l-12 m-12 c-12">
            <div className="home-product">
              <div
                className="row sm-gutter section__item"
                style={{ backgroundColor: "#DAF1DE" }}
              >
                {loading ? (
                  <ProductItemSkeleton total={products.length} />
                ) : (
                  <ProductItem products={products} />
                )}

                <div className="col l-12 m-12 c-12">
                  <div className="section-center">
                    {page <= 3 ? (
                      <button
                        className="home-product-viewmore"
                        onClick={() => handleChangePage(page)}
                      >
                        Xem thêm
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col l-12 m-12 c-12 "
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <br></br>
            <br></br>
            <h1 className="home-product-title" style={{ textAlign: "center" }}>
              {" "}
              SẢN PHẨM DÀNH CHO BẠN
            </h1>
            <br></br>
          </div>
          {token ? (
            <div className="col l-12 m-12 c-12">
              <div className="home-product">
                <div className="row sm-gutter section__item">
                  {loading ? (
                    <ProductItemSkeleton total={recommendList.length} />
                  ) : (
                    <ProductItem products={recommendList} />
                  )}
                  <div className="col l-12 m-12 c-12">
                    <div className="section-center">
                      {page <= 3 ? (
                        <button
                          className="home-product-viewmore"
                          onClick={() => handleChangePage(page)}
                        >
                          Xem thêm
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
export default HomePage;
