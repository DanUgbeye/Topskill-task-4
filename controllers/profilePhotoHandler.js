const fs = require('fs');
const uuid = require('uuid').v4;

const uploadPhotoToLocal = (req, res) => {
  // console.log(req);
  res.send('save to local ');
//   const id = req.params.id;
//   const { file } = req.body;
//   if(!id) id = uuid();

//   if(!file) res.status(504).send('Select a file!');

//   const photoPath = fs.readFileSync(req.file.path);
//   const encodedPhoto = photoPath.toString('base64');
//   const finalPhoto = {
//     contentType:req.file.mimetype,
//     image:new Buffer(encodedPhoto,'base64')
// };

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