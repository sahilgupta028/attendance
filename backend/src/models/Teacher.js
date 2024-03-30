const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  contact: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.methods.generateToken= async function() {
  try{
    return jwt.sign({
      userId: this._id.toString(),
      name: this.name,
    },
    process.env.JWT_SECRET, {
      expiresIn : "30d",
    })
  }catch(err){
    console.log(err);
  }
}

const Teacher = mongoose.model('Teacher', userSchema);

module.exports = Teacher;