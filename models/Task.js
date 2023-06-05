const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title:{
        type: String,
        require:true,
    },
    description:{
        type: String,
        require: true,    
    },
    priority:{
        type: String,
        enum:["high","medium","low"],
        default:"medium",
    },
    duedate:{
        type:Date,
        // require:true,
    },
    assignee:{
        type:String,
        require:true,

    },
    createdOn: {
        type: Date,
        default: Date.now(),
        immutable: true,
    },
    status:{
        type:String,
        enum:["todo","inprogress","done"],
        default:"in progress",
    },

});
module.exports = mongoose.model("Task", TaskSchema);