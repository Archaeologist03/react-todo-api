const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/user');

const jwtSecret = process.env.JWT_SECRET || config.get('jwtSecret');

// POST LOGIN CONTROLLER
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // input validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // check for existing user
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: 'User does not exist' });
  }

  // validate password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ msg: 'Wrong password' });
  }

  try {
    const token = jwt.sign({ id: user.id }, jwtSecret, {
      expiresIn: 3600,
    });
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    res.status(500).json({ msg: 'Server error, token problem.' });
  }
};

// POST SIGNUP CONTROLLER
exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  // input validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // check for existing user
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  const newUser = new User({
    name,
    email,
    password,
  });

  // create salt and hash
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then(user => {
        // setting JWT
        try {
          const token = jwt.sign({ id: user.id }, jwtSecret, {
            expiresIn: 3600,
          });
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        } catch (e) {
          res.status(500).json({ msg: 'Server error, token problem.' });
        }
      });
    });
  });
};
