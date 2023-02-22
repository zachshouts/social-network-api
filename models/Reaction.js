const Schema = require('mongoose').Schema;
const dayjs = require('dayjs');



const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: value => dayjs(value).format('MMM DD, YYYY [at] hh:mm a')
        }
    }
);

module.exports = reactionSchema;