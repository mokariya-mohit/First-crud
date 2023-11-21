let Post = require('../models/Post');
let path = require('path');
let fs = require('fs');


module.exports.addData = function (req, res) {
    res.render('post');
};
module.exports.addPostData = async function (req, res) {
    if (req.file) {
        imgpath = Post.imgModelPath + "/" + req.file.filename;
    }
    req.body.postimg = imgpath;
    await Post.create(req.body);

    return res.redirect('back');
};
module.exports.viewPostData = async function (req, res) {
    let PostData = await Post.find({});
    return res.render('viewPostData', {
        allPost: PostData
    });
};
module.exports.deleteData = async function (req, res) {
    try {
        let oldData = await Post.findById(req.params.id);
        if (oldData.postimg) {
            let fullPath = path.join(__dirname, ".." + oldData.postimg);
            await fs.unlinkSync(fullPath);

        }
        await Post.findByIdAndDelete(req.params.id);
        return res.redirect('back');
    }
    catch (err) {
        console.log("Record not found");
        return res.redirect('back');
    }
};
module.exports.editData = async function (req, res) {
    let oldData = await Post.findById(req.body.oldId);
    if (!req.file) {
        req.body.post = oldData.postimg;
    }
    else {
        if (req.file) {
            if (oldData.postimg) {
                let fullPath = path.join(__dirname, ".." + oldData.postimg);
                await fs.unlinkSync(fullPath);

                let imgpath = '';
                if (req.file) {
                    imgpath = Post.imgModelPath + "/" + req.file.filename;
                }
                req.body.postimg = imgpath;
            }
        }
    }
    await Post.findByIdAndUpdate(req.body.oldId, req.body);
    return res.redirect('/post/viewPostData');
};
module.exports.updateData = async function (req, res) {
    let record = await Post.findById(req.params.id);
    return res.render('updatePostData', {
        pd: record
    })
};