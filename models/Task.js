const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title:{
        type: String,
        require:true,
        unique:true,
    },
    description:{
        type: String,
        require: true,    
    },
    priority:{
        type: String,
        enum:["high","medium","low"],
        default:"medium",
        require:true,
    },
    duedate:{
        type:Date,
        require:true,
    },
    assignee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,

    },
    createdOn: {
        type: Date,
        default: Date.now(),
        immutable: true,
    },
    status:{
        type:String,
        // enum:["todo","In Progress","done"],
        default:"ToDo",
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

});
module.exports = mongoose.model("Task", TaskSchema);