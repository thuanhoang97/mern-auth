const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');
const {
  validateRegister,
  validateLogin,
} = require('../../validations/auth.validation');

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      } else {
        bcrypt.hash(password, salt, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      }
    });
  });
};

router.post('/register', async (req, res) => {
  const { errors, isValid } = validateRegister(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { firstName, lastName, username, password } = req.body;

  const user = await User.findOne({ username });
  if (user) {
    return res.status(400).json({ username: 'Username is already exists.' });
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await User.create({
    firstName,
    lastName,
    username,
    password: hashedPassword,
  });

  res.status(201).json(newUser);
});

router.post('/login', async (req, res) => {
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ username: 'Username not found.' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ password: 'Password incorrect.' });
  }

  const payload = {
    id: user._id,
    name: user.name,
  };
  jwt.sign(
    payload,
    process.env.SECRETORKEY,
    {
      expiresIn: 31556926,
    },
    (err, token) => {
      res.json({ success: true, token: `Bearer ${token}` });
    }
  );
});

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { firstName, lastName, username, _id } = req.user;
    res.json({
      firstName,
      lastName,
      username,
      _id,
    });
  }
);

module.exports = router;
