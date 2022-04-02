const profilePhotoRouter = require('express').Router();
const { uploadCloud, uploadLocal }  = require('../utils/multer');

const {
  uploadPhotoToLocal,
  deletePhoto,
  uploadPhotoToCloud
} = require('../controllers/profilePhotoHandler');

profilePhotoRouter.route('/photo/:id').post(uploadLocal.single('profilePhoto'), uploadPhotoToLocal);
profilePhotoRouter.route('/photo_cloud/:id').post(uploadCloud.single('profilePhoto'), uploadPhotoToCloud);
profilePhotoRouter.route('/photo/:id').delete(deletePhoto);

module.exports = { profilePhotoRouter };