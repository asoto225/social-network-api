const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction.js');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'Thought is Required',
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: 'Username is Required'
    },
    reactions: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Reaction'
        }
      ],
      
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;