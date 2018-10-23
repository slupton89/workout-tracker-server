const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: false },
  height: { type: Number, required: false },
  weight: { type: Number, required: false },
});

UserSchema.statics.hashPassword = function (pwd) {
  return bcrypt.hash(pwd, 10);
}

UserSchema.methods.validatePassword = function (pwd) {
  const currentUser = this;
  return bcrypt.compare(pwd, currentUser.password);
}

//have to call .serialize() after each request?
// UserSchema.methods.serialize = function() {
//   return {
//     id: this._id,
//     username: this.username,
//     age: this.age,
//     height: this.height,
//     weight: this.weight,
//   }
// }

UserSchema.set('toObject', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
    delete result.password;
  }
});

module.exports = mongoose.model("User", UserSchema);