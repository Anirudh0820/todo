const { response } = require("express");
require("dotenv").config();
const User = require("../models/user");
const Otp = require("../models/otp");
const authService = require("../service/auth_service");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const generateOtp = () => {
  const OTP = otpGenerator.generate(4, {
    number: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  console.log(OTP);
  return OTP;
};


const sendOtpToMobile = async (mobile, OTP) => {
  await client.messages.create({
    body: `here is your OTP: ${OTP} for verification.it will expire in 2 mins `,
    from: process.env.TWILIO_FROM,
    to: `${mobile}`,
  });
  return;
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    const user = new User({ name, email, password, mobile });
    const _id = await authService.signup(user);

    const OTP = generateOtp();  
    await sendOtpToMobile(mobile, OTP); 

    const otp = new Otp({  mobile: mobile, otp: OTP }); 
    await authService.saveOtpToDB(otp);

    res.status(201).json({
      id: _id,
      message:
        "OTP sent on your mobile no . Please Verify"
    });
  } catch (error) {
    console.log("error ", error);
    res.status(400).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password: inputPassword } = req.body;

    const token = await authService.login(email, inputPassword);

    res.status(200).send({ token: token });
  } catch (error) {
    console.log("error ", error);
    res.status(400).send({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    let loggedInUser = req.loggedInUser;

    await authService.logout(loggedInUser._id);
    res.status(200).send({ message: "Logged out " });
  } catch (error) {
    console.log("error ", error);
    res.status(400).send({ message: error.message });
  }
};

exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader)
      throw new Error({ message: "Access Denied. Please send Token" });

    const token = authHeader.split(" ")[1];
    if (!token)
      throw new Error({ message: "Access Denied. Please send Token" });
    console.log("token " + token);

    const user = await authService.verifyToken(token);
    req.loggedInUser = user;
    next();
  } catch (error) {
    console.log("error in user post ", error);
    res.status(400).send({ message: error.message });
  }
};

exports.verifyOtpByMobile = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    const otpHolder = await Otp.findOne({ mobile });
    if (!otpHolder) {
      return res.status(400).json({ message: "OTP not found" });
    }

    const isOtpValid = await bcrypt.compare(otp, otpHolder.otp);
    if (!isOtpValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    await User.updateOne({ mobile: mobile }, { mobileVerified: true });
    const userInDB = await User.findOne({ mobile: mobile });
    if (userInDB.emailVerified == true) await Otp.deleteOne({ mobile: mobile });

    return res.status(200).json({
      message: "Mobile number verified successfully",
    });
  } catch (error) {
    console.log("Error in verifying OTP ", error);
    res.status(400).send({ message: error.message });
  }
};

