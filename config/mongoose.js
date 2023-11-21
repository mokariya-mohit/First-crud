let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Firstdb');

let db = mongoose.connection;

db.once('open', (err)=>{
    if(err){
        console.log('Error connecting to Database');
        return false;
    }
    console.log("Connect Database");
});
module.exports = db;