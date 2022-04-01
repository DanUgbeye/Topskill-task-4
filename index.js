require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const cloudinary = require('cloudinary');
const { profilePhotoRouter } = require('./routes/profilePhotoRouter');
const {dbConnection} = require('./database');



const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('combined'))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/profile', profilePhotoRouter);

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const conn = dbConnection();

conn
.then( () => {
  app.listen(process.env.PORT, () => {
    console.log(`app started on port ${process.env.PORT}`);
  });
}).catch((err) => {
  console.log(err);
});
