// require the library
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://127.0.0.1/todolist_db');

//aquire the connection(to check if it is sucessful)
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console,'error connecting to db'));

//up and running then print the message
db.once('open',function(){
    console.log('sucessfully connected to database');
})