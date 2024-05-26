const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const User = require("../models/user.js")

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials." });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: {
      firstName: existingUser?.firstName,
      lastName: existingUser?.lastName,
      email: existingUser?.email,
      favorites: existingUser?.favorites,
    }, token });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong." });
  }
};




const signUp = async (req, res) => {
  const { firstName, lastName, email, password,  confirmPassword    } = req.body;

  console.log(firstName +" : "+ lastName +" : "+ email +" : "+ password )
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
    return res.send({ message: "User already exists." });
    if (password !== confirmPassword)
    return res.send({ message: "Password doesn't match." });
    
  console.log("Hello")
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
    console.log(result)

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result:{
      firstName: result?.firstName,
      lastName: result?.lastName,
      email: result?.email,
      favorites: result?.favorites,
    }, token });
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong." });
  }
};


module.exports = {signIn,signUp}