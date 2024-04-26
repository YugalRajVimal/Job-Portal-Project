import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./public/uploads/');
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+'-'+file.originalname);
    }
})

export const uploadFile = multer({ 
                                    storage: storage 
                                });