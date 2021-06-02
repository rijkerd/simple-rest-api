const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');

const { Schema } = mongoose;

const SCHEMA_OPTIONS = {
  id: true,
  timestamps: true,
  toJSON: { getters: true },
  toObject: { getters: true },
  emitIndexErrors: true,
};

const MessageSchema = new Schema(
  {
    text: {
      type: String,
      unique: true,
      trim: true,
    },
    time: {
      type: Date,
      default: Date.now(),
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    read: {
      type: Boolean,
      default: false,
    },
    senderId: {
      type: String,
    },
  },
  SCHEMA_OPTIONS
);

MessageSchema.pre('validate', function (done) {
  return this.preValidate(done);
});

MessageSchema.methods.preValidate = function preValidate(done) {
  return done(null, this);
};

mongoose.plugin(actions);

module.exports = mongoose.model('Message', MessageSchema);
