let mongoose = require('mongoose');
const multer = require('multer');
let path = require('path');
let imgpath = "/uploads";



let StudentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    hobby: {
        type: Array,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    adminImage: {
        type: String,
        required: true
    }
});


let imgStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", imgpath));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "" + Date.now());
    }
});
StudentSchema.statics.uploadedImage = multer({ storage: imgStorage }).single('adminImage');
StudentSchema.statics.imgModelPath = imgpath;

let Student = mongoose.model('Student', StudentSchema);
module.exports = Student;