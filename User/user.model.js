const mongoose = require('mongoose');
const irina = require('irina');
const actions = require('mongoose-rest-actions');

const { Schema, model } = mongoose;

const SCHEMA_OPTIONS = {
  id: false,
  timestamps: false,
  toJSON: { getters: true },
  toObject: { getters: true },
  emitIndexErrors: true,
};

const UserSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, 'Email field required'],
      fake: {
        generator: 'internet',
        type: 'email',
      },
    },

    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
      trim: true,
      fake: {
        generator: 'internet',
        type: 'userName',
      },
    },

    profileImage: {
      type: String,
      fake: {
        generator: 'image',
        type: 'avatar',
      },
    },

    password: {
      type: String,
      unique: true,
      required: [true, 'Please Provide a password'],
    },
  },
  SCHEMA_OPTIONS
);

UserSchema.pre('validate', function (done) {
  return this.preValidate(done);
});

UserSchema.methods.preValidate = function preValidate(done) {
  // continue
  return done(null, this);
};

UserSchema.plugin(actions);
UserSchema.plugin(irina, {
  registerable: {
    autoConfirm: true,
  },
});

module.exports = exports = model('User', UserSchema);
