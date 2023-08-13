const express = require('express');
const app = express();
const http = require('http');
const { connect } = require('http2');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

server.listen(3000);


app.get('/', function(req,res){
   res.sendFile(__dirname + '/index.html');
});


users = [];

connections = [];

io.sockets.on('connection', function(socket){
   console.log("socket")
   connections.push(socket);
   

   socket.on('disconnect', function(data){
      connections.splice(connections.indexOf(socket), 1);
      console.log('exit')
   })


   socket.on('send mess', function(data){
      io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
   });
});