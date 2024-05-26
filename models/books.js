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
  image:{
    type: String,
  },
  genre: {
    type: String,
    required: true,
  },
  publication_year: {
    type: String,
    required: true,
  },
  favorites: {
    type: [String],
    default: [],
  },
  
});

// export default 
module.exports = mongoose.model('books',userSchema)