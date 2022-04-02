const multer  = require('multer');
const { cloudinary } = require('../utils/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const uuid = require('uuid').v4;

//this handles the destination and filename for saving the file
const localStorage = multer.diskStorage({

  destination: (req, file, callback) => {
      callback(null, './uploads/');
  },
  
  filename: (req, file, callback) => {
    // console.log(file);
    callback(null, `${ file.id }.${file.extension}`);
  }
});

//saves directly to cloudinary from multer
const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    public_id: (req, file) => (`Topskill/${file.id}`),
    resource_type: 'image'
  },
});

//this checks the uploaded filetype 
const photoFilter = (req, file, callback) => {

  // console.log(file);uuid();
  const id = req.params.id;
  file.id = id;
  let photoExt;

  if(file.mimetype) {
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
  }

  if(!photoExt) {
    //set a validation error on the incoming request
    req.fileValidationError = 'wrong file type, select only images!';
    callback(null, false);
  } else{
    file.extension = photoExt;
    callback(null, true);
  }
};



const uploadLocal = multer({ storage: localStorage, fileFilter: photoFilter });
const uploadCloud = multer({ storage: cloudStorage, fileFilter: photoFilter });

module.exports = { uploadLocal, uploadCloud };