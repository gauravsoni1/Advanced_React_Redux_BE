import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
  userEmail: String,
  userPassword: String,
});

const UserModel = mongoose.model('users', User);

export default UserModel;
