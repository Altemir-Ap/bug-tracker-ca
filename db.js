const uri = process.env.MONGO_URI;
const MongoClient = require('mongodb').MongoClient;
const MONGO_OPTIONS = { useUnifiedTopology: true, useNewUrlParser: true };
const DB_NAME = 'cbwa';
module.exports = () => {
  const get = (collectionName, query = {}) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        collection.find(query).toArray((err, docs) => {
          resolve(docs);
          client.close();
        });
      });
    });
  };

  const add = (collectionName, item) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        collection.insertOne(item, (err, result) => {
          resolve(result);
          client.close();
        });
      });
    });
  };

  const count = (collectionName) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        collection.countDocuments({}, (err, result) => {
          resolve(result);
          client.close();
        });
      });
    });
  };
  return {
    get,
    add,
    count,
  };
};
