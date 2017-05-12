/*jshint esversion:6*/

const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const  userSchema = new Schema({
  username: {type:String, required:true},
  password: {type:String, required:true},
  name: String,
  email: String,
  //imagen:  mirar file upload
  libraries:[Schema.Types.ObjectId],
  borrowed: [{type: Schema.Types.ObjectId, ref:'Book'}]
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
