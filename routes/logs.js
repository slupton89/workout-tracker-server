const express = require('express');
const mongoose = require('mongoose');

const Log = require('../dbmodels/Log');

const logRouter = express.Router();

// GET all
logRouter.get('/', (req, res, next) => {
  const userId = req.user.id;

  Log.find({userId})
    .sort()
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

// GET by id
logRouter.get('/:id', (req, res, next) => {
  const {id} = req.params;
  const userId = req.user.id;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error(`The 'id' is not valid`);
    err.status = 400;
    return next(err);
  }

  Log.findOne({_id: id, userId})
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
logRouter.post('/', (req, res, next) => {
  console.log(req.user);
  const { workoutType, startedAt, endedAt } = req.body;
  const userId = req.user.id;
  const reqFields = { workoutType };
  // , startedAt, endedAt,
  for (const field in reqFields) {
    if(!reqFields[field]) {
      const err = new Error(`Missing '${field}' in req body`);
      err.status = 400;
      return next(err);
     }
  }

  const newLog = {workoutType, startedAt, endedAt, userId};

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
logRouter.patch('/:id', (req, res, next) => {
  const {id} = req.params;
  const { workoutType, startedAt, endedAt } = req.body;
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  const updateLog = {title};

  Log.findOneAndUpdate({_id:id, userId}, updateLog, {new: true})
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

logRouter.delete('/:id', (req, res, next) => {
  const {id} = req.params;
  const userId = req.user.id;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error(`The 'id' is not valid`);
    err.status = 400;
    return next(err);
  }

  Log.findOneAndRemove({_id:id, userId})
    .then(() => {
      res.status(204).end();
    })
    .catch(err => {
      next(err);
    });
});

module.exports = logRouter;