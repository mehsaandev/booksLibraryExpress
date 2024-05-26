const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  auther: {
    type: String,
    required: true,
  },
  publicationYear: {
    type: String,
    required: true,
  }
});

// export default 
module.exports = mongoose.model('books',userSchema)