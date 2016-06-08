// try deploying the code in openshift cloud
var PORT = process.env.OPENSHIFT_INTERNAL_PORT || 8490;
var IPADDRESS = process.env.OPENSHIFT_INTERNAL_IP || '127.0.0.1';

var express = require('express');
var app = express.createServer()
var io = require('socket.io').listen(app);

// The client path is for client specific code.
app.use(express.static(__dirname + '/'));

// routing to client html
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

//app.listen(8667);
app.listen(PORT, IPADDRESS);


// usernames which are currently connected to the chat
var usernames = {};

io.sockets.on('connection', function (socket) {
    
    // handle user typing 
    socket.on('typing', function (data) {
        //we tell the client the {some user} is typing
        io.sockets.emit('typing', socket.username);
    });
    
    // handle user typing finish
    socket.on('typing_complete', function () {
        //we tell the client the to clear typing message
        io.sockets.emit('typing_complete');
    });
    
    // handle user chats message
    socket.on('sendchat', function (data) {
        // we tell the client to execute 'updatechat' with 2 parameters
        io.sockets.emit('updatechat', socket.username, data);
    });

    // handle adding of user
    socket.on('adduser', function(username){
        // we store the username in the socket session for this client
        socket.username = username;
        // add the client's username to the global list
        usernames[username] = username;
        // echo to client they've connected
        socket.emit('updatechat', 'SERVER', 'you have connected');
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
    });

    // handle disconnectinf of user
    socket.on('disconnect', function(){
        // remove the username from global usernames list
        delete usernames[socket.username];
        // echo globally that this client has left
        socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    });
});