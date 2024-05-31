const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//jwt registeration
module.exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json('User registered successfully');
  } catch (error) {
    res.status(500).json(error.message);
  }
}
 add new method
//jwt login
module.exports.jwtlogin = async (req, res) => {
     try {
    const { email, password } = req.body;
    const user = await User.where({ email }).fetch();

    if (!user) {
      return res.status(401).json('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.get('password'));

    if (!isPasswordValid) {
      return res.status(401).json('Invalid credentials');
    }
    // jwt token
    const token = jwt.sign({ userId: user._id },  process.env.JWT_SECRET, { expiresIn: '1h' });
     res
      .cookie("accessToken", token, {
        sameSite: "none",
        secure: true,
        expiresIn: "10d",
      })
      .status(200)
      .send("Logged in successfully");
  }
  catch (error) {
    res.status(500).json(error.message);
  }
}
