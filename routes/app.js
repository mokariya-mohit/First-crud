let express = require('express');
let router = express.Router();
let admincontroller = require("../controllers/admincontroller");
let Student = require("../models/Student");

router.get("/",admincontroller.addData);

router.post("/addDetails", Student.uploadedImage,admincontroller.addDetails);

router.get("/viewData", admincontroller.viewData);

router.get("/deleteData/:id", admincontroller.deleteData);

router.post("/editData", Student.uploadedImage,admincontroller.editData);

router.get("/updateData/:id",admincontroller.updateData);

module.exports = router;


