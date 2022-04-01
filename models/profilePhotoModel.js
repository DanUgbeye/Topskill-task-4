const { string } = require('joi');
const mongoose = require('mongoose');

const profilePhotoSchema = new mongoose.Schema({
  id: String,
  photo: String
});

const profilePhotoModel = mongoose.Model('user', profilePhotoSchema);

module.exports =  profilePhotoModel;