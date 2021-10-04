const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const { ObjectId } = require('@lykmapipo/mongoose-common');
const { FileTypes } = require('@lykmapipo/file');

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
    availability: Boolean,
    photos: [
      {
        type: Schema.Types.ObjectId,
        ref: FileTypes.File.ref,
        autopopulate: true,
      },
    ],
    owner: {
      type: ObjectId,
      ref: 'User',
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
