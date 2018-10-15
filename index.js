'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');

const LogRouter = require('./routes/LogRoute');
const UserRouter = require('./routes/UserRoute');
const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

// allow cross origin requests
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

// Parse req body
app.use(express.json());

// mount routers
app.use('/api/logs', LogRouter);
app.use('/api/users', UserRouter);

// 404 handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404;
  return next(err);
})

// custom error handler
app.use(function (err, req, res, next) {
  if(err.status) {
    const errBody = Object.assign({}, err, {message: err.message});
    res.status(err.status).json(errBody);
  } else {
    res.status(500).json({message: 'Internal Server Error'});
    if(err.name !== 'FakeError') {
      console.log(err);
    }
  }
})

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
