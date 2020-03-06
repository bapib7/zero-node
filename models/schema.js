
const {mongoose} = require("../db/dbconnection");


    productSchema = mongoose.Schema({
    'productname':String,
    'productprice':Number,
    'retailprice':Number,
    'sku':String,
    'category':String,
    'images':String
  });


  module.exports=productModel =  mongoose.model('products',productSchema);
    



