import React, { useCallback, useEffect, useState } from 'react'
import Slide from 'components/Slide/Slide'
import Promotion from 'components/Promotion/Promotion'
import Category from 'components/CategoryHighlights/Category'
import * as services from 'actions/services/ProductServices'
import useTimeout from 'hooks/useTimeout'
import ProductItem from 'components/Item/ProductItem'
import ProductItemSkeleton from 'components/Item/ProductItemSkeleton'
import ProductTopSale from 'components/Item/ProductTopSale'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from 'actions/services/UserActions'
import { getListRecommendForUser } from 'actions/services/RecommendServices'

function HomePage(props) {
    const [products, setProducts] = useState([]);
    const [topSale, setTopSale] = useState([]);
    const [mostPopularProduct, setMostPopularProduct] = useState([]);
    const [recommendList, setRecommendList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const getUser = useCallback(() => {
        dispatch(getCurrentUser())
    }, [dispatch])



    const handleChangePage = (page) => {
        setPage(page + 1)
    }

    const getNewData = useCallback(() => {
        let searchObject = {
            page: page,
            limit: 24,
            keyword: ''
        }
        services.getProductList(searchObject)
            .then((res) => {
                setProducts([...products, ...res.data.content]);
                setLoading(false);
            })
            .catch(err => console.log(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    const getTopSaleProduct = () => {
        services.topSaleProduct()
            .then(res => {
                setTopSale(res.data.content);
            })
            .catch(err => console.log(err))
    }

    const getPopularProduct = useCallback(() => {
        services.getListProductMostPopular()
            .then(res => setMostPopularProduct(res.data))
            .catch(() => setMostPopularProduct([]))
    }, [])

    useEffect(() => {
        document.title = "Mua hàng online giá tốt, hàng chuẩn, ship nhanh"
        getNewData();
        getTopSaleProduct();
        getPopularProduct();
    }, [getNewData, getPopularProduct])

    useEffect(() => {
        getUser();
    }, [getUser])

    useEffect(() => {
        if (user) {
            getListRecommendForUser()
                .then((res) => {
                    setRecommendList(res)
                })
                .catch(() => setRecommendList([]))
        }
    }, [user])

    useTimeout(() => setLoading(false), loading ? 1000 : null);

    return (
        <>
            <div className="navigation">
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-12 m-12 c-12">
                            <div className="content" style={{ backgroundColor:'#D6E9AA' }}>
                                <div className="nav">
                                    <div className="slider-bar">
                                        <span className="products">
                                            <Link to="/SC" className="SC">
                                                <div className="product">CHĂM SÓC DA</div>
                                            </Link>
                                            <Link to="/HC" className="HC">
                                                <div className="product">CHĂM SÓC TÓC</div>
                                            </Link>
                                            <Link to="/BC" className="BC">
                                                <div className="product">CHĂM SÓC CƠ THỂ</div>
                                            </Link>
                                            <Link to="/MU" className="MU">
                                                <div className="product">TRANG ĐIỂM</div>
                                            </Link>
                                            <Link to="/PF" className="PF">
                                                <div className="product">NƯỚC HOA</div>
                                            </Link>
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
            {/* <Promotion /> */}

            {/* <div className="row sm-gutter section__content">
                <div className="col l-12 m-12 c-12">
                    <div className="home-product">
                        <div className="row sm-gutter section__item">
                            <div className="col l-12 m-12 c-12">
                                <div className="home-product-category-item">
                                    <h3 className="home-product-title">
                                        Xu Hướng Mua Sắm
                                    </h3>
                                </div>
                            </div>
                            <div className="col l-12 m-12 c-12">
                                <div className="trend-list">
                                    <a href="/" className="trends__item-container">
                                        <div className="trends__box">
                                            <div className="title">Điện thoại Smartphone</div>
                                            <div className="sub-title">Giảm đến 25%</div>
                                            <div className="trends__img-box">
                                                <picture className="trends__img-container">
                                                    <img src="https://salt.tikicdn.com/cache/w100/ts/product/48/22/7c/0ddf107a81ccf15f9e2d27ba67e25d6b.jpg.webp" alt="" className="trends__img" />
                                                </picture>
                                                <picture className="trends__img-container">
                                                    <img src="https://salt.tikicdn.com/cache/w100/ts/product/ac/e0/57/6f377a45a456cda76c40bbd79b64a0a3.png.webp" alt="" className="trends__img" />
                                                </picture>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="/" className="trends__item-container">
                                        <div className="trends__box">
                                            <div className="title">Laptop</div>
                                            <div className="sub-title">Giảm đến 29%</div>
                                            <div className="trends__img-box">
                                                <picture className="trends__img-container">
                                                    <img src="https://firebasestorage.googleapis.com/v0/b/datn-ecommerce.appspot.com/o/images%2Fproduct%2F1633964583279_hpprobook-1.jpg?alt=media&token=2e863728-f0af-420e-92d7-c198ebe810ab" alt="" className="trends__img" />
                                                </picture>
                                                <picture className="trends__img-container">
                                                    <img src="https://firebasestorage.googleapis.com/v0/b/datn-ecommerce.appspot.com/o/images%2Fproduct%2F1633964870944_hp-gaming-1.png?alt=media&token=faa23b81-07db-440f-8988-aa6f4c8207f6" alt="" className="trends__img" />
                                                </picture>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="/" className="trends__item-container">
                                        <div className="trends__box">
                                            <div className="title">Smart TV</div>
                                            <div className="sub-title">Giảm đến 15%</div>
                                            <div className="trends__img-box">
                                                <picture className="trends__img-container">
                                                    <img src="https://salt.tikicdn.com/cache/200x200/media/catalog/producttmp/01/de/fd/0c4c0ba101d2e003f9d150827a50b85a.jpg.webp" alt="" className="trends__img" />
                                                </picture>
                                                <picture className="trends__img-container">
                                                    <img src="https://salt.tikicdn.com/cache/200x200/ts/product/3d/e0/b3/6ad732324e4f786bd19d234cb232fbfa.jpg.webp" alt="" className="trends__img" />
                                                </picture>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="/" className="trends__item-container">
                                        <div className="trends__box">
                                            <div className="title">Thiết bị phụ kiện</div>
                                            <div className="sub-title">Giảm đến 20%</div>
                                            <div className="trends__img-box">
                                                <picture className="trends__img-container">
                                                    <img src="https://salt.tikicdn.com/cache/200x200/ts/product/58/84/f4/abc897dcc4dfc6a69f3c216cf9358c20.png.webp" alt="" className="trends__img" />
                                                </picture>
                                                <picture className="trends__img-container">
                                                    <img src="https://salt.tikicdn.com/cache/200x200/ts/product/87/5e/c4/e648b0853ff786c20ab61c9b7137921e.jpg.webp" alt="" className="trends__img" />
                                                </picture>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <Category />
            <div className="row sm-gutter section__content">
                <div className="col l-12 m-12 c-12">
                    <div className="home-product">
                        <div className="row sm-gutter section__item" style={{ backgroundColor:'#DAF1DE' }}>
                            <div className="col l-12 m-12 c-12">
                                <div className="home-product-category-item">
                                    <h3 className="home-product-title">
                                        Sản phẩm bán chạy nhất
                                    </h3>
                                </div>
                            </div>
                            {
                                loading ? <ProductItemSkeleton total={products.length} /> : <ProductItem products={topSale} />
                            }
                        </div>
                    </div>
                </div>
                <div className="col l-12 m-12 c-12">
                    <div className="home-product">
                        <div className="row sm-gutter section__item" style={{ backgroundColor:'#DAF1DE' }}>
                            <div className="col l-12 m-12 c-12">
                                <div className="home-product-category-item">
                                    <h3 className="home-product-title">
                                        Sản phẩm phổ biến nhất
                                    </h3>
                                </div>
                            </div>
                            {
                                loading ? <ProductItemSkeleton total={mostPopularProduct.length} /> : <ProductItem products={mostPopularProduct} />
                            }
                        </div>
                    </div>
                </div>
                <div className="col l-12 m-12 c-12">
                    <div className="home-product">
                        <div className="row sm-gutter section__item" style={{ backgroundColor:'#DAF1DE' }}>
                            <div className="col l-12 m-12 c-12">
                                <div className="home-product-category-item">
                                    <h3 className="home-product-title">
                                        Sản phẩm mới nhất
                                    </h3>
                                </div>
                            </div>
                            {
                                loading ? <ProductItemSkeleton total={products.length} /> : <ProductItem products={products} />
                            }
                            
                            <div className="col l-12 m-12 c-12">
                                <div className="section-center">
                                    {
                                        page <= 3 ? <button className="home-product-viewmore" onClick={() => handleChangePage(page)}>
                                            Xem thêm
                                        </button> : ""
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    user?.username ? (
                        <div className="col l-12 m-12 c-12">
                            <div className="home-product">
                                <div className="row sm-gutter section__item">
                                    <div className="col l-12 m-12 c-12">
                                        <div className="home-product-category-item">
                                            <h3 className="home-product-title">
                                                Sản phẩm dành cho bạn
                                            </h3>
                                        </div>
                                    </div>
                                    {
                                        loading ? <ProductItemSkeleton total={products.length} /> : <ProductItem products={recommendList} />
                                    }
                                </div>
                            </div>
                        </div>
                    ) : ''
                }
            </div>
        </>
    )
}
export default HomePage;