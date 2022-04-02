const { string } = require('joi');
const mongoose = require('mongoose');

const profilePhotoSchema = new mongoose.Schema({
  '_id': String,
  'photoURL': String,
  'location': String
});

const profilePhotoModel = mongoose.model('user', profilePhotoSchema);

module.exports =  profilePhotoModel;