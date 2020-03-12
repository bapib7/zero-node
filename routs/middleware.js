const multer = require('multer');
var path = require('path');
module.exports = class middleware{
    //filestorage on upload.
    store()
    {
      var storage = multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,path.resolve('./uploads'))
        },
        filename:function(req,file,cb){
            cb(null,file.originalname)
        }
     })
     var upload = multer({storage:storage});
        return  upload;
    }
}

