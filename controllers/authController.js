const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const User = require("../models/user.js")

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {

    if (email === "admin" && password === "admin") {

      const token = jwt.sign(
        { email: 'admin', id: 'admin' },
        "test",
        { expiresIn: "1h" }
      );
      
      res.status(200).json({
        result: {
          id: 'admin',
          firstName: 'Admin',
          lastName: '',
          email: 'admin'
        }, token, type: 'admin'
      });
    }
    else {


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
      res.status(200).json({
        result: {
          id: existingUser?._id,
          firstName: existingUser?.firstName,
          lastName: existingUser?.lastName,
          email: existingUser?.email,
          favorites: existingUser?.favorites,
        }, token, type: 'user'
      });

    }
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong." });
  }
};




const signUp = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  console.log(firstName + " : " + lastName + " : " + email + " : " + password)
  try {
    const existingUser = await User.findOne({ email });
    console.log(existingUser)
    if (existingUser)
      return res.status(200).json({ message: "User already exists." });
    console.log(password)
    console.log(confirmPassword)
    if (password !== confirmPassword)
      return res.status(200).json({ message: "Password doesn't match." });

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


    res.status(200).json({
      result: {
        id: existingUser?._id,
        firstName: result?.firstName,
        lastName: result?.lastName,
        email: result?.email,
        favorites: result?.favorites,
      }, token
    });


  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Something Went Wrong." });
  }
};


module.exports = { signIn, signUp }