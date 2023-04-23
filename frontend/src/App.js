
import './App.css';
import Header from "./component/layout/Header/Header.js";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ForgotPassword from './component/User/ForgotPassword.js';
import WebFont from 'webfontloader';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home";
import Loader from './component/layout/Loader/Loader';
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js"
import  Search  from "./component/Product/Search.js";
import LoginSignUP from './component/User/LoginSignUP';
import store from "./store";
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js";
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile.js';
import UpdatePassword from "./component/User/UpdatePassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import LoginSignup from "./component/User/LoginSignUP";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from './component/Cart/Payment';
//import StripeContainer from './component/Cart/StripeContainer.js';
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from './component/Order/MyOrders.js';
import OrderDetails from './component/Order/OrderDetails.js';
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from './component/Admin/NewProduct.js';
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UserList from "./component/Admin/UserList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import About from "./component/layout/About/About.js";
import Contact from "./component/layout/Contact/Contact.js";
import NotFound from "./component/layout/Not Found/NotFound.js";









function App() {

  const {isAuthenticated, user} = useSelector(state=>state.user);
  
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser())
    getStripeApiKey();
  },[]);
  return(
   <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route extact path="/" element = {<Home/>}/>
        <Route extact path="/sad" element ={<Loader/>}/>
        <Route extact path="/product/:id" element={<ProductDetails />} />
        <Route extact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/login" element={<LoginSignUP/>}/>
        <Route path="/account" element={<Profile/>}/>
        <Route element={<ProtectedRoute/>}></Route>
        <Route path="/me/update" element={<UpdateProfile/>}/>
        <Route path="/password/update" element={<UpdatePassword/>}/>
        <Route path="/password/forgot" element={<ForgotPassword/>}/> 
        <Route path="/password/reset/:token" element={<ResetPassword/>}/> 
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/shipping" element={<Shipping/>}/>
        <Route path="/order/confirm" element={<ConfirmOrder/>}/>
        <Route
          path="/process/payment"
          element={
            isAuthenticated ? (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            ) : (
              <LoginSignup />
            )
          }
        />
        <Route path="/success" element={<OrderSuccess/>}/>
        <Route path="/orders" element={<MyOrders/>}/>
        <Route path="/order/:id" element={<OrderDetails/>}/>
        <Route isAdmin={true} path="/admin/dashboard" element={<Dashboard/>}/>
        <Route isAdmin={true} path="/admin/products" element={<ProductList/>}/>
        <Route isAdmin={true} path="/admin/product" element={<NewProduct/>}/>
        <Route isAdmin={true} path="/admin/product/:id" element={<UpdateProduct/>}/>
        <Route isAdmin={true} path="/admin/orders" element={<OrderList/>}/>
        <Route isAdmin={true} path="/admin/order/:id" element={<ProcessOrder/>}/>
        <Route isAdmin={true} path="/admin/users" element={<UserList/>}/>
        <Route isAdmin={true} path="/admin/user/:id" element={<UpdateUser/>}/>
        <Route isAdmin={true} path="/admin/reviews" element={<ProductReviews/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
  </Router>
  );
}

export default App;

//<Route path="/process/payment" element={<StripeContainer/>}/>
// Error see in console
//<Route path="/search" element={<Search/>} />