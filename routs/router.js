const multer = require('multer');
const Middleware = require('./middleware');
const Controller = require('./controllers');
controller = new Controller();
middleware = new Middleware();
module.exports = (app) => {

   app.get('/',controller.hello);

   app.post('/api/uploadfile', middleware.store().single('image'), controller.file);

   app.get('/api/products/',controller.products);

   app.get('/api/products_con/',controller.products_con);


   app.post('/api/products/',controller.postproducts);
   

   app.delete('/api/delete/:id',controller.delproducts);

   app.put('/api/products/:id',controller.updateproducts);

};