const profilePhotoRouter = require('express').Router();
const uuid = require('uuid').v4;
const multer  = require('multer');
const path = require('path');
const fs = require('fs');

//this handles the destination and filename for saving the file
const storage = multer.diskStorage({

    destination: (req, file, callback) => {
        callback(null, './uploads/');
    },
    
    filename: (req, file, callback) => {
      const id = (req.params.id ? req.params.id : uuid());
      file.id = id;
      
      // console.log(file);
      callback(null, `${ id }.${file.extension}`);
    }
});

//this checks the uploaded filetype 
const photoFilter = (req, file, callback) => {
  let photoExt;
  
  //checking the file extension to append the appropriate one to filename
  switch(file.mimetype) {
    case 'image/png':
      photoExt = 'png';
      break;
    case 'image/jpg':
      photoExt = 'jpg';
      break;
    case 'image/gif':
      photoExt = 'gif';
      break;
    case 'image/jpeg':
      photoExt = 'jpeg';
      break;
    default :
    photoExt = null;
  }

  console.log('checked file type ', photoExt);

  if(!photoExt) {
    //set a validation error on the incoming request
    req.validationError = 'wrong file type, select only images!';
    callback(null, false);
  } else{
    file.extension = photoExt;
    callback(null, true);
  }
};

const upload = multer({ storage: storage, fileFilter: photoFilter });

const {
  uploadPhotoToLocal,
  deletePhoto,
  uploadPhotoToCloud
} = require('../controllers/profilePhotoHandler');

profilePhotoRouter.route('/photo/:id').post(upload.single('profilePhoto'), uploadPhotoToLocal);
profilePhotoRouter.route('/photo_cloud/:id').post(upload.single('profilePhoto'), uploadPhotoToCloud);
profilePhotoRouter.route('/photo/:id').delete(deletePhoto);

module.exports = { profilePhotoRouter };