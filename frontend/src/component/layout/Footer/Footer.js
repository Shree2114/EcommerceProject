import React from "react";
import playStore from "../../../images/playstore.png";

import appStore from "../../../images/Appstore.png";
import "./Footer.css"
const Footer = () => {
    return (
        
              <footer id="footer">
                <div className="leftFooter">
                  <h4>DOWNLOAD OUR APP</h4>
                  <p>Download App for Android and IOS mobile phone</p>
                  <img src={playStore} alt="playstore" />
                  <img src={appStore} alt="Appstore" />
                </div>
          
                <div className="midFooter">
                  <h1>WholeDisMART.</h1>
                  <p>Fast Delivery & Quality Product is our first priority</p>
          
                  <p>Founded By (SPG)</p>
                </div>
          
                <div className="rightFooter">
                  <h4>Follow Us</h4>
                  <a href="http://instagram.com/meabhisingh">Instagram</a>
                  <a href="http://youtube.com/6packprogramemr">Youtube</a>
                  <a href="http://instagram.com/meabhisingh">Facebook</a>
                  <a href>Contact:- 7666588108. </a>
                  <a href="https://www.google.com/intl/en-GB/gmail/about/">Email</a>
                </div>
              </footer>
            );
          };
   
export default Footer;
