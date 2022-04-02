require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const { profilePhotoRouter } = require('./routes/profilePhotoRouter');
const { dbConnection } = require('./utils/database');

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('combined'))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/profile', profilePhotoRouter);

const conn = dbConnection();

// const uuid = require('uuid').v4;
// console.log(uuid());

conn
.then( () => {
  app.listen(process.env.PORT, () => {
    console.log(`app started on port ${process.env.PORT}`);
  });
}).catch((err) => {
  console.log(err);
});
