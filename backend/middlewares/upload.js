const multer = require("multer")
const upload  = multer ({
  Storage:multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,"../public/documents")
    },
    filename:function(req,file,cb){
      cb(null,file.fieldname+"-"+Date.now()+".pdf")
    }
  })
});