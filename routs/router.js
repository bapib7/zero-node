
const Middleware = require('./middleware');
const Controller = require('./controllers');
const multer = require('multer');

const storage = multer.diskStorage({destination:function(req,file,cb){
   cb(null, 'uploads/')
 },
filename:function(req,file,cb){
  cb(null, file.originalname)
}})
let upload = multer({ storage: storage });

controller = new Controller();
middleware = new Middleware();
module.exports = (app) => {

   app.get('/',controller.hello);

   app.post('/api/uploadfile',upload.single('image'),controller.file);

   app.get('/api/products/',controller.products);

   app.post('/api/products/',controller.postproducts);

   app.delete('/api/delete/:id',controller.delproducts);

   app.put('/api/products/:id',controller.updateproducts);

};