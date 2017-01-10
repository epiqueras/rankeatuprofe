import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

const adminsSchema = new Schema({
  username: { type: String, required: true, minlength: 15, maxlength: 100 },
  password: { type: String, required: true, minlength: 15, maxlength: 100 },
});

adminsSchema.pre('save', function checkPassword(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  return bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    return bcrypt.hash(user.password, salt, null, (err2, hash) => {
      if (err2) { return next(err2); }
      user.password = hash;
      return next();
    });
  });
});

adminsSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

export default mongoose.model('Admins', adminsSchema);
