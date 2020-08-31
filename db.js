const mongoose = require('mongoose');

const connect = (dbURI) => {
  console.log('Connecting to database...');
  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };
  return mongoose.connect(dbURI, options).then(() => {
    console.log('Connected.');
  });
};

module.exports = {
  connect,
};
