const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        // required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    mobileVerified: {
        type: Boolean,
    },
    emailVerified: {
        type: Boolean,
    },
    role :{
        type : String,
        // enum:["admin","user"],
        default:"admin",
       },
   
    

});

UserSchema.pre("save", async function(next) {
    const Passwordentered = await hashPassword(this.password);
    this.password = Passwordentered;
    next();
});

const hashPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};
module.exports = mongoose.model("User", UserSchema);





