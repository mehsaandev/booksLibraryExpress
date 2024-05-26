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
 const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Books({...post, creator: req.userId, createdAt: new Date()});
  console.log("Adding new post...", newPost);
  newPost
    .save()
    .then(() => {
      console.log("Saved")
      res.json(newPost);
    })
    .catch((error) => {
      console.log(error)
      res.json({ message: error.message });
    });
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

 const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.send("no post with that id");

  const post = await Books.findById(_id);
  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index == -1) {
    // like the post
    post.likes.push(req.userId);
  } else {
    // dislike the post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatePost = await Books.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatePost);
};

module.exports = {getBooks,getPost,getSinglePost,createPost,updatePost,deletePost,likePost}