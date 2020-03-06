const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const userRoute = require('./routes/userRoutes/userRoute');
const postRoute = require('./routes/postsRoutes/postsRoute');
const likeRoute = require('./routes/likeRoutes/likeRoute');

const app = express();
const connectionString = 'mongodb+srv://ojas7160:ojas7160@cluster0-02ba1.mongodb.net/gym?retryWrites=true&w=majority';

app.use(bodyParser.json()); // parse request body
app.use(bodyParser.urlencoded({extended: true}));
app.use("/images", express.static(path.join(__dirname, "/images"))); // tells express to pick images after path 'host/images/pic_name' to redirect it from images folder
app.use("/images/postImages", express.static(path.join(__dirname, "/images/postImages")));

mongoose.connect(connectionString).
then(() => {
  console.log('DB connected')
}).catch(err => {
  console.log(err)
})

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Authorization, Content-Type, Accept');
	res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');
	next();
})

//routes
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/likes", likeRoute);

module.exports = app;