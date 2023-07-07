import React, { useEffect } from "react";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { getAllCategory } from "actions/services/CategoryActions";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { getCurrentUser, logout, setCurrentUser } from "actions/services/UserActions";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Cart from "./Cart";
import { API_URL } from 'actions/constants/constants'
function Header(props) {
  const [category, setCategory] = useState([]);
  const [keyword, setKeyword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  // const profile = useSelector((state) => state.auth.user);
  const auth = useSelector((state) => state.auth.auth);
  const token = localStorage.getItem("token");
  const search_keyword = [];
  const list_search = localStorage.getItem('search_keyword') ? JSON.parse(localStorage.getItem('search_keyword')) : [];
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
      dispatch(getCurrentUser())
    }
  }, [dispatch, token]);

  const handleLogout = () => dispatch(logout());

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    getAllCategory()
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <header className="header">
        <div className="grid wide">
          <nav className="header__navbar hide-on-mobile-tablet">
            <ul className="header__navbar--list">
              <li className="header__navbar--item header__navbar--item-qr header__navbar-item--separate">
                Vào cửa hàng trên ứng dụng
                <div className="header__qr">
                  <img
                    src={`${API_URL}/images/qrcode.png`}
                    alt="Qr code"
                    className="header__qr-img"
                  />
                  <div className="header__qr-apps">
                    <Link to="/" className="header__qr-link">
                      <img
                        src={`${API_URL}/images/googleplay.png`}
                        alt="Goole Play"
                        className="header__qr-download-img"
                      />
                    </Link>
                    <Link to="/" className="header__qr-link">
                      <img
                        src={`${API_URL}/images/appstore.png`}
                        alt="App store"
                        className="header__qr-download-img"
                      />
                    </Link>
                  </div>
                </div>
              </li>
              <li className="header__navbar--item">
                <span className="header__navbar--item-title-no-pointer">
                  Kết nối
                </span>
                <Link to="/" className="nav--icon-link">
                  <i className="header__navbar-icon fab fa-facebook" />
                </Link>
                <Link to="/" className="nav--icon-link">
                  <i className="header__navbar-icon fab fa-instagram" />
                </Link>
              </li>
            </ul>
            <ul className="header__navbar--list">
              <li className="header__navbar--item">
                <Link to="/about-us" className="nav--link">
                  <i className="header__navbar-icon far fa-question-circle" />
                  Về chúng tôi
                </Link>
              </li>
              <li className="header__navbar--item">
                <Link to="/help" className="nav--link">
                  <i className="header__navbar-icon far fa-question-circle" />
                  Trợ giúp
                </Link>
              </li>
              {token ? (
                <li className="header__navbar--item header__navbar-user">
                  <AccountCircleIcon />
                  <span className="header__navbar-user-name">
                    {auth.fullName}
                  </span>
                  <ul className="header__navbar-user-menu">
                    <li className="header__navbar-user-item">
                      <Link to="/customer/account">Tài khoản của tôi</Link>
                    </li>
                    <li className="header__navbar-user-item">
                      <Link to="/customer/address">Địa chỉ của tôi</Link>
                    </li>
                    <li className="header__navbar-user-item">
                      <Link to="/customer/order/history">Đơn mua</Link>
                    </li>
                    <li className="header__navbar-user-item header__navbar-user-item-separate">
                      <Link to="#" onClick={handleLogout}>
                        Đăng xuất
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="header__navbar--item navbar--strong header__navbar-item--separate">
                    <Link
                      to="/register"
                      className="nav--link nav--link-register"
                    >
                      Đăng ký
                    </Link>
                  </li>
                  <li className="header__navbar--item navbar--strong">
                    <Link to="/login" className="nav--link nav--link-login">
                      Đăng nhập
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <div className="header-width-search">
            <div className="header__logo">
              <a href="/" className="header__logo-link">
                <img
                  className="header__logo-img"
                  src="https://res.cloudinary.com/dk4pzxlqt/image/upload/v1688645837/Tutu1-removebg-preview_qqvmjl.png"
                  alt="Logo"
                />
              </a>
            </div>
            <div className="header__category">
              <div className="header__category--inner">
                <div className="header__category--icon">
                  <img
                    src="https://salt.tikicdn.com/ts/upload/96/d1/77/e499ea39b0773a337d2217ad473fcb97.png"
                    alt=""
                  />
                </div>
                <div className="header__category--text">
                  <span className="header__category--text-title">Danh Mục</span>
                  <span className="header__category--text-subtitle">
                    Sản phẩm
                    <i className="fas fa-caret-down" />
                  </span>
                </div>
              </div>
              <div className="header__category--dropdown">
                <ul className="header__category--list">
                  {category.map((item) => {
                    return (
                      <li className="header__category--item" key={item.id}>
                        <Link
                          to={`/${item.code}`}
                          className="header__category--link"
                        >
                          <i className="fas fa-bolt"></i>
                          {item.name}
                        </Link>
                        <div className="header__category--item-dropdown">
                          <h3 className="header__category--item-title">
                            {item.name}
                          </h3>
                          <ul className="header__category--item-sublist">
                            {item?.subcategories.map((sub) => {
                              return (
                                <li
                                  className="header__category--item-subitem"
                                  key={sub.id}
                                >
                                  <Link
                                    to={`/${item.code}/${sub.code}`}
                                    className="header__category--item-link"
                                  >
                                    {sub.name}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="header__search">
              <div className="header__search-input-wrap">
                <input
                  type="text"
                  className="header__search-input"
                  placeholder="Nhập thông tin tìm kiếm"
                  onChange={handleChange}
                />
                {/* -------  SEARCH HISTORY  ------ */}
                <div className="header__search-history">
                  <h3 className="header__search-history-heading">
                    Lịch sử tìm kiếm
                  </h3>
                  <ul className="header__search-history-list">
                    {list_search?.map((item, index) => {
                      return (
                        <li className="header__search-history-item" key={index}>
                          <Link to={`/search?keyword=${item}`}>
                            {item}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <button
                className="header__search-btn"
                onClick={() => {
                  history.push(`/search?keyword=${keyword}`);
                  localStorage.setItem("search_keyword", JSON.stringify([...list_search, ...search_keyword, keyword]));
                }}
              >
                <i className="header__search-btn-icon fas fa-search" />
              </button>
            </div>
            <Cart />
          </div>
        </div>
        <ul className="header__sort-bar">
          <li className="header__sort-item">
            <Link to="/" className="header__sort-link">
              Liên quan
            </Link>
          </li>
          <li className="header__sort-item header__sort-item-active">
            <Link to="/" className="header__sort-link">
              Mới nhất
            </Link>
          </li>
          <li className="header__sort-item">
            <Link to="/" className="header__sort-link">
              Bán chạy
            </Link>
          </li>
          <li className="header__sort-item">
            <Link to="/" className="header__sort-link">
              Giá
            </Link>
          </li>
        </ul>
      </header>
    </>
  );
}

export default Header;
