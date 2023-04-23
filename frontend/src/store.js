import {createStore,combineReducers,applyMiddleware} from "redux"

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./reducers/productReducer";
import { forgotPasswordReducer, profileReducer, allUsersReducer,userDetailsReducer,myDashboardReducer,
        userReducer, } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReduser";
import {newOrderReducer} from "./reducers/orderReducer.js"
import { myOrdersReducer } from "./reducers/orderReducer.js";
import { orderDetailsReducer , allOrdersReducer, orderReducer} from "./reducers/orderReducer.js";
import { newReviewReducer,reviewReducer,productReviewsReducer } from "./reducers/productReducer";
import { newProductReducer } from "./reducers/productReducer";
import { productsReducer } from "./reducers/productReducer";
const reducer = combineReducers({
        products:productsReducer,
        productDetails:productDetailsReducer,
        user:userReducer,
        profile:profileReducer,
        forgotPassword:forgotPasswordReducer,
        cart:cartReducer,
        myOrders:newOrderReducer,
        myOrders:myOrdersReducer,
        orderDetails: orderDetailsReducer,
        newReview: newReviewReducer,
        newProduct: newProductReducer,
        product: productReducer,
        allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  dashboard:myDashboardReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
});

let initialSate={
        cart: {
                cartItems: localStorage.getItem("cartItems")
                  ? JSON.parse(localStorage.getItem("cartItems"))
                  : [],
                  shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
}
};

const middleware = [ thunk];

const store = createStore(reducer,initialSate,composeWithDevTools(applyMiddleware(...middleware))
);


export default store;