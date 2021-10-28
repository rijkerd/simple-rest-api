const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const { ObjectId } = require('@lykmapipo/mongoose-common');
const { FileTypes } = require('@lykmapipo/file');
const faker = require('@lykmapipo/mongoose-faker');

mongoose.plugin(faker);
const { Schema } = mongoose;

const SCHEMA_OPTIONS = {
  id: true,
  timestamps: true,
  toJSON: { getters: true },
  toObject: { getters: true },
  emitIndexErrors: true,
};

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
    },
    description: String,
    quantity: Number,
    price: {
      type: Number,
    },
    photo: {
      type: mongoose.Schema.ObjectId,
      ref: FileTypes.File.ref,
      autopopulate: true,
    },
    available: { type: Boolean, default: false },
    owner: {
      name: { type: String, default: 'iRentals' },
      description: { type: String, default: 'Rent anything' },
      phoneNumber: { type: String, default: '+255657123456' },
      email: { type: String, default: 'hello@studio19.co.tz' },
    },
  },
  SCHEMA_OPTIONS
);

ProductSchema.pre('validate', function (done) {
  return this.preValidate(done);
});

ProductSchema.methods.preValidate = function preValidate(done) {
  return done(null, this);
};

mongoose.plugin(actions);

module.exports = mongoose.model('Product', ProductSchema);
