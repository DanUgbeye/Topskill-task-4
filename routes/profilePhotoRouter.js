const profilePhotoRouter = require('express').Router();
const multer  = require('multer');
const upload = multer({ dest: '../uploads/' });

const path = require('path');
const fs = require('fs');
const DIR = path.join(__dirname, '../uploads/');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
         cb(null, file.fieldname + '-' + Date.now())
    }
});


const {
  uploadPhotoToLocal,
  deletePhoto,
  uploadPhotoToCloud
} = require('../controllers/profilePhotoHandler');

profilePhotoRouter.route('/photo/:id').post(upload.single('profilePhoto'), uploadPhotoToLocal);
profilePhotoRouter.route('/photo_cloud/:id').post(upload.single('profilePhoto'), uploadPhotoToCloud);
profilePhotoRouter.route('/photo/:id').delete(deletePhoto);

module.exports = { profilePhotoRouter };