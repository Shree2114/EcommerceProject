import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from"./ProductCard.js"
import MetaData from "../layout/Metadata";
import { getProduct, clearErrors } from "../../actions/productAction";
import{useSelector,useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
//Stock
//const product ={
    //name: "Blue Tshirt",
    //images: [{ url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT61T57nB4DdDwhpC9af2w-LK8uiQeKCM8lyA&usqp=CAU" }],
    //price:"3000",
    ///_id:"shree",
//};

const Home = () => {
    const alert= useAlert()
    const dispatch = useDispatch();
    const {loading, error, products } = useSelector(
      (state) => state.products);
    
    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
      dispatch(getProduct());
    }, [dispatch, error, alert]);
  
    return (
    <Fragment>
      {loading ? 
      (<Loader/>
      ): (
      <Fragment>
      <MetaData title="WholeDis MART"/>
        <div className="banner">
              <h1></h1>
              <a href="#container">
                <button>
                  Scroll <CgMouse />
                </button>
              </a>
          </div>
            <h2 className='homeHeading'>Featured Products</h2>
          <div className='container' id="container">
            {products && products.map((product) => <ProductCard product={product}/>
            )}
  
          </div> 
     </Fragment>)}
    </Fragment>
    )
  };
  

export default Home;
