const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, 'Email field required'],
        fake: {
            generator: 'internet',
            type: 'email'
        }
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
        trim: true,
        fake: {
            generator: 'internet',
            type: 'userName'
        }
    },
    profileImage: {
        type: String,
        fake: {
            generator: 'image',
            type: 'avatar'
        }
    }
});

mongoose.plugin(require('@lykmapipo/mongoose-faker'));
userSchema.plugin(timestamp);

module.exports = mongoose.model('User', userSchema);