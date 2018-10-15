const express = require('express');
const mongoose = require('mongoose');

const Log = require('../models/Log');

const LogRouter = express.Router();

// GET all
LogRouter.get('/', (req, res, next) => {
  // const userId = req.user.id;
  Log.find()
    .sort()
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

// GET by id
LogRouter.get('/:id', (req, res, next) => {
  const {id} = req.params;
  // const userId = req.user.id;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error(`The 'id' is not valid`);
    err.status = 400;
    return next(err);
  }

  Log.findOne({_id: id})
    .then(result => {
      if(result) {
        console.log(req.params.id)
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
LogRouter.post('/', (req, res, next) => {
  const { title } = req.body;

  if(!title) {
    const err = new Error(`Missing 'title' in req body`);
    err.status = 400;
    return next(err);
  }

  const newLog = {title};

  Log.create(newLog)
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
LogRouter.patch('/:id', (req, res, next) => {
  const {id} = req.params;
  const {title} = req.body;
  // const userId = req.user.id;

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

  const updateLog = {title};

  Log.findOneAndUpdate({_id:id}, updateLog, {new: true})
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

LogRouter.delete('/:id', (req, res, next) => {
  const {id} = req.params;
  const userId = req.user.id;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error(`The 'id' is not valid`);
    err.status = 400;
    return next(err);
  }

  Log.findOneAndRemove({_id:id})
    .then(() => {
      res.status(204).end();
    })
    .catch(err => {
      next(err);
    });
});

module.exports = LogRouter;