import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { API_URL } from "actions/constants/constants";
import Policies from "pages/Policies";

export default function Footer({ fixed }) {
  const footerStyle = {
    // CSS cho footer
    position: fixed ? "fixed" : "static",
    bottom: 0,
  };
  return (
    <>
      <footer className="footer">
        <div className="grid wide">
          <div className="row">
            <div className="col l-2-4 m-4 c-6">
              <h3 className="footer__heading">Chăm sóc khách hàng</h3>
              <ul className="footer-list">
                <li className="footer-item">
                  <Link to="/" className="footer-link">
                    Trung tâm trợ giúp
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/" className="footer-link">
                    Hướng dẫn mua hàng
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/policies" className="footer-link">
                    Chính sách vận chuyển
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col l-2-4 m-4 c-6">
              <h3 className="footer__heading">Về chúng tôi</h3>
              <ul className="footer-list">
                <li className="footer-item">
                  <Link to="/" className="footer-link">
                    Giới thiệu về Shop
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/" className="footer-link">
                    Tuyển dụng
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/" className="footer-link">
                    Điều khoản Shop
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col l-2-4 m-4 c-6">
              <h3 className="footer__heading">TuTu Store</h3>
              <ul className="footer-list">
                <li className="footer-item">
                  <Link to="/" className="footer-link">
                    1 Võ Văn Ngân, TP Thủ Đức, TP.HCM
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/" className="footer-link">
                    18 Lê Lợi, TP Sóc Trăng, tỉnh Sóc Trăng
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/" className="footer-link">
                    Bình Đại, Bến Tre
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col l-2-4 m-4 c-6">
              <h3 className="footer__heading">Theo dõi chúng tôi</h3>
              <ul className="footer-list">
                <li className="footer-item">
                  <Link to="/" className="footer-link">
                    <i className="fab fa-facebook" />
                    Facebook
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/" className="footer-link">
                    <i className="fab fa-instagram" />
                    Instagram
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/" className="footer-link">
                    <i className="fab fa-twitter" />
                    Twitter
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col l-2-4 m-8 c-12">
              <h3 className="footer__heading">Vào cửa hàng trên ứng dụng</h3>
              <div
                className="footer__download"
                style={{ justifyContent: "space-between" }}
              >
                <Link to="/" className="footer__download-link">
                  <img
                    className="footer__download-img"
                    src={`https://res.cloudinary.com/dk4pzxlqt/image/upload/v1689023581/logo/R_zkvdd7.png`}
                    alt=""
                  />
                </Link>
                <Link to="/" className="footer__download-link">
                  <img
                    className="footer__download-img"
                    src={`https://res.cloudinary.com/dk4pzxlqt/image/upload/v1689023580/logo/R_1_ythyhd.png`}
                    alt=""
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="footer__bottom">
        <div className="grid wide">
          <div className="row">
            <div className="col l-12 m-12 c-12">
              <p className="footer__copyright" style={{ color: "#FFFFFF" }}>
                © TUTU STORE - 2023
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
