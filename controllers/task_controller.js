const mongoose = require("mongoose");
const User = require("../models/user");
const Task = require("../models/task");
const taskService = require("../service/task_service");
const userService = require("../service/admin_service");
const nodemailer = require("nodemailer");
require("dotenv").config();
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, createdBy, assignee } =
      req.body;
    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      createdBy,
      assignee,
    });

    const _id = await taskService.createTask(task);
    res.status(201).json({
      _id: _id,
      message: "Task created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).send(tasks);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await taskService.getTask(id);
    res.status(200).send(task);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.loggedInUser;
    console.log(user._id);
    const task = await taskService.getTask(id);
    console.log(task.createdBy);
    if (user._id.toString() != task.createdBy.toString()) {
      throw new Error("User not authorized");
    }
    const result = await taskService.deleteTask(id);
    res.status(200).json({
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.assignTask = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.loggedInUser;
    const { assigneeEmail } = req.body;
    const task = await taskService.getTask(id);
    console.log(assigneeEmail);
    const result = await taskService.assignTask(id, assigneeEmail);


    // exports.loginWithPhoneOtp = async (req, res, next) => {
    //     try {
      
    //       const { phone } = req.body;
    //       const user = await User.findOne({ phone });
      
    //       if (!user) {
    //         next({ status: 400, message: PHONE_NOT_FOUND_ERR });
    //         return;
    //       }
      
    //       res.status(201).json({
    //         type: "success",
    //         message: "OTP sended to your registered phone number",
    //         data: {
    //           userId: user._id,
    //         },
    //       });
      
        //   // generate otp
        //   const otp = generateOTP(6);
        //   // save otp to user collection
        //   user.phoneOtp = otp;
        // //   user.isAccountVerified = true;
        //   await user.save();
        //   // send otp to phone number
        //   await fast2sms(
        //     {
        //       message: `Your OTP is ${otp}`,
        //       contactNumber: user.phone,
        //     },
        //     next
        //   );
       
    
      

    //sending notification via email to assignee about task assignmnent
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.AUTH_EMAIL,
    //     pass: process.env.AUTH_PASS,
    //   },
    // });

    // await transporter.sendMail({
    //   from: `"Message from TodoManager" <process.env.AUTH_EMAIL>`, 
    //   to: assigneeEmail,
    //   subject: "Task Assignment", 
    //   html: `<b>You are assigned a task with ${id} taskId</b>`,
    // });

    res.status(200).json({
      message: "Task assigned successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};


// exports.changeStatus = async(req, res) => {
//   try {
//     const id = req.params.id;
//     const user = req.loggedInUser;
//     const status = req.body.status;
//     const result =  await taskService.changeStatus(id,user,status);
//     res.status(200).json({
//         message: "Task Status changed successfully"
//     })
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// };


exports.changeStatus = async (req, res) => {
    try {
      const availableStatus = ["ToDo", "In Progress", "Done"];
      const id = req.params.id;
      const task = await taskService.getTask(id);
      const user = req.loggedInUser;
      if(task.assignee.toString() != user._id.toString() ) throw new Error("User not authorized to change status");
      const status = req.body.status;
      if (!availableStatus.includes(status)) throw new Error("Invalid Status");
      const result = await taskService.changeStatus(id, status);
      res.status(200).json({
        message: "Task Status changed successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: error.message,
      });
    }
  };