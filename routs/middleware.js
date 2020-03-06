const multer = require('multer');
module.exports = class middleware{
    //filestorage on upload.
    store()
    {
        const storage = multer.diskStorage({destination:function(req,file,cb){
            cb(null, 'uploads/')
          },
         filename:function(req,file,cb){
           cb(null, file.originalname)
         }})
         let upload = multer({ storage: storage });
        return  upload;
    }
}

