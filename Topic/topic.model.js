const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const { FileTypes } = require('@lykmapipo/file');

const { Schema } = mongoose;

const topicSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: [true, 'Name is required'],
    trim: true,
  },
  description: {
    type: String,
    lowercase: true,
    required: [true, 'Description is required'],
    trim: true,
  },
  resource: [
    {
      type: FileTypes.File,
    },
  ],
});

mongoose.plugin(timestamp);
mongoose.plugin(require('mongoose-rest-actions'));

topicSchema.pre('validate', function onPreValidate(done) {
  return this.preValidate(done);
});

topicSchema.methods.preValidate = function preValidate(done) {
  // TODO: ensureRelated or ensureDefaults
  return done(null, this);
};

module.exports = mongoose.model('Topics', topicSchema);
