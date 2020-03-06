const multer = require('multer');
const Middleware = require('./middleware');
const Controller = require('./controllers');

var storage = multer.diskStorage({
   destination:function(req,file,cb){
       cb(null,'uploads/')
   },
   filename:function(req,file,cb){
       cb(null,file.originalname)
   }
})
var upload = multer({storage:storage})

controller = new Controller();
middleware = new Middleware();
module.exports = (app) => {

   app.get('/',controller.hello);

   //app.post('/api/uploadfile', middleware.store().single('image'),controller.file);

   app.post('/api/uploadfile', upload.array('image',12), (req, res, next) => {
      // res.json({
      //     'message': 'File uploaded successfully'
      // });
      res.send(req.files);
  
  });

   app.get('/api/products/',controller.products);

   app.post('/api/products/',controller.postproducts);

   app.delete('/api/delete/:id',controller.delproducts);

   app.put('/api/products/:id',controller.updateproducts);

};