const http = require('http');
const express = require('express');
const app = express();
const multer = require('multer');
const {mongoose} = require("./dbconnection");
const bodyParser = require("body-parser");
const fs = require('fs');
 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('uploads'));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const storage = multer.diskStorage({destination:function(req,file,cb){
                                       cb(null, 'uploads/')
                                     },
                                    filename:function(req,file,cb){
                                      cb(null, file.originalname)
                                    }})
var upload = multer({ storage: storage })

const productSchema = new mongoose.Schema({
  'productname':String,
  'productprice':Number,
  'retailprice':Number,
  'sku':String,
  'category':String,
  'images':String
})
app.get('/',(req,res)=>{
  res.send("Hello")
})
app.post('/api/uploadfile', upload.single('image'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send(file)
  
})
app.get('/api/products/',(req,res)=>{
 // res.send('hello');
  const product = mongoose.model('products',productSchema);
  product.find()
  .then(r=>{
    res.json(r);
  })
  
})
app.post('/api/products/',(req,res)=>{
  data1 = mongoose.model('products',productSchema);

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
})
app.delete('/api/delete/:id',(req,res)=>{

  let product = mongoose.model('products',productSchema);
  product.find({_id:req.params.id})
   .then(r=>{
     //res.send(r[0]['images']);
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

})
app.put('/api/products/:id',(req,res)=>{

  let product = mongoose.model('products',productSchema);
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
})

const server = http.Server(app);
server.listen(process.env.PORT|3000);
console.log("Listining on port 3000");