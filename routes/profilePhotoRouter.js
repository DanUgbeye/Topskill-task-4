const profilePhotoRouter = require('express').Router();
const {
  uploadPhotoToLocal,
  deletePhoto,
  uploadPhotoToCloud
} = require('../controllers/profilePhotoHandler');

profilePhotoRouter.route('/photo/:id').post(uploadPhotoToLocal);
profilePhotoRouter.route('/photo_cloud/:id').post(uploadPhotoToCloud);
profilePhotoRouter.route('/photo/:id').delete(deletePhoto);

module.exports = { profilePhotoRouter };