const mongoose = require("mongoose");
const Task = require("../models/task");
const { findOneAndDelete } = require("../models/user");
const User = require("../models/user");

exports.createTask = async (task) => {
  const result = await task.save();
  return result._id;
};

exports.getAllTasks = async () => {
    const tasks = await Task.find();
    if (!tasks) throw new Error("Tasks not found");
    return tasks;
  };

exports.getTask = async (id) => {
  const task = await Task.findById(id);
  if (!task) throw new Error("Task not found");
  return task;
};

exports.deleteTask = async (id) => {
  const res = await Task.findOneAndDelete({ _id: id });
  return res;
};

exports.assignTask = async (id, assigneeEmail) => {
  const task = await Task.findById(id);
  if (!task) throw new Error("Task not found");
  const assignee = await User.findOne({ email: assigneeEmail });
  console.log(assignee._id);
  if (!assignee) throw new Error("USer not found");
  console.log(task.assignee);
  const newTask = await Task.findOneAndUpdate(
    { _id: id },
    { assignee: assignee._id },
    { new: true }
  );
  newTask.save();
  console.log(task.assignee);
  return newTask;
};


exports.changeStatus = async (id,user,status)=>{
    const task = await Task.findById(id);
    if(!task) throw new Error("Task not found");
}