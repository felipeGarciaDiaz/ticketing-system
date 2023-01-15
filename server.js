const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const crypto = require('crypto');
const mysql = require('mysql');

const db = mysql.createConnection({
    host:   'localhost',
    user:   'root',
    password:   '',
    database:   'dos-bros-it',
});

db.connect((err) => {
    if(err) {
        console.log(err.code);
        console.log(err.fatal);
    }else{
        console.log("Connection has been succesfully initiated!")
    }
})
const PORT = 7072;

app.use(express.static(path.join(__dirname, "client/build/")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "client/public/", "index.html"));
});

app.post('/', (req, res, next) => {
    $query = "INSERT INTO tickets (firstName, lastName, email, phone, description) VALUES (?)";
        $data = [
        [req.body.firstName], 
        [req.body.lastName],
        [req.body.email], 
        [req.body.phone], 
        [req.body.request]
    ]
    db.query($query, 
    [$data], (err, rows, fields) => {
        if (!err) { 
            console.log('Repair was succesfully sent to the servers database! \n Records: ' + rows);
        }else{
            console.log(err);
        }
    });
    console.log(req.body.firstName, req.body.lastName, req.body.email, req.body.phone, req.body.request);
    
    res.send("<h1>FORM SENT</h1>")
    next();
})
io.on("connection", (socket) => {
    console.log('Client has connected to the server!!!');
    socket.on('test', (msg)=>{
        console.log('recieved test message!!!', msg);
    })
})

http.listen(PORT, ()=>{
    console.log('Server Started using port:', PORT);
})