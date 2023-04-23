import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import{useDispatch,useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Slider } from "@mui/material";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import MetaData from "../layout/Metadata";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import { Button } from "@material-ui/core";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
const categories = [
    "Nikee",
    "Adidas",
    "Puma",
    "Remeras",
    "Zapatillas",
    "machine",
];

const Products = (match) => {
    
    const dispatch = useDispatch();
    const alert = useAlert();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 25000]);
    const [category , setCategory] = useState ("");
    const [ratings, setRatings] = useState(0)
    const {products,loading,error,productsCount,resultPerPage,filteredProductsCount} = useSelector(state => state.products);
    const {keyword} = useParams();
    
    const setCurrentPageNo = (e)=>{
        setCurrentPage(e)
    };
    
    const priceHandler = (event, newPrice) => {
        console.log(newPrice)
        setPrice(newPrice);
    }
    useEffect(() =>{
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct(keyword,currentPage,price,category, ratings));
    }, [dispatch,keyword,currentPage,price,category,ratings,alert,error])
    const resetFilters = () => {
        setCategory("");
        setRatings(0);
        setPrice([70, 12000]);
      };
    
      const [showMediaIcons, setShowMediaIcons] = useState(false);

    let count = filteredProductsCount;
    
    return <Fragment>{loading?<Loader/> :(
    <Fragment>

        <MetaData title=" PRODUCTS -- WholeDis MART"/>
        <h2 className="productsHeading">Products</h2>
        
        <div className="products">
            {products && 
            products.map((product) => (
                <ProductCard key={product._id} product={product}/>
            ))} 
        </div>
        <button
            className=" mobile-settingMenu"
            onClick={() => setShowMediaIcons(!showMediaIcons)}
          >
            {showMediaIcons ? (
              <SettingsInputComponentIcon />
            ) : (
              <SettingsApplicationsIcon />
            )}
          </button>
        
                
          <div
            className={showMediaIcons ? "mobile-filterBox" : "filterBox"}
            onClick={() => setShowMediaIcons(false)}
          >
    <Typography>Price</Typography>
    <Slider 
        value={price}
        onChange={priceHandler}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        marks
        step={100}
        min={0}
        max={25000}
    />


<Typography>Categories</Typography>
        <ul className="categoryBox">
            {categories.map((category) => (
                <li 
                className="category-link"
                key={category}
                onClick={() => setCategory(category)}
                >
                {category}
                </li>
            ))}
        </ul>
        <fieldset>
            <Typography component = "legend">Ratings </Typography>
            <Slider value={ratings}
            onChange={(e, newRating) => {
                setRatings(newRating);
            }}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            min={0}
            max={5}
            />
                 
            
        </fieldset>
        <Typography>
              <Button onClick={resetFilters}>
                <RestartAltIcon />
                Reset
              </Button>
            </Typography>
                </div>
        {resultPerPage < count &&(<div className="paginationBox">
        <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
    </div>)}
        </Fragment>)}
        
</Fragment>};

export default Products;
