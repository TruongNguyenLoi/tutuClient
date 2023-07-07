import React, { useCallback } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Product from 'components/Item/Product';
import Pagination from 'components/Pagination/Pagination';
import { getAllProductByBrandCode, getBrandByCode } from 'actions/services/ProductServices'
import useTimeout from 'hooks/useTimeout';
import ProductSkeleton from 'components/Item/ProductSkeleton';

function ListProductBrand(props) {
    const { match } = props;
    const [products, setProducts] = useState([]);
    const [totalElements, setTotalElements] = useState([]);
    const [brand, setBrand] = useState({});
    const [loading, setLoading] = useState(true);
    const params = new URLSearchParams(window.location.search)
    const page = params.get('page');

    const getData = useCallback(() => {
        const params = new URLSearchParams(window.location.search)
        const page = params.get('page');
        const sortBy = params.get('sortBy');
        const sortValue = params.get('sortValue');
        const keyword = params.get('keyword');
        let searchObject = {};
        searchObject.keyword = keyword ? keyword : '';
        searchObject.page = page ? parseInt(page) : 0;
        const brandCode = match.params.brand ? match.params.brand : '';
        searchObject.brandCode = brandCode;
        searchObject.sortBy = sortBy ? sortBy : '';
        searchObject.sortValue = sortValue ? sortValue : '';

        getAllProductByBrandCode(searchObject)
            .then((res) => {
                setProducts(res.data.content);
                setTotalElements(res.data.totalElements)
            })
            .catch(err => console.log(err))
    }, [match.params.brand])

    useEffect(() => {
        

        document.title = "Thương hiệu sản phẩm | Tiki"

        getData();

        const brand = match.params.brand ? match.params.brand : '';
        getBrandByCode(brand) 
            .then((res => setBrand(res.data)))
            .catch(() => alert("ERR"))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getData])


    useTimeout(() => setLoading(false), loading ? 1000 : null);

    return (
        <>
            <div className="row sm-gutter section__content">
                <div className="col l-12 m-12 c-12">
                    <div className="home-product">
                        <div className="row sm-gutter section__item">
                            <div className="col l-12 m-12 c-12">
                                <div className="home-product-category-item">
                                    <h3 className="home-product-title">
                                        Thương hiệu sản phẩm:
                                        <span className="home-product-subtitle">
                                            {brand?.name}
                                        </span>
                                    </h3>
                                </div>
                                <div className="home-product-category-item">
                                    <h3 className="home-product-title">
                                        Tất cả sản phẩm:
                                        <span className="home-product-subtitle">
                                            {totalElements} kết quả
                                        </span>
                                    </h3>
                                </div>
                            </div>
                            {
                                loading ? <ProductSkeleton total={totalElements} /> : <Product products={products} />
                            }
                        </div>

                    </div>
                    <Pagination totalRows={totalElements} page={page ? page : 0} limit={20} />
                </div>
            </div>
        </>
    )
}

export default ListProductBrand;