const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.signup = async(user) => {
    console.log("Auth SignUp  ");
    // const User = new User({ name, email, password, mobile });
    // console.log(user);
    await user.save();
    return user._id;
};

exports.login = async(email, inputPassword) => {
    console.log(" Auth login  ");
    const user = await User.findOne({ email }).select(
   
        "+password"
    );
    console.log("user " + user);
    if (!user) {
        throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(inputPassword, user.password);
    if (!isMatch) {
        throw new Error("Invalid details");
    }
    const token = jwt.sign({ _id: user._id, name: user.name, email: user.email },
        process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1hour",
        }
    );
    console.log("token " + token);

    await User.findOneAndUpdate({ _id: user._id }, { token: token });

    return token;
};

exports.logout = async(id) => {
    console.log("Auth logout ");
    const user = await User.findOne({ _id: id });
    user.token = null;
    await User.findOneAndUpdate({ _id: user._id }, { token: "" });
};

exports.verifyToken = async(token) => {
    console.log(" Auth verifyToken ");
    const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({ _id: payload._id });
    if (!user) {
        throw new Error("User not found ");
    } else if (!user.token || user.token != token) {
        throw new Error("Access Denied. please login");
    }

    console.log("payload " + payload);
    return user;
};

exports.saveOtpToDB = async(otp) => {
    const salt = await bcrypt.genSalt(10);
    otp.otp = await bcrypt.hash(otp.otp, salt);
    await otp.save();
    console.log("OTP saved to DB");
};

