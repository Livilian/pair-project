/*jshint esversion:6*/

const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const  userSchema = new Schema({
  username: String,
  password: String,
  name: String,
  email: String,
  //imagen:  mirar file upload
  libraries:[Schema.Types.ObjectId],
  requests: [{
   user_id: Schema.Types.ObjectId,
   book_id: Schema.Types.ObjectId,
 }],
 lended: [{
  user_id: Schema.Types.ObjectId, // user to lend
  book_id: Schema.Types.ObjectId,
}],

  borrowed: [{
    user_id: Schema.Types.ObjectId,
    book_id: Schema.Types.ObjectId

  }]


}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
