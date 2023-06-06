const mongoose = require('mongoose');
const User = require('../models/user');


const addUserToDB = async (user)=>{
        await user.save();
        console.log(user);
}

const getUserfromDB = async()=>{
        return await User.find();
}

module.exports ={addUserToDB,getUserfromDB};

