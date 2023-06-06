const mongoose = require('mongoose');
const User = require('../models/user');
const UserService = require('../service/user_service');

const createUser = async(req,res) =>{
    try {
        const {name, email, password } = req.body
        const user = new User({name,email,password});
        await UserService.addUserTodb(user);
        res.status(201).json({
            message: "User Created"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message
        })
    }
}


const getUser = async(req,res)=>{
    try {
        const result = await UserService.getUserfromdb();
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:error.message
        })
    }
}

module.exports = {createUser,getUser};
