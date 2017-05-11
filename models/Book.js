/*jshint esversion:6*/
const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
const  bookSchema = new Schema({
  title: String,
  autor: String,
  isbn: String,
  owner: Schema.Types.ObjectId,
  genre: String,
  imagen: String,
  available: Boolean
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});
const User = mongoose.model("User", userSchema);
module.exports = User;
