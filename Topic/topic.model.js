const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const { Schema } = mongoose;

const POPULATE_OPTIONS = {
  select: {
    stream: 1,
    download: 1,
    filename: 1,
    uploadDate: 1,
    contentType: 1,
  },
  maxDepth: 1,
};

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
    trim: true,
  },
  resource: [{ type: Schema.Types.Mixed }],
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
