const mongoose = require('mongoose');
const User = require('../models/user');

exports.getUserById =async (id)=>{
    const user = await User.findById(id);
    return user; 
}

exports.getAllUser = async ()=>{
    const users = await User.find();
    return users;
}

