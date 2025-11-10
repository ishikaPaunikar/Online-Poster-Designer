const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  const hadEnvMongoURI = !!process.env.MONGO_URI;
  
  try {
    let mongoURI = process.env.MONGO_URI;

    // If MONGO_URI exists but does not look like a valid mongodb URI, ignore it and fall back
    if (mongoURI && !mongoURI.startsWith('mongodb')) {
      console.warn('MONGO_URI environment variable is set but does not look like a valid MongoDB URI. Falling back to in-memory MongoDB for local development.');
      mongoURI = undefined;
    }

    // If no MONGO_URI is provided, start an in-memory MongoDB for local/dev runs
    if (!mongoURI) {
      const mongod = await MongoMemoryServer.create();
      mongoURI = mongod.getUri();
      console.log('No MONGO_URI provided — started in-memory MongoDB instance');
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    // If the user provided an invalid MONGO_URI, fall back to an in-memory DB for local dev
    if (hadEnvMongoURI) {
      try {
        console.warn('Falling back to in-memory MongoDB because the provided MONGO_URI failed to connect.');
        const mongod = await MongoMemoryServer.create();
        const fallbackUri = mongod.getUri();
        const conn = await mongoose.connect(fallbackUri);
        console.log(`MongoDB Connected (in-memory): ${conn.connection.host}`);
        return;
      } catch (memErr) {
        console.error('In-memory MongoDB failed to start:', memErr.message);
        throw memErr;
      }
    }

    throw error;
  }
};

module.exports = connectDB;