import mongoose from 'mongoose';
import config from './config';

const mongoConnection = mongoose
  .connect(
    `mongodb+srv://${config.mongodb.username}:${config.mongodb.password}@cluster0.m14xlop.mongodb.net/${config.mongodb.db}`,
  )
  .then(() => {
    console.log('MongoDB Connected');
  });

export default mongoConnection;
