const mongoose = require("mongoose");
require("../Models/userSchema");
const User = mongoose.model("UserInfo");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const JWT_SCERT=crypto.randomBytes(32).toString('hex')


module.exports.signup = async (req, res) => {
    const { name, email, password, mobile } = req.body;

    try {
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.send({ data: "User Already exists!!" });
      }

      const encryptedpass=await bcrypt.hash(password,10)
  
      await User.create({ name, email, password:encryptedpass, mobile });
  
      res.send({ status: "ok", data: "User Created Successfully" });
    } catch (error) {
      res.status(500).send({ error: "Internal Server Error" });
    }
};

module.exports.signin = async (req, res) => {
    const { email, password } = req.body;
    const olduser = await User.findOne({ email });

    if (!olduser) {
        return res.status(500).send({ code: 500, message: "User doesn't exist!!" });
    }
    
    const isPasswordValid = await bcrypt.compare(password, olduser.password);
    
    if (isPasswordValid) {
        const token = jwt.sign({ email: olduser.email }, JWT_SCERT);
        return res.status(201).send({ status: "ok", data: token });
    } else {
        return res.status(401).send({ error: "Invalid password" });
    }
};


module.exports.userData = async (req, res) => {
    const { token } = req.body;
    try {
      const user = jwt.verify(token, JWT_SCERT);
      const userEmail = user.email; // Corrected variable name
      
      const userData = await User.findOne({ email: userEmail }); // Using await for asynchronous operation
  
      if (userData) {
        res.send({ status: "ok", data: userData });
      } else {
        res.status(404).send({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).send({ error: "Error fetching user data" });
    }
  };