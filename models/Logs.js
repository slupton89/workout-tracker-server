const mongoose = require("mongoose");

const LogSchema = mongoose.Schema({
  title: { type: String, required: true },
  //workoutType
  //startedAt
  //endedAt
  //comments\notes
  //userId
});

LogSchema.methods.serialize = function() {
  return {
    id: this._id,
  }
}

const Log = mongoose.model("Log", LogSchema);

module.exports = {Log};