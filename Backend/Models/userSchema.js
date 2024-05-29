const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    mobile: String,

  },{
    collection:"UserInfo"
  }
  );
  
  mongoose.model("UserInfo",userSchema)