const User = require("../models/user.model");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const generateJWT = require('../utils/generateJWT')

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { "--v": false,'password':0 });
    res.json({ status: "success", data: { users } });
  } catch (err) {
    res.status(401).json({ errors: err });
  }
};

const register = async (req, res) => {
  const { firstName, lastName, email, password,role} = req.body;

  const oldUser = await User.findOne({email:email});
  if(oldUser){
    return res.status(400).json({error:'User already exists'})
  }
  try {
    //passsword hashing
    const hashedPwd = await bcrypt.hash(password,10)
    const newUser = new User({
      firstName,
      lastName,
      email,
      password:hashedPwd,
      role,
      avatar:req.file.filename
      });
      //generate JWT
      const token = await generateJWT({email:newUser.email,id:newUser._id,role:newUser.role})
      newUser.token = token
    await newUser.save();
    res.json({ status: "sucess", data: { user: newUser} });
  } catch (err) {
    res.status(401).json({ errors: err });
  }
};

const login = async (req,res) => {
  const {email,password} = req.body
  if(!email && !password){
    return res.json({error:'email and password are required!'})
  }
  
  const user = await User.findOne({email:email})
  const matchedPassword = await bcrypt.compare(password,user.password)
  if(!user){
    return res.json({error:'User not found'})
  }
  if(user && matchedPassword){
    const token = await generateJWT({email:user.email,id:user._id,role:user.role})
    return res.json({status:'success',token:token})
  }else{
    return res.status(401).json({status:'fail',message:'Something went wrong'})
  }
};

module.exports = {
  getAllUsers,
  register,
  login,
};
