import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { authentication } from './utils/Authentication'
import ScrollToTop from './ScrollToTop';

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import HomePage from 'pages/HomePage'
import LoginPage from 'pages/LoginPage'
import RegisterPage from 'pages/RegisterPage'
import NotFoundPage from 'pages/NotFound'

import DetailProduct from 'pages/DetailProduct';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { logout, setCurrentUser } from './actions/services/UserActions';
import CartPage from 'pages/CartPage';
import PaymentPage from 'pages/PaymentPage';
import ResultOrderPage from 'pages/ResultOrderPage';
import HistoryOrder from 'pages/HistoryOrder';
import CustomerAddress from 'pages/CustomerAddress';
import HistoryOrderDetail from 'pages/HistoryOrderDetail';
import { Suspense } from 'react';
import CustomerWishlist from 'pages/CustomerWishlist';
import ListProductBrand from 'pages/ListProductBrand';
import CustomerProfile from 'pages/CustomerProfile';
import CustomerPassword from 'pages/CustomerPassword';
import CustomerReview from 'pages/CustomerReview';
import OAuth2RedirectHandler from 'components/Oauth2Handler/OAuth2RedirectHandler';
// import Header2 from 'components/Header/Header2';
const ListProductPage = React.lazy(() => import('./pages/ListProductPage'));

function App() {

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
      if (Date.now() / 1000 > decoded.exp) {
        dispatch(logout());
      }
    }
  }, [dispatch, token]);

  return (
    <Suspense fallback={''}>
      <Router>
        <ScrollToTop />
        <Header />
        <div className="app__container">
          <div className="grid wide">
            <Switch>
              <PrivateRoute exact path="/customer/account" component={CustomerProfile} />
              <PrivateRoute exact path="/customer/change-password" component={CustomerPassword} />
              <PrivateRoute exact path="/customer/address" component={CustomerAddress} />
              <PrivateRoute exact path="/customer/wishlist" component={CustomerWishlist} />
              <PrivateRoute exact path="/customer/review" component={CustomerReview} />
              <PrivateRoute exact path="/checkout/payment" component={PaymentPage}></PrivateRoute>
              <PrivateRoute exact path="/success/payment" component={ResultOrderPage}></PrivateRoute>
              <PrivateRoute exact path="/customer/order/history" component={HistoryOrder}></PrivateRoute>
              <PrivateRoute exact path="/customer/order/history/detail/:id" component={HistoryOrderDetail}></PrivateRoute>

              <PublicRoute exact path="/" component={HomePage} />
              <PublicRoute exact path="/login" component={LoginPage} />
              <PublicRoute exact path="/register" component={RegisterPage} />
              <Route exact path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
              <Route exact path="/checkout/cart" component={CartPage}></Route>
              <Route exact path="/search" render={(props) => <ListProductPage {...props} key={props.location.key} />}></Route>
              <Route exact path="/thuong-hieu/:brand" render={(props) => <ListProductBrand {...props} key={props.location.key} />}></Route>
              <Route exact path="/:category" render={(props) => <ListProductPage {...props} key={props.location.key} />}></Route>
              <Route exact path="/:category/:subcategory" render={(props) => <ListProductPage {...props} key={props.location.key} />}></Route>
              <Route exact path="/san-pham/:id/:slug" render={(props) => <DetailProduct {...props} key={props.location.key} />}></Route>
              <PublicRoute path="*" component={NotFoundPage} />
            </Switch>

          </div>
        </div>
        <Footer />
      </Router>
    </Suspense>
  );
}

function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Component {...props} />
      )}
    />
  )
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        authentication.isAuthentication() ?
          <Component {...props} /> :
          <Redirect to="/login" />
      )}
    />
  )
}

export default App;
