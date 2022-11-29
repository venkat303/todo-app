const express = require('express');
const { rmSync } = require('fs');
const path = require('path');
const port = 8000;


const db = require('./config/mongoose');
const Task = require('./models/tasks'); //Getting the database elements from models folder
const app = express();


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.post('/create-task',function(req,res){ //Creating a pos request to add a task into te database
    console.log(req.body);
    Task.create({
        title:req.body.title,
        duedate:req.body.duedate,
        category:req.body.category
    },function(err,newTask){
        if(err){
            console.log('error in creating a task!');
            return;
        }
        return res.redirect('back');
    })
});

app.post('/delete-task',function(req,res){ //Creating  a post requeste to delete the tasks which are checked
    del_id = req.query.id;
    console.log(del_id)
    split_del_id = del_id.split(',');
    for(let i=0;i<split_del_id.length;i++){
        Task.findByIdAndDelete(split_del_id[i],function(err){
            if(err){
                console.log('error in deleting tasks');
                return;
            }
        })
    }
    return res.redirect('back');
})

app.get('/',function(req,res){ //This function will load the main page in which we can add and delte task
    Task.find({},function(err,tasks){
        if(err){
            console.log('error in fetching tasks from db');
            return;
        }

        return res.render('home',{
            title:"TODO List",
            task_list:tasks // Sending the tasks to the html page which render them on the web browser
        });
    })
});

app.listen(port,function(err){ // This function will let uus know whether the connection is sucessfull or not
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on the port: ${port}`);
})