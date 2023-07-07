import React, { useCallback, useEffect, useState } from 'react'
import AccountNavbar from 'components/AccountNavbar/AccountNavbar.';
import Loading from 'components/Loading/Loading'
import useTimeout from 'hooks/useTimeout';
import { deleteProductLiked, getListProductLiked } from 'actions/services/ProductServices'
import { Link } from 'react-router-dom';
import { currency } from 'utils/FormatCurrency';
import { getUserLogin } from 'actions/services/UserActions';
export default function CustomerWishlist(props) {

    const token = localStorage.getItem("token");
    const [listProductLiked, setListProductLiked] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        id: '',
        fullName: '',
        username: '',
    })

    const getData = useCallback(() => {
        getListProductLiked()
            .then((res) => setListProductLiked(res))
            .catch(() => alert('ERROR'))
    }, [])
    const getUser = () => {
        getUserLogin()
            .then(res => {
                setUser(res.data);
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {

        document.title = "Sản phẩm yêu thích | Tiki"
        getUser();
        getData();
    }, [getData])

    const dislikeProduct = (productId) => {
        if (token) {
            deleteProductLiked(productId)
                .then(() => getData())
                .catch(() => alert("ERR"))
        } else {
            props.history.push('/login');
        }
    }

    useTimeout(() => setLoading(false), loading ? 1000 : null);
    return (
        <>
            {
                loading ? <Loading /> : (
                    <div className="row sm-gutter section__content">
                        <div className="customer-wishlist">
                            <div className="row sm-gutter section__item">
                                <div className="col l-2-4 m-3 c-3">
                                    <AccountNavbar name={user?.fullName} />
                                </div>
                                <div className="col l-9-4 m-9 c-9">
                                    <h4 className="heading">Danh sách yêu thích ({listProductLiked.length}) </h4>
                                    <ul className="list">
                                        {
                                            listProductLiked.map((item) => {
                                                return (
                                                    <li className="item" key={item.id}>
                                                        <button className="btn-delete" onClick={() => dislikeProduct(item.productId)}>×</button>
                                                        <div className="thumbnail">
                                                            <Link to={`/san-pham/${item.productId}/${item.slug}`}>
                                                                <div className="thumbnail-img">
                                                                    <img className="image" alt="" src={item.mainImage} />
                                                                </div>
                                                            </Link>
                                                        </div>
                                                        <div className="body">
                                                            <Link className="name" to={`/san-pham/${item.productId}/${item.slug}`}>{item.name}</Link>
                                                            <Link className="name" to={`/${item.category?.code}`}>{item.category?.name}</Link>
                                                            <Link className="name" to={`/${item.category?.code}/${item.subcategory?.code}`}>{item.subcategory?.name}</Link>
                                                        </div>
                                                        <div className="item-footer">
                                                            <div className="price">{currency(item.price)}</div>
                                                            <div className="wrap">
                                                                <div className="list-price">{currency(item.list_price)}</div>
                                                                <div className="discount">{item.percent_discount}%</div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}
