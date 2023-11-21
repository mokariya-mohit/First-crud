let mongoose = require('mongoose');
let multer = require('multer');
let path = require('path');
let imgpath = '/uploads/postUploads';


let PostSchema = mongoose.Schema({
    title:{
        type: Array,
        required: true,
    },
    comment:{
        type: String,
        required: true,
    },
    postimg:{
        type: String,
        required: true,
    }
    
});

let postImgStorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,'..',imgpath));
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname+''+Date.now());
    }
});

PostSchema.statics.uploadedImage = multer({ storage: postImgStorage }).single('postimg');
PostSchema.statics.imgModelPath = imgpath;

let Post = mongoose.model('Post', PostSchema);
module.exports = Post;