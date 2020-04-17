const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json())
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(cors());


mongoose.connect('mongodb+srv://sadam:sadam@123@cluster0-xar18.mongodb.net/ChatApp',{useNewUrlParser:true,useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) =>{console.log(error)});
db.once('open',()=>{console.log('dbconnected')})

app.use(express.json());


io.of('/').on('connect', (socket) => {
    console.log(socket.id);
  });

var router = require('./routes/User')


app.use('/api', router)

http.listen(port, ()=>{console.log(`server listening on port ${port}`)});