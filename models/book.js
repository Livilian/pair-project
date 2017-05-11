const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const  bookSchema = new Schema({
  title: String,
  author: String,
  isbn: String,
  owner: [{type: Schema.Types.ObjectId, ref: "User"}],
  genre: String,
  library_id: [{type: Schema.Types.ObjectId, ref: "Library"}],
  imageUrl: {
    type: String,
    default: "https://s-media-cache-ak0.pinimg.com/736x/d5/bb/c2/d5bbc24b4c93d4dc2b8100b30581e477.jpg"
  }
  //available: Boolean
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
