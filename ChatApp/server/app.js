const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(bodyParser.json());

app.use(cors());


mongoose.connect('mongodb+srv://sadam:sadam@123@cluster0-xar18.mongodb.net/ChatApp',{useNewUrlParser:true,useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) =>{console.log(error)});
db.once('open',()=>{console.log('dbconnected')})

app.use(express.json());


io.on('connect', (socket) => {
    console.log('a user connected');
  });


app.get('/', (req,res)=>{
    res.send('trdtrde')
})

http.listen(5000, ()=>{console.log('server listening on port 3001')});