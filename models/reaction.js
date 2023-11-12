const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/helper');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: 'Reaction is Required',
        maxlength: 280
    },
    username: {
        type: String,
        required: 'Username is Required'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    }
},
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = reactionSchema;