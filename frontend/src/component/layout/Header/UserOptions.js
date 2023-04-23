import React, { Fragment, useState, } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import logo from "../../../images/Profile.png";
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import SearchIcon from '@mui/icons-material/Search';
import { useAlert } from "react-alert";
import { logout} from "../../../actions/userAction";
import { useDispatch,useSelector  } from "react-redux";
import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import Products from "../../Product/Products";
import StorefrontIcon from '@mui/icons-material/Storefront';
import Home from "../../Home/Home";












const UserOptions = ({user}) => {
    const {cartItems} = useSelector((state) => state.cart)
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const alert=useAlert();
    const dispatch= useDispatch();


    const options = [
      {icon: <StorefrontIcon/>, name: "Home", func: Home },
      {icon: <ShoppingBagTwoToneIcon/>, name: "Products", func: Products  },
      {icon: <SearchIcon/>, name: "Search", func: Search },
      
      {icon: <ShoppingCartIcon style={{color:cartItems.length>0? "tomato" : "unset"}}/>, name: `Cart(${cartItems.length})`, func:cart},
        {icon: <ListAltIcon/>, name: "Orders", func: orders },
        {icon: <PersonIcon/>, name: "Profile", func: account },
        {icon: <ExitToAppIcon/>, name: "Logout", func: logoutUser },
   ];
   if (user?.role === "admin") {
    options.unshift({
      icon: <DashboardCustomizeIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  
function dashboard(){
 navigate("/admin/dashboard")
}
function Products(){
  navigate("/products");
}
function Home(){
  navigate("/");
}
function orders(){
 navigate("/orders");
}
function account(){
 navigate("/account");
}
function cart(){
 navigate("/cart");
}

function Search(){
  navigate("/search");
 }
function logoutUser(){
 dispatch(logout());
 alert.success("Logout Successfully")
}
    
    return <Fragment>
        <Backdrop open={open} style={{zindex: "10"}}/>
        <SpeedDial
        ariaLabel="SpeedDial tooltip"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{zIndex:"11"}}
        open={open}
        direction="down"
        className="speedDial"   
        icon={ <img className="speedDialIcon" src={user?.avatar.url ? user?.avatar.url :logo } alt="Profile" />}
         >
            {options.map((item) =>(
        <SpeedDialAction 
        key={item.name}
        icon={item.icon} tooltipTitle={item.name} onClick={item.func} tooltipOpen={window.innerWidth<=600?true:false}/>
        ))}
        
       
        </SpeedDial>
    </Fragment>;


};
export default UserOptions;
