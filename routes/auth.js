const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_EXPIRY } = require('../config');

const authRouter = express.Router();

const localAuth = passport.authenticate('local', {session: false, failWithError: true});

authRouter.post('/login', localAuth, (req, res) => {
  const authToken = createAuthToken(req.username);
  res.json({authToken});
})

const jwtAuth = passport.authenticate('jwt', {session: false, failWithError: true});

authRouter.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
})

function createAuthToken(user) {
  return jwt.sign({user}, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY
  });
}

module.exports = authRouter;