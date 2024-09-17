const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: String,
  alt: String,
}, {_id: false});

const nameSchema = new mongoose.Schema({
  first: String,
  middle: String,
  last: String,
}, {_id: false});

module.exports = { imageSchema, nameSchema };