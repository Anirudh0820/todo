const mongoose = require('mongoose');
const User = require('../models/user');
const UserService = require('../service/admin_service');

exports.getAllUser = async(req,res)=>{
    try {
        if(req.loggedInUser.role == "Admin") throw new Error("User not authorized to get all users details"); 
        const users = await UserService.getAllUser();
        res.status(200).send(users);     
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:error.message
        })
    }
     
}
exports.getUserById = async (req,res)=>{
    try {
        if(req.loggedInUser.role == "Admin") throw new Error("User not authorized to get all users details");
        const id = req.params.id;
        const user = await UserService.getUserById(id);
        res.status(200).send(user);   
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:error.message
        })
    }
    

}

exports.deleteUserById = async (req,res)=>{
    try {
        const id = req.params.id;
        const user = await UserService.getUserById(id);
        const result = await UserService.deleteUserById(id);
        res.status(200).json({
          message: "User had become Inactive",
        });
      } catch (error) {
        logger.error(error);
        res.status(400).json({
          message: error.message,
        });
      }
    };

