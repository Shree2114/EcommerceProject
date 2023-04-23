
                                              // IF YOU WANT TO FIX [ STOCK SETTING] CHANGE PRODUCT DETAILS IN SENSE THIS TAB (file) // *STOCK WILL BE CHANGED OR FIX*                 

import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import {useSelector,useDispatch} from "react-redux";
import { clearErrors, getProductDetails,newReview } from "../../actions/productAction";
import "../Home/Home.js"
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js"
import Loader from "../layout/Loader/Loader";
import {useAlert} from "react-alert";
import MetaData from "../layout/Metadata";
import {addItemsToCart} from "../../actions/cartAction"
import { useNavigate } from "react-router-dom";
import { Rating } from '@mui/material';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
  } from "@material-ui/core";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = ({match}) => {

  
    
     //<Route path="/product/:id" element={<ProductDetails />} />
    const dispatch = useDispatch();
    const alert = useAlert()
    const {id} = useParams();
    const {product,loading,error} =useSelector((state)=> state.productDetails);
    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
      );
      
    const navigate = useNavigate()
    
    const options = {
        edit:false,
        color:"rgb(20,20,20,0.1)",
        activeColor:"gold",
        size: window.innerWidth < 600 ? 20 : 15,
          value: product.ratings,
          readOnly: true,
          precision: 0.5,
        
    };
    
    const [quantity, setQuantity] = useState(3);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock >= quantity) return;
    const qty = quantity + 3;
    setQuantity(qty);
  };
  
  const decreaseQuantity = () => {
    if (3 >= quantity) return;
    const qty = quantity - 3;
    setQuantity(qty);
  };
  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };
  const buyNowHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
    navigate("/cart")
}
useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch,id, error, alert, reviewError, success]);
    
    return (
        <Fragment>
            {loading? <Loader/> :(<Fragment>
                <MetaData title={`${product.name} -- WholeDis MART`}/>
            <div className="ProductDetails">
            <div>
                <Carousel>
                    {product.images &&
                    product.images.map((item,i) =>(
                        <img
                        className="CarouselImage"
                        key={item.url}
                        src={item.url}
                        alt={`${i} Side`}
                        />
                    ))}
                </Carousel>
                </div>
                
            
            <div>
                <div className="detailsBlock-1">
                    <h2>{product.name}</h2>
                    <p>Product # {product._id}</p>
                    </div>
                    <div className="detailsBlock-2">
                    <ReactStars {...options}/>
                    <span>({product.numOfReviews} Reviews)</span>
                    </div>
                    <div className="detailsBlock-3">
                        <h1>{`₹${product.price}`}</h1>
                        <div className="detailsBlock-3-1-1-1">
                        Mininum Quantity 3 ..(Wholesale)..
                        </div>
                        <div className="detailsBlock-3-1">
                        <div className="detailsBlock-3-1">
                        
                    <button disabled={product.stock < 1 ? true : false} onClick={buyNowHandler}>Buy Now</button>
                </div>
                        
                        <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>  
                    <input readOnly type="number" value={quantity}/> 
                    <button onClick={increaseQuantity}>+</button>
                    </div>
                        
                        
                        
                    <button
                  className="addCartButton"
                  disabled={product.stock < 1 ? true : false}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
                    </div>
                    

                    <p>
                        Status:{" "}
                        <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                            {product.Stock < 1 ? "OutOfStock" : "InStock"}
                        </b>
                    </p>
                    </div>
                    <div className="detailsBlock-4">
                           Description : <p>{product.description}</p>

                    </div>
                    <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
                </div>
               
            </div>
            <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
            {product?.reviews && product?.reviews[0] ? (
            <div className="reviews">
              {product?.reviews &&
                product?.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}

            <div>
            <h3 className="reviewsHeading-1">
            ↓↓↓ $ Similar Product $ ↓↓↓
                </h3>
                </div>
        </Fragment>)}
        </Fragment>
        
    );
};

export default ProductDetails;
