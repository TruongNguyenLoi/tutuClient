import React from 'react'
import './Header2.css'

export default function Header2() {
    return (
        <header className="header2">
            <div className="hfMLFx header-container">
                <div className="logo">
                    <a href="/">
                        <i className="icon" />
                    </a>
                </div>
                <div className="progress">
                    <div className="hSHEnI">
                        <div className="text">Đăng nhập</div>
                        <div className="bar">
                            <div className="fill-color" />
                        </div>
                        <div className="circle">1</div>
                    </div>
                    <div className="hSHEnI">
                        <div className="text">Địa chỉ giao hàng</div>
                        <div className="bar">
                            <div className="fill-color" /></div>
                        <div className="circle">2</div>
                    </div>
                    <div className="hSHEnI">
                        <div className="text">Thanh toán &amp; Đặt mua</div>
                        <div className="bar">
                            <div className="fill-color" />
                        </div>
                        <div className="circle">3</div>
                    </div>
                </div>
                <div className="hotline">
                    <img src="https://frontend.tikicdn.com/_desktop-next/static/img/hotline.png" alt="" />
                </div>
            </div>
        </header>
    )
}
