import React, { useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartInfo } from "actions/services/CartActions";
function Header(props) {
  const dispatch = useDispatch();

  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if(token) {
      dispatch(getCartInfo());
    }
  }, [dispatch, token]);

  return (
    <>
      <div className="header__cart">
        <Link to="/checkout/cart" className="header__cart-link">
          <i className="fas fa-shopping-cart cart-icon" />
          {token ? (
            <span className="header__cart-notice">
              {cartInfo?.items_quantity}
            </span>
          ) : (
            <span className="header__cart-notice">0</span>
          )}
        </Link>
      </div>
    </>
  );
}

export default Header;
