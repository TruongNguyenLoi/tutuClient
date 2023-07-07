import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import { currency } from 'utils/FormatCurrency'
import { makePaymentVnpay, makePaymentZaloPay, makePaymentMomo } from 'actions/services/PaymentActions'
import AddressForm from 'components/form/AddressForm';
import { addOrder } from 'actions/services/OrderActions'
import { completeCart, getCartInfo, getDetailCartSelected } from 'actions/services/CartActions';
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { getUserLogin } from 'actions/services/UserActions';
import Loading from 'components/Loading/Loading';
import { getPaymentMethods } from 'actions/services/PaymentServices';
import { calculateShipFeeGHN } from 'actions/services/GHNServices';
import _ from 'lodash'
import useTimeout from 'hooks/useTimeout';
import { calculateShipFeeGHTK } from 'actions/services/GHTKServices';

const shipmethods = [
    {
        type: 1,
        name: 'Giao Hàng Nhanh'
    },
]

const icon_bank = [
    "https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg",
    "https://salt.tikicdn.com/ts/upload/76/80/08/62e0faf2af2869ba93da5f79a9dc4c4b.png",
    "https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-mo-mo.svg",
    "https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-zalo-pay.svg",
]

function PaymentPage(props) {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cartSelected);
    const [user, setUser] = useState({})
    const [type, setType] = useState(1);
    const [openAddress, setOpenAddress] = useState(false);
    const [payMethods, setPayMethods] = useState([])
    const [shipInfo, setShipInfo] = useState({})
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const [shipType, setShipType] = useState(1);

    const getUser = useCallback(() => {
        getUserLogin()
            .then(res => {
                setUser(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    const getCalculateShipFee = useCallback(() => {
        if (!_.isEmpty(user)) {
            if (shipType === 1) {
                calculateShipFeeGHN({
                    from_district_id: 3695,
                    service_id: 53320,
                    service_type_id: null,
                    to_district_id: user?.district_id,
                    to_ward_code: user?.ward_id,
                    weight: cart?.weight,
                    length: cart?.length,
                    width: cart?.width,
                    height: cart?.height
                })
                    .then((res => {
                        setShipInfo(res.data)
                    }))
                    .catch(err => console.log(err))
            } else {
               
            }
        }
    }, [cart?.height, cart?.length, cart?.total_price, cart?.weight, cart?.width, shipType, user])

    useEffect(() => {
        getUser();
    }, [getUser])

    useEffect(() => {
        getCalculateShipFee();
    }, [getCalculateShipFee])

    const handleClickOpenAddress = () => {
        setOpenAddress(true);
    };

    const handleCloseAddress = () => {
        getUser();
        setOpenAddress(false);
    }

    const handleCompleteCart = () => {
        completeCart()
            .then(() => {
                dispatch(getCartInfo())
            })
            .catch(err => console.log(err))
    }

    const getPayMethodsList = () => {
        getPaymentMethods()
            .then((res) => {
                setPayMethods(res.data.content.sort((a, b) => a.id - b.id))
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {

        document.title = "Thông tin thanh toán"

        if (token) {
            dispatch(getDetailCartSelected())
        } else {
            props.history.push('/login');
        }
        getPayMethodsList();
    }, [dispatch, props.history, token])

    const calculateShipFeeIfTotalMorethan3Mil = (total) => {
        let fee = shipInfo?.total_ship_fee;
        return fee;
    }

    const calculateTotalOrder = (total) => {
        let fee = calculateShipFeeIfTotalMorethan3Mil(total);
        return fee + total;
    }

    useTimeout(() => setLoading(false), loading ? 1500 : null);

    const handlePayment = () => {
        if (cart?.cart_details.length === 0) {
            toast.error('Đặt hàng không thành công. Giỏ hàng không có sản phẩm!', {
                position: "bottom-center",
                theme: 'dark',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } else if ((user?.city_id === null && user?.district_id === null) || user?.phone === null) {
            toast.warning('Đặt hàng không thành công. Vui lòng cập nhật thông tin giao hàng !', {
                position: "bottom-center",
                theme: 'dark',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } else {
            let orderInfo = {}
            orderInfo.appuser = user.username;
            orderInfo.amount = calculateTotalOrder(cart?.total_price);
            orderInfo.vnp_OrderInfo = "Thanh toan doan hang";
            orderInfo.vnp_Amount = calculateTotalOrder(cart?.total_price);
            if (type === 3) {
                let now = new Date();
                const create_time = now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();
                const order_details = cart?.cart_details.map(item => {
                    return {
                        product_id: item.product_id,
                        color: item.color,
                        quantity: item.quantity,
                        price: item.price,
                        total_price: item.price * item.quantity
                    }
                })
                const payment = {
                    type: 1,
                    method_code: 'momo',
                    datePayment: create_time,
                    tradingCode: null,
                    status: 0
                }

                const order = {
                    username: user.username,
                    email: user.email,
                    customer_name: user?.fullName,
                    total_price: orderInfo.amount,
                    total_item: cart?.items_count,
                    order_details: order_details,
                    orderInfo: "Thanh toan don hang",
                    address: user ? user?.house : "",
                    province: user ? user?.city : "",
                    district: user ? user?.district : "",
                    ward: user ? user?.ward : "",
                    payment: payment,
                    phone: user?.phone,
                    name: user?.fullName,
                    ward_code: user?.ward_id,
                    district_id: user?.district_id,
                    ship_fee: calculateShipFeeIfTotalMorethan3Mil(cart?.total_price),
                    ship_type: shipType
                }
                addOrder(order)
                    .then((res) => {
                        localStorage.setItem('order_id', res.id);
                        orderInfo.order_id = res.id;
                        makePaymentMomo(orderInfo)
                            .then((res1) => {
                                if (res1.data.errorCode === 0 || res1.data.errorCode === "0") {
                                    window.location.href = res1.data.payUrl;
                                } else {
                                    toast.warning('Có lỗi xảy ra, mời thực hiện lại!');
                                }

                            })
                        handleCompleteCart();
                    })
                    .catch(() => toast.error('Đặt hàng không thành công, mời thực hiện lại!', {
                        position: "bottom-center",
                        theme: 'dark',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }))
            } else if (type === 4) {
                let now = new Date();
                const create_time = now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();
                const order_details = cart?.cart_details.map(item => {
                    return {
                        product_id: item.product_id,
                        color: item.color,
                        quantity: item.quantity,
                        price: item.price,
                        total_price: item.price * item.quantity
                    }
                })
                const payment = {
                    type: 1,
                    method_code: 'zalopay',
                    datePayment: create_time,
                    tradingCode: null,
                    status: 0
                }

                const order = {
                    username: user.username,
                    email: user.email,
                    customer_name: user?.fullName,
                    total_price: orderInfo.amount,
                    total_item: cart?.items_count,
                    order_details: order_details,
                    orderInfo: "Thanh toan don hang",
                    address: user ? user?.house : "",
                    province: user ? user?.city : "",
                    district: user ? user?.district : "",
                    ward: user ? user?.ward : "",
                    payment: payment,
                    phone: user?.phone,
                    name: user?.fullName,
                    ward_code: user?.ward_id,
                    district_id: user?.district_id,
                    ship_fee: calculateShipFeeIfTotalMorethan3Mil(cart?.total_price),
                    ship_type: shipType
                }
                addOrder(order)
                    .then((res) => {
                        localStorage.setItem('order_id', res.id);
                        orderInfo.order_id = res.id;
                        makePaymentZaloPay(res, orderInfo)
                            .then((res1) => {
                                if (res1.data.returncode === 1) {
                                    window.location.href = res1.data.orderurl;
                                } else {
                                    toast.warning('Có lỗi xảy ra, mời thực hiện lại!');
                                }

                            })
                        handleCompleteCart();
                    })
                    .catch(() => toast.error('Đặt hàng không thành công, mời thực hiện lại!', {
                        position: "bottom-center",
                        theme: 'dark',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }))
            } else if (type === 2) {
                let now = new Date();
                const create_time = now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();
                const order_details = cart?.cart_details.map(item => {
                    return {
                        product_id: item.product_id,
                        color: item.color,
                        quantity: item.quantity,
                        price: item.price,
                        total_price: item.price * item.quantity
                    }
                })
                const payment = {
                    type: 1,
                    method_code: 'vnpay',
                    datePayment: create_time,
                    tradingCode: null,
                    status: 0
                }

                const order = {
                    username: user.username,
                    email: user.email,
                    customer_name: user?.fullName,
                    total_price: orderInfo.vnp_Amount,
                    total_item: cart?.items_count,
                    order_details: order_details,
                    orderInfo: orderInfo.vnp_OrderInfo,
                    address: user ? user?.house : "",
                    province: user ? user?.city : "",
                    district: user ? user?.district : "",
                    ward: user ? user?.ward : "",
                    payment: payment,
                    phone: user.phone,
                    name: user.fullName,
                    ward_code: user?.ward_id,
                    district_id: user?.district_id,
                    ship_fee: calculateShipFeeIfTotalMorethan3Mil(cart?.total_price),
                    ship_type: shipType
                    
                }
                addOrder(order)
                    .then((res) => {
                        localStorage.setItem('order_id', res.id);
                        makePaymentVnpay(orderInfo)
                            .then((res) => {
                                window.location.href = res.data.redirect_url;
                            })
                        handleCompleteCart();
                    })
                    .catch(() => toast.error('Đặt hàng không thành công, mời thực hiện lại!', {
                        position: "bottom-center",
                        theme: 'dark',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }))
            } else if (type === 1) {
                let now = new Date();
                const create_time = now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();
                const order_details = cart?.cart_details.map(item => {
                    return {
                        product_id: item.product_id,
                        color: item.color,
                        quantity: item.quantity,
                        price: item.price,
                        total_price: item.price * item.quantity
                    }
                })
                const payment = {
                    bankName: null,
                    method_code: 'cod',
                    datePayment: create_time,
                    tradingCode: null,
                    status: 0
                }
                const order = {
                    username: user.username,
                    email: user.email,
                    customer_name: user?.fullName,
                    total_price: orderInfo.vnp_Amount,
                    total_item: cart?.items_count,
                    order_details: order_details,
                    orderInfo: orderInfo.vnp_OrderInfo,
                    address: user ? user?.house : "",
                    province: user ? user?.city : "",
                    district: user ? user?.district : "",
                    ward: user ? user?.ward : "",
                    ward_code: user?.ward_id,
                    district_id: user?.district_id,
                    payment: payment,
                    phone: user.phone,
                    name: user.fullName,
                    ship_fee: calculateShipFeeIfTotalMorethan3Mil(cart?.total_price),
                    ship_type: shipType
                }
                addOrder(order)
                    .then((res) => {
                        props.history.push(`/success/payment?order_id=${res.id}`)
                        toast.success('Đặt hàng thành công!', {
                            position: "bottom-center",
                            theme: 'dark',
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        handleCompleteCart();
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        }
    }

    return (
        <>
            <div className="row sm-gutter section__content">
                <div className="col l-12 m-12 c-12">
                    <div className="home-product">
                        {
                            (loading) ? <Loading /> : (
                                <div className="bkMhdM">
                                    {
                                        cart?.cart_details && cart?.cart_details.length === 0 ? (
                                            <div className="cwMaQD">
                                                Giỏ hàng không có sản phẩm. Vui lòng thực hiện lại.
                                            </div>
                                        ) : ""
                                    }
                                    <h4 className="productsV2__title">Thanh toán đơn hàng</h4>

                                    <div className="row sm-gutter">
                                        <div className="col l-9 m-12 c-12">
                                            <div className="deellp">
                                                <div className="kRoZux">
                                                    <h3 className="title">1. Thông tin sản phẩm</h3>
                                                    <div className="cDxQbC">
                                                        <div className="iLupwL">
                                                            <div className="productsV2-content">
                                                                <div className="infinite-scroll-component" style={{ height: 'auto', overflow: 'auto' }}>
                                                                    <ul className="fhrjkV">
                                                                        {
                                                                            cart?.cart_details && cart?.cart_details.map((item, index) => {
                                                                                return (
                                                                                    <li className="iMeYki" key={index}>
                                                                                        <div className="row">
                                                                                            <div className="col-1">
                                                                                                <div className="intended__images false">
                                                                                                    <Link className="intended__img" to={`/san-pham/${item.product_id}/${item.slug}`}>
                                                                                                        <img src={`${item.mainImage}`} alt="" />
                                                                                                    </Link>
                                                                                                    <div className="intended__content">
                                                                                                        <Link className="intended__name" to={`/san-pham/${item.product_id}/${item.slug}`}>
                                                                                                            {item.name}
                                                                                                        </Link>
                                                                                                        <span className="intended__not-bookcare">SL: x{item.quantity}</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-2">
                                                                                                <span className="intended__real-prices">{currency(item.price)}</span>
                                                                                            </div>
                                                                                            <div className="col-4">
                                                                                                <span className="intended__final-prices">{currency(item.price * item.quantity)}</span>
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
                                                </div>
                                                <div className="kRoZux">
                                                    <h3 className="title">2. Chọn hình thức giao hàng</h3>
                                                    <div className="dnENUJ">
                                                        <ul className="list">
                                                            {
                                                                shipmethods.map((item, index) => {
                                                                    return (
                                                                        <li className="dWHFNX" key={index}>
                                                                            <label className="HafWE">
                                                                                <input type="radio" readOnly name="ship-methods" onChange={(e) => setShipType(item.type)} value={item.type} defaultChecked={item?.type === type} /><span className="radio-fake" />
                                                                                <span className="label">
                                                                                    <div className="fbjKoD">
                                                                                        <div className="method-content">
                                                                                            <div className="method-content__name"><span>{item.name}</span></div>
                                                                                        </div>
                                                                                    </div>
                                                                                </span>
                                                                            </label>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="kRoZux">
                                                    <h3 className="title">3. Chọn hình thức thanh toán</h3>
                                                    <div className="dnENUJ">
                                                        <ul className="list">
                                                            {
                                                                payMethods.map((item, index) => {
                                                                    return (
                                                                        <li className="dWHFNX" key={index}>
                                                                            <label className="HafWE">
                                                                                <input type="radio" readOnly name="payment-methods" onChange={(e) => setType(item.type)} value={item.type} defaultChecked={item?.type === type} /><span className="radio-fake" />
                                                                                <span className="label">
                                                                                    <div className="fbjKoD">
                                                                                        <img className="method-icon" width="32" src={icon_bank[index]} alt="" />
                                                                                        <div className="method-content">
                                                                                            <div className="method-content__name"><span>{item.name}</span></div>
                                                                                        </div>
                                                                                    </div>
                                                                                </span>
                                                                            </label>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="group-button">
                                                    {
                                                        user ? <Link to="#" onClick={handlePayment} type="button" className="btn btn-add-to-cart">Đặt Mua</Link> :
                                                            <Redirect to="/login" />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col l-3 m-3 c-12">
                                            <div className="gDuXAE">
                                                <div className="title">
                                                    <span>Thông tin giao hàng</span>
                                                    <Link to="#" onClick={handleClickOpenAddress} >Sửa</Link>
                                                </div>
                                                <div className="address">
                                                    <span className="name">
                                                        {user?.fullName} | {user?.phone}
                                                    </span>
                                                    {
                                                        (user?.city && user?.district && user?.ward) ? (
                                                            <span className="street">
                                                                {user ? user?.house + ", " + user?.ward + ", " + user?.district + ", " + user?.city : ''}
                                                            </span>
                                                        ) : <span className="street">
                                                            Vui lòng cập nhật thông tin giao hàng
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                            <div className="gDuXAE">
                                                <div className="title">
                                                    <span>Đơn hàng {cart?.cart_details && cart?.cart_details.length} sản phẩm </span>
                                                    <Link to="/checkout/cart">Sửa</Link>
                                                </div>
                                                <div className="address">
                                                    <div className="product product--show">
                                                        {
                                                            cart?.cart_details && cart?.cart_details.map((item, index) => {
                                                                return (
                                                                    <div className="order_info-list" key={index}>
                                                                        <div className="info">
                                                                            <strong className="qty">{item.quantity} x</strong>
                                                                            <Link to={`/san-pham/${item.product_id}/${item.slug}`} target="_blank" className="product-name">
                                                                                {item.name}
                                                                            </Link>
                                                                        </div>
                                                                        <div className="price">{currency(item.price)}</div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="cart-total">
                                                <div className="cart-total-prices">
                                                    <div className="cart-total-prices__inner">
                                                        <div className="etSUOP">
                                                            <div className="prices">
                                                                <ul className="prices__items">
                                                                    <li className="prices__item">
                                                                        <span className="prices__text">Tạm tính</span>
                                                                        {
                                                                            (user?.city && user?.district && user?.ward && cart?.cart_details && cart?.cart_details.length > 0) ? (
                                                                                <span className="prices__value">{currency(cart?.total_price)}</span>
                                                                            ) : <span className="prices__value">
                                                                                {currency(0)}
                                                                            </span>
                                                                        }

                                                                    </li>
                                                                    <li className="prices__item">
                                                                        <span className="prices__text">Phí vận chuyển</span>
                                                                        {
                                                                            (user?.city && user?.district && user?.ward && cart?.cart_details && cart?.cart_details.length > 0) ? (
                                                                                <span className="prices__value">{currency(calculateShipFeeIfTotalMorethan3Mil(cart?.total_price))}</span>
                                                                            ) : <span className="prices__value">
                                                                                {currency(0)}
                                                                            </span>
                                                                        }
                                                                    </li>
                                                                </ul>
                                                                <p className="prices__total">
                                                                    <span className="prices__text">Tổng cộng</span>
                                                                    {
                                                                        (user?.city && user?.district && user?.ward && cart?.cart_details && cart?.cart_details.length > 0) ? (
                                                                            <span className="prices__value prices__value--final">
                                                                                {currency(calculateTotalOrder(cart?.total_price))}
                                                                                <i>(Đã bao gồm VAT nếu có)</i>
                                                                            </span>
                                                                        ) : <span className="prices__value prices__value--final">
                                                                            {currency(0)}
                                                                            <i>(Đã bao gồm VAT nếu có)</i>
                                                                        </span>
                                                                    }

                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )}
                    </div>
                </div>
            </div>
            {
                openAddress ? <AddressForm open={openAddress} onClose={handleCloseAddress} /> : ''
            }
        </>
    )
}
export default PaymentPage;