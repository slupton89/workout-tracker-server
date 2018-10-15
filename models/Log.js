const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Log", LogSchema);