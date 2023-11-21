let express = require('express');
let router = express.Router();
let postcontroller = require('../controllers/postcontroller');
const Post = require('../models/Post');

router.get('/',postcontroller.addData);

router.post('/addPostData',Post.uploadedImage,postcontroller.addPostData);

router.get('/viewPostData',postcontroller.viewPostData);

router.get('/deleteData/:id',postcontroller.deleteData);


router.post("/editData", Post.uploadedImage,postcontroller.editData);

router.get('/updateData/:id',postcontroller.updateData);

module.exports = router;