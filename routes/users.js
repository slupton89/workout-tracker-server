const express = require('express');
const mongoose = require('mongoose');
const User = require('../dbmodels/User');
const userRouter = express.Router();

// GET all
userRouter.get('/', (req, res, next) => {
  // const userId = req.user.id;

  User.find()
    .sort()
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

// GET by id
userRouter.get('/:id', (req, res, next) => {
  const {id} = req.params;
  // const userId = req.user.id;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error(`The 'id' is not valid`);
    err.status = 400;
    return next(err);
  }

  User.findOne({_id: id})
    .then(result => {
      if(result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

// POST item
userRouter.post('/', (req, res, next) => {
  const { username, password, fullName, email, height, weight, age } = req.body;

  const reqFields = {username, password, fullName, email};

  for (const field in reqFields) {
    if(!reqFields[field]) {
      const err = new Error(`Missing '${field}' in req body`);
      err.status = 400;
      return next(err);
     }
  }

  User.hashPassword(password)
    .then(digest => {
      return User
        .create({
          username,
          password: digest,
          fullName, email, height, weight, age
        })
    })
    .then(result => {
      res.location(`${req.originalUrl}/${result.id}`)
        .status(201)
        .json(result);
    })
    .catch(err => {
      next(err);
    });
});

// UPDATE item
userRouter.patch('/:id', (req, res, next) => {
  const {id} = req.params;
  const {username, password, fullName, email, height, weight, age} = req.body;
  // const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  const updateUser = {username, password, fullName, email, height, weight, age};

  const reqFields = {username, password, fullName, email};

  for (const field in reqFields) {
    if(!reqFields[field]) {
      const err = new Error(`Missing '${field}' in req body`);
      err.status = 400;
      return next(err);
     }
  }

  User.findOneAndUpdate({_id:id}, updateUser, {new: true})
    .then(result => {
      if(result) {
        res.json(result)
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

// DELETE item

userRouter.delete('/:id', (req, res, next) => {
  const {id} = req.params;
  // const userId = req.user.id;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error(`The 'id' is not valid`);
    err.status = 400;
    return next(err);
  }

  User.findOneAndRemove({_id:id})
    .then(() => {
      res.status(204).end();
    })
    .catch(err => {
      next(err);
    });
});

module.exports = userRouter;