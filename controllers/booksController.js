const mongoose = require("mongoose")
const Books = require("../models/books")

const getBooks = async (req, res) => {
  try {
    console.log("Getting all books...");
    const books = await Books.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

 const getPost = async (req, res) => {
  try {
    const {id} =  req.params;
    console.log(id)
    const postMessage = await Books.findById(id);
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
 const getSinglePost = async (req, res) => {
  try {
    const post = req.body
    const postMessage = await Books.findOne({_id: post._id });
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

 const createBook = async (req, res) => {
  console.log("Creating new Book...")
  console.log(req.body)
  const book = req.body;
  const newBook = new Books(book);
  // console.log("Adding new Book...", newBook);
  newBook
    .save()
    .then(() => {
      console.log("Saved")
      res.json(newBook);
    })
    .catch((error) => {
      // console.log(error)
      res.json({ message: error.message });
    });
};

 const bulkCreateBook = async (req, res) => {
  console.log("Creating new Book...")
  console.log(req.body)
  const booksBag = req.body?.booksBag;
  // const newBook = new Books(book);
  // console.log("Adding new Book...", newBook);

  Books.collection.insert(booksBag,(err,docs) => {
    if(err){
      // console.log(error)
      res.json({ message: error.message });
    }
    else{

      console.log("Saved")
      res.json(newBook);
    }
  })
  
};

 const updatePost = async (req, res) => {
  console.log(req.params);
  const { id: _id } = req.params;
  console.log(_id);
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.send("no post with that id");

  const updatePost = await Books.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatePost);
};

 const deletePost = async (req, res) => {
  console.log(req.params);
  const { id: _id } = req.params;
  console.log(_id);
  // const post = req.body
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.send("no post with that id");

  const removePost = await Books.findOneAndRemove({ _id: _id });
  res.json(removePost);
};



 const addToFaviorite = async (req, res) => {
  console.log("Hello")
  const { id: _id } = req.params;
  const userId = req.headers.authorization

  if (!userId) return res.json({ message: "Unauthenticated" });

  console.log(_id)
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(200).json("no post with that id");

  const post = await Books.findById(_id);
  const index = post.favorites.findIndex((id) => id === String(userId));

  if (index == -1) {
    // like the post
    post.favorites.push(userId);
  } else {
    // dislike the post
    post.favorites = post.favorites.filter((id) => id !== String(userId));
  }

  const updatePost = await Books.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.status(200).json({response:"Added to Favorites", result:updatePost});
};

module.exports = {getBooks,getPost,getSinglePost,createBook,bulkCreateBook,updatePost,deletePost,addToFaviorite}