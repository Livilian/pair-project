const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const librarySchema = new Schema({
  name: String,
  user_id: Schema.Types.ObjectId,
  books: [Schema.Types.ObjectId],
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Library = mongoose.model("Library", librarySchema);

module.exports = Library;
