const express = require('express');
const mongoose = require('mongoose');

const User = require('../models/User');

const UserRouter = express.Router();

// GET all
UserRouter.get('/', (req, res, next) => {
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
UserRouter.get('/:id', (req, res, next) => {
  const {id} = req.params;
  const userId = req.user.id;

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
UserRouter.post('/', (req, res, next) => {
  const { userName, fullName, email, height, weight, age } = req.body;

  if(!title) {
    const err = new Error(`Missing 'title' in req body`);
    err.status = 400;
    return next(err);
  }

  const newUser = {userName, fullName, email, height, weight, age};

  User.create(newUser)
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
UserRouter.patch('/:id', (req, res, next) => {
  const {id} = req.params;
  const {userName, fullName, email, height, weight, age} = req.body;
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  if (!title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  const updateUser = {userName, fullName, email, height, weight, age};

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

UserRouter.delete('/:id', (req, res, next) => {
  const {id} = req.params;
  const userId = req.user.id;

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

module.exports = UserRouter;