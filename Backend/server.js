const app = require("./app");


const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

//Handling Uncaught Expection 
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`)
    console.log(`Shutting Down the Server Due to Uncaught Expection`);
    process.exit(1)
});

//Config

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/settings.env" });
  }

//Connecting To DataBase
connectDatabase()


//cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
const server = app.listen(process.env.PORT,() =>{

    console.log(`server is woring on http://localhost:${process.env.PORT}`)
    
});

// Unhandeld Promis Rejection
process.on("unhandledRejection",(err)=>{
    console.log (`Error:${err.message}`);
    console.log(`Shutting Down the Server Due to Unhandled Promise Rejection`);
    server.close(() => {
        process.exit(1);
    });

});