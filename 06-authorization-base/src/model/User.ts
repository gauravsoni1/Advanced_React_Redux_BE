import mongoose, { InferSchemaType } from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
  userEmail: String,
  userPassword: String,
  orgId: String
});

const UserModel = mongoose.model('users', User);

export type User = InferSchemaType<typeof User>

export default UserModel;
