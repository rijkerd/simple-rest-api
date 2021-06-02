const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const { FileTypes } = require('@lykmapipo/file');
const { ObjectId } = require('@lykmapipo/mongoose-common');

const { Schema } = mongoose;

const SCHEMA_OPTIONS = {
  id: true,
  timestamps: true,
  toJSON: { getters: true },
  toObject: { getters: true },
  emitIndexErrors: true,
};

const ShopSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
      },
    },
    // image: FileTypes.Image,
    owner: {
      type: ObjectId,
      ref: 'User',
    },
  },
  SCHEMA_OPTIONS
);

ShopSchema.pre('validate', function onPreValidate(done) {
  return this.preValidate(done);
});

ShopSchema.methods.preValidate = function preValidate(done) {
  this.location.coordinates = [-6.34805, 36.485199];
  return done(null, this);
};

mongoose.plugin(actions);

module.exports = mongoose.model('Shop', ShopSchema);
