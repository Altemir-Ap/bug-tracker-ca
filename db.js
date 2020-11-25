const uri = process.env.MONGO_URI;
const MongoClient = require('mongodb').MongoClient;
const MONGO_OPTIONS = { useUnifiedTopology: true, useNewUrlParser: true };
const DB_NAME = 'cbwa';
module.exports = () => {
  const get = (collectionName, query = {}) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        if (err) {
          console.log(err);
          return reject('----  Connection failed -----');
        }
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        collection.find(query).toArray((err, docs) => {
          if (err) {
            console.log(err);
            return reject('---- Fail in the find function -----');
          }
          resolve(docs);
          client.close();
        });
      });
    });
  };

  const add = (collectionName, item) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        if (err) {
          console.log(err);
          return reject('---- Connection failed -----');
        }
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        collection.insertOne(item, (err, result) => {
          if (err) {
            console.log(err);
            return reject('---- Fail in the function add -----');
          }
          resolve(result);
          client.close();
        });
      });
    });
  };

  const count = (collectionName) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        if (err) {
          console.log(err);
          return reject('---- Connection failed -----');
        }
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        collection.countDocuments({}, (err, result) => {
          if (err) {
            console.log(err);
            return reject('---- Count function has failed -----');
          }
          resolve(result);
          client.close();
        });
      });
    });
  };
  const aggregate = (collectionName, pipeline = []) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        if (err) {
          console.log(err);
          return reject('---- Connection failed -----');
        }
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        collection.aggregate(pipeline).toArray((err, docs) => {
          if (err) {
            console.log(err);
            return reject('---- aggregate function has failed -----');
          }
          resolve(docs);
          client.close();
        });
      });
    });
  };
  const update = (collectionName, pipeline = []) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        if (err) {
          console.log(err);
          return reject('---- Connection failed -----');
        }
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);

        collection.updateOne(pipeline[0], pipeline[1], (err, result) => {
          if (err) {
            console.log(err);
            return reject('---- Update function has failed -----');
          }
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
    aggregate,
    update,
  };
};
