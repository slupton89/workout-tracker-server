const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: false },
  height: { type: Number, required: false },
  weight: { type: Number, required: false },
});

UserSchema.methods.serialize = function() {
  return {
    id: this._id,
    userName: this.userName,
    age: this.age,
    height: this.height,
    weight: this.weight,
  }
}

module.exports = mongoose.model("User", UserSchema);