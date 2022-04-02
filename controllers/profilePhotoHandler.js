//this handles uploading file to localdisk
const uploadPhotoToLocal = (req, res) => {

  console.log(req.validationError);
  if(req.validationError) {
    res.status(404).send({ error: req.validationError });
    return;
  }
  res.send(req.file);

}

const deletePhoto = (req, res) => {


  res.send('delete photo');
}


const uploadPhotoToCloud = (req, res) => {

  res.send('upload to cloud');
}


module.exports = {
  uploadPhotoToLocal,
  deletePhoto,
  uploadPhotoToCloud
}