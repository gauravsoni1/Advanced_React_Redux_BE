import mongoose, { InferSchemaType } from 'mongoose';
import { Roles } from '../const/permissions';

const Schema = mongoose.Schema;

const User = new Schema({
  userEmail: String,
  userPassword: String,
  orgId: String,
  role: {type: String, enum: Roles}
});

const UserModel = mongoose.model('users', User);

export type User = InferSchemaType<typeof User>

export default UserModel;
