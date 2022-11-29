const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type : String,
        required : true
    },
    duedate : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    }
});
const task = mongoose.model('Task',TaskSchema);
module.exports = task;
