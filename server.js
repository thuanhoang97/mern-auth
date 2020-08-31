require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');
const db = require('./db');
const apiRoutes = require('./api/routes');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;

db.connect(DB_URI)
  .then(() => {
    app.use(cors());
    app.use(morgan('tiny'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(passport.initialize());
    require('./config/passport')(passport);    
    app.use('/api', apiRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Can not connect to database!');
    console.log('DB_URI:', DB_URI);
    console.log('Error:', err);
  });
