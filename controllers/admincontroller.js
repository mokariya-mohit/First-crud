
let Student = require('../models/Student');
let path = require('path');
let fs = require('fs');

module.exports.addData = function (req, res) {
    res.render('addData');
};

module.exports.addDetails = async function (req, res) {
    let imgpath = '';
    if (req.file) {
        imgpath = Student.imgModelPath + "/" + req.file.filename;
    }
    req.body.adminImage = imgpath;
    await Student.create(req.body);
    return res.redirect('/');
};

module.exports.viewData = async function (req, res) {
    let data = await Student.find({});
    return res.render('viewData', {
        stdata: data
    });
};

module.exports.deleteData = async function (req, res) {
    let oldData = await Student.findById(req.params.id);
    if (oldData.adminImage) {
        let fullPath = path.join(__dirname,".."+oldData.adminImage);
        await fs.unlinkSync(fullPath);

    }
    await Student.findByIdAndDelete(req.params.id);
    return res.redirect('back');
};

module.exports.editData = async function (req, res) {
    console.log(req.file);
    let oldData = await Student.findById(req.body.oldId);
    if (!req.file) {
        console.log(oldData.adminImage);
        req.body.adminImage = oldData.adminImage;
        console.log(req.body);
    }
    else {
        if (req.file) {
            // let oldData = await Student.findById(req.body.oldId);
            if (oldData.adminImage) {
                let fullPath = path.join(__dirname,".."+oldData.adminImage);
                await fs.unlinkSync(fullPath);

                let imgpath = '';
                if (req.file) {
                    imgpath = Student.imgModelPath + "/" + req.file.filename;
                }
                req.body.adminImage = imgpath;
            }
        }
    }
    await Student.findByIdAndUpdate(req.body.oldId, req.body);
    return res.redirect('/viewData');
};

module.exports.updateData = async function (req, res){
    let record = await Student.findById(req.params.id);
    return res.render('update', {
        oldStudent: record
    })
};