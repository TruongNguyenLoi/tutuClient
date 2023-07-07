import React from 'react'
import { Link } from 'react-router-dom';
export default function OrderStatus({ order_id, order_status }) {
    return (
        <>
            {
                order_status === -1 ? (
                    <div className="failure-info">
                        <div className="failure-info__image">
                            <img src="https://salt.tikicdn.com/ts/upload/5a/f7/f7/4ce925ffff6449700efdc46a98112f88.jpg" alt="img" />
                        </div>
                        <div className="failure-info__content">
                            <h2 className="title">Thanh toán không thành công</h2>
                            <div className="error-block">
                                <span className="error-block__generic"></span>
                                <span className="error-block__spec" />
                            </div>
                            <div className="order-info">
                                <div className="order-info__left">Mã đơn hàng</div>
                                <div className="order-info__right">791284938</div>
                            </div>
                            <div className="order-info">
                                <div className="order-info__left">Phương thức thanh toán</div>
                                <div className="order-info__right">Thanh toán tiền mặt</div>
                            </div>
                            <div className="order-info" style={{ boxShadow: 'none' }}>
                                <div className="order-info__left">Tổng tiền</div>
                                <div className="order-info__right">696.000 ₫</div>
                            </div>
                            <div className="button-block">
                                <button className="left-button">Tiếp tục mua sắm</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="col l-12 m-12 c-12">
                        <div className="order-info">
                            <div className="order-info__left">
                                <img src="https://salt.tikicdn.com/ts/upload/63/fc/e8/50c078ea9bf9a4627176d3574db7a446.jpg" height={178} width={195} alt="" />
                            </div>
                            <div className="order-info__content">
                                <h3 className="thanks-msg">Cảm ơn bạn đã mua hàng tại Taka!</h3>
                                <p>Mã số đơn hàng của bạn:</p>
                                <div className="order-number">{order_id}</div>
                                <p>Bạn có thể xem lại <Link to="/customer/order/history">đơn hàng của tôi</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}
