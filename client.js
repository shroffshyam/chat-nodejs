$(function () {
    var typingTimer;                //timer identifier
    var doneTypingInterval = 1000;  //time in ms, 1second for example
    
    function writeMessage(user, data) {
        // Build our HTML from the associated template.
        var msg = $('.template > li').clone();
        $('span:first-child', msg).html(user + '&nbsp:&nbsp;');
        $('span:last-child', msg).html(data);
        
        $('#conversation > ul').append(msg);
    };
    var socket = io.connect();
    
    // on connection to server, ask for user's name with an anonymous callback
    socket.on('connect', function(){
        // call the server-side function 'adduser' and send one parameter
        socket.emit('adduser', prompt("Enter your nickname?"));
        $('.main').show();
    });
    
    // listener, whenever the server emits 'updatechat', this updates the chat body
    socket.on('updatechat', function (username, data) {
        writeMessage(username, data)
    });
    
    // on error while connecting to server, ask for user's name with an anonymous callback
    socket.on('error', function(err){
       $('body').html($('<p>', { text: 'Sorry, but there\'s some problem with your '
                                    + 'connection or the server is down.' } ));
    });
    
    // listener, when the user disconnect
    socket.once('disconnect', function() {
       $('body').html($('<p>', { text: 'You are disconnected from the server.'} ));
     });
    
    // listener, when the user is typing
    socket.on('typing', function(name) {
        $('.promptTyping').html(name + ' is typing..').show();
    })
    
    // listener, when the user has complete typing
    socket.on('typing_complete', function() {
        $('.promptTyping').hide().html('');
    })
   
    
    // when the client clicks SEND
    $('#datasend').bind('click', function() {
        var message = $('#data').val();
        $('#data').val('');
        // tell server to execute 'sendchat' and send along one parameter
        socket.emit('sendchat', message);
    });

    // when the client hits ENTER on their keyboard
    $('#data').bind('keypress',function(e) {
        if(e.which == 13) {
            $(this).blur();
            $('#datasend').focus().click();
        }
    });
    
    // when the client release any key
    $('#data').bind('keyup',function() {
        typingTimer = setTimeout(function() {
             // tell server to execute 'typing_compete'
             socket.emit('typing_complete');
        } , doneTypingInterval);
    })
    
    // when the client types any key, clear the countdown 
    $('#data').bind('keydown',function(){
        clearTimeout(typingTimer);
        // tell server to execute 'typing'
        socket.emit('typing');
    });
    
});