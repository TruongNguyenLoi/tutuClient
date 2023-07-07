import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Filter from 'components/Filter/Filter';
import Title from 'components/Filter/Title';
import Product from 'components/Item/Product';
import Pagination from 'components/Pagination/Pagination';
import { getProductListByCategoryAndSubcategory, getProductList } from 'actions/services/ProductServices'
import useTimeout from 'hooks/useTimeout';
import ProductSkeleton from 'components/Item/ProductSkeleton';

function ListProductPage(props) {
    const { match } = props;
    const [products, setProducts] = useState([]);
    const [totalElements, setTotalElements] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = new URLSearchParams(window.location.search)
    const page = params.get('page');
    const sortBy = params.get('sort_by') ? params.get('sort_by') : '';
    const sortValue = params.get('sort_value') ? params.get('sort_value') : '';
    const keyword = params.get('keyword') ? params.get('keyword') : '';
    const price = params.get('price') ? params.get('price') : '';
    const brand = params.get('brand') ? params.get('brand') : '';
    useEffect(() => {
        document.title = "Danh sách sản phẩm giá cực tốt"
        let searchObject = {};
        searchObject.keyword = keyword ? keyword : '';
        searchObject.page = page ? parseInt(page) : 1;
        const category = match.params.category ? match.params.category : '';
        const subcategory = match.params.subcategory ? match.params.subcategory : '';
        searchObject.category = category;
        searchObject.subcategory = subcategory;
        searchObject.sortBy = sortBy ? sortBy : '';
        searchObject.sortValue = sortValue ? sortValue : '';
        searchObject.brand = brand ? brand : '';
        searchObject.price = price ? price : '';
        if (category !== '' && category) {
            getProductListByCategoryAndSubcategory(searchObject)
                .then((res) => {
                    setProducts(res.data.content);
                    setTotalElements(res.data.totalElements)
                })
                .catch(err => console.log(err))
        } else {
            getProductList(searchObject)
                .then((res) => {
                    setProducts(res.data.content);
                    setTotalElements(res.data.totalElements)
                })
                .catch(err => console.log(err))
        }
    }, [page, match, brand, keyword, sortBy, sortValue, price])


    useTimeout(() => setLoading(false), loading ? 1000 : null);

    return (
        <>
            <div className="row sm-gutter section__content">
                <Filter category={match.params.category} history={props.history} />
                <div className="col l-9-4 m-12 c-12">
                    <div className="home-product">
                        <div className="row sm-gutter section__item">
                            {
                                // products?.length > 0 ? (
                                    <>
                                        <Title type={match.params.category} totalProducts={totalElements} />
                                        {
                                            loading ? <ProductSkeleton total={totalElements} /> : <Product products={products} />
                                        }
                                    </>
                                // ) : <p>Không tìm thấy sản phẩm cần  tìm</p>
                            }
                        </div>

                    </div>
                    <Pagination totalRows={totalElements} page={page ? page : 1} limit={20} />
                </div>
            </div>
        </>
    )
}

export default ListProductPage;