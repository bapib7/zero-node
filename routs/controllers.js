const productModel = require('../models/schema');
const fs = require('fs');

//model = new Schemas();

module.exports = class Controller{

   hello(req, res , next){  
      res.send("Hello");
      next();
    };
    

   //File upload.
  file(req, res, next){
      // const file = req.file
      // if (!file) {
      //   const error = new Error('Please upload a file')
      //   error.httpStatusCode = 400
      //   return next(error)
      //   }
        res.send(res);
      };

    //Get products
      products(req, res){
        const product = productModel;
        product.find()
        .then(r=>{
          res.json(r);
        })
      };
    
    //Post products
      postproducts(req, res){
        data1 = productModel;
        const data = new data1({"productname":req.body.name,
        "productprice":req.body.price,
        "retailprice":req.body.rprice,
       "sku":req.body.sku,
        "category":req.body.category,
        "images":req.body.imagelink
      });
        data.save()
          .then(item=>{res.send(item)})
          .catch(err=>{res.send(err)})
      };


      //Delete products
       delproducts(req, res){
          let product = productModel;
          product.find({_id:req.params.id})
           .then(r=>{
             if(r[0]['images'])
                {
                    fs.unlinkSync('uploads/'+r[0]['images']);
                }
                product.remove({_id:req.params.id}).exec()
                .then(r=>{
                  {res.json({"mess":r})}
                })
                .catch(err=>{res.json({"error":err})})
           })
          };

    //Update product
      updateproducts(req, res){
        let product = productModel;
        product.update({_id:req.params.id},{"productname":req.body.name,
        "productprice":req.body.price,
        "retailprice":req.body.rprice,
       "sku":req.body.sku,
        "category":req.body.category,
        "images":req.body.imagelink
      })
         .then(r=>{
                res.send(r);
         })
         .catch(err=>{res.json({"error":err})})
      };
      //
    }