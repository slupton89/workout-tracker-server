const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  workoutType: { type: String, required: true },
  startedAt: { type: String, required: false },
  distance: {type: String, required: false },
  endedAt: { type: String, required: false },
  comments: { type: String, required: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});


LogSchema.methods.serialize = function() {
  return {
    id: this._id,
  }
}

module.exports = mongoose.model("Log", LogSchema);