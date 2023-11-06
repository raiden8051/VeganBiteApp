const mongoose = require("mongoose");

const { Schema } = mongoose;

const UpdateAddressModel = new Schema({
  userId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  line1: {
    type: Array,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  postal_code: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
    required: true,
  },
  lng: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user_addresses", UpdateAddressModel);
