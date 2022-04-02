const profilePhotoModel = require("../models/profilePhotoModel");
const { cloudinary } = require("../utils/cloudinary");
const fs = require('fs');

//this handles uploading file to localdisk
const uploadPhotoToLocal = async (req, res) => {

  try {
    if(req.fileValidationError) {
      res.status(404).send({ error: req.fileValidationError });
      return;
    }

    const profilePhoto = await profilePhotoModel({
      '_id': req.file.id,
      'photoURL': req.file.path,
      'location': 'local'
    }).save();

    res.send(profilePhoto);
  } catch (error) {
    //if an error occurs, delete the saved file
    fs.unlink(req.file.path, (error) => {
      if(error){
        //if an error occurs when deleting the file
        res.status(404).send({ error: error });
        return;
      }
      res.send({ 'status': 'ok' });
    });
    res.status(404).send({ error: error });
  }

}

//handles deleting a photo from both local and cloud
const deletePhoto = async (req, res) => {

  try {
    //checking if an id param was passed
    const id = req.params.id;
    if(!id) {
      res.status(404).send({ error: 'no id provided!' });
      return;
    }

    //check if file id exists on db
    const resp = await profilePhotoModel.findByIdAndRemove(id);
    if(!resp) {
      res.status(404).send({ error: 'invalid id provided' });
      return;
    }

    //if the file is saved on the cloud
    if(resp.location === 'cloud') {
      // const {resources} = await cloudinary.search.expression(`folder:Topskill AND filename:${id} AND resource_type:image`).execute();
      const result = await cloudinary.uploader.destroy(`Topskill/${id}`);
      // if no result is gotten from cloudinary API
      if(!result) {
        res.status(504).send({ error: 'delete operation failed' });
        return;
      }
      //if a result is gotten
      res.send({...result, message: 'delete photo from cloud successful'});
      return;
    }
    //if the file was saved locally
    else if(resp.location === 'local') {
      // deleting the file
      fs.unlink(resp.photoURL, (error) => {
        if(error){
          //if an error occurs when deleting the file
          res.status(404).send({ error: error });
          return;
        }
        res.send({ status: 'ok', message: 'deleted from local successfully' });
      });
    }

  } catch (error) {
    res.status(404).send({ error: error });
  }
}

//handles uploading to cloudinary
const uploadPhotoToCloud = async (req, res) => {

  try {
    if(req.fileValidationError) {
      res.status(404).send({ error: req.fileValidationError });
      return;
    }

    const profilePhoto = await profilePhotoModel({
      '_id': req.file.id,
      'photoURL': req.file.path,
      'location': 'cloud'
    }).save();

    res.send(profilePhoto);
  
  } catch (error) {
    //delete cloud file if an error occured saving to db
    await cloudinary.uploader.destroy(`Topskill/${req.file.id}`);
    res.status(404).send({ error: error});
  }
}

module.exports = {
  uploadPhotoToLocal,
  deletePhoto,
  uploadPhotoToCloud
}