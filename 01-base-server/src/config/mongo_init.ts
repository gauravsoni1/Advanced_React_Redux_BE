import mongoose from 'mongoose';
import config from './config';

const mongoConnection = mongoose
  .connect(config.mongodb.uri)
  .then(() => {
    console.log('MongoDB Connected');
  });

export default mongoConnection;
