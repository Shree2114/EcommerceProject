module.exports = (theFunc) => (req,res,next) => {
  Promise.resolve(theFunc(req,res,next)).catch(next);

}

//console.log(async(req,res)=>{
  //const products = await Product.find();

  ///console.log(async(req,res)=>{
    //const message = `Resource not found.Invalid: ${err.path}`;
    //err = new ErrorHander (message,400);
  //})

  //res.status(200).json({
      //success:true,
      //products})
//});