let express = require('express');
let port = 8009;
let app = express();
// let db = require('./config/mongoose');
let path = require('path');
let Student = require('./models/Student');
let fs = require('fs');
let mongoose = require('mongoose');

mongoose.connect("mongodb+srv://mokariyamohit123:mokariya7698235220@cluster0.w979vek.mongodb.net/Firstdb", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
    .then(() => console.log('Database connected.'))
    .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.urlencoded());

app.use('/', require('./routes/app'));
app.use('/post',require('./routes/post_form'));

app.listen(port, (err) => {
    if (err) {
        console.log('Error listening');
        return false;
    }
    console.log("server listening on port: " + port);
});

