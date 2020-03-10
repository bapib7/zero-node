const multer = require('multer');
const Middleware = require('./middleware');
const Controller = require('./controllers');
var path = require('path');

var storage = multer.diskStorage({
   destination:function(req,file,cb){
       cb(null,path.resolve('uploads/'))
   },
   filename:function(req,file,cb){
       cb(null,file.originalname)
   }
})
var upload = multer({storage:storage});
controller = new Controller();
middleware = new Middleware();
module.exports = (app) => {

   app.get('/',controller.hello);

   //app.post('/api/uploadfile', middleware.store().single('image'),controller.file);

   app.post('/api/uploadfile', upload.single('image'), (req, res) => {
    console.log('files', req.files);
    res.send(req.files);
  
  });

   app.get('/api/products/',controller.products);

   app.post('/api/products/',controller.postproducts);

   app.delete('/api/delete/:id',controller.delproducts);

   app.put('/api/products/:id',controller.updateproducts);

};