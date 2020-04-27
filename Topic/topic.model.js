const isEmpty = require('lodash/isEmpty');
const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const { Schema } = mongoose;

const topicSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  resource: [{ type: Schema.Types.Mixed }],
});

topicSchema.pre('validate', function onPreValidate(done) {
  return this.preValidate(done);
});

topicSchema.methods.preValidate = function preValidate(done) {
  if (isEmpty(this.description)) {
    this.description = this.name;
  }
  return done(null, this);
};

mongoose.plugin(timestamp);
mongoose.plugin(require('mongoose-rest-actions'));

module.exports = mongoose.model('Topics', topicSchema);
