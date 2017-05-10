const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const  bookSchema = new Schema({
  title: String,
  author: String,
  isbn: String,
  owner: [{type: Schema.Types.ObjectId, ref: "User"}],
  genre: String,
  library_id: [{type: Schema.Types.ObjectId, ref: "Library"}]
  //imagen: String,
  //available: Boolean
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
