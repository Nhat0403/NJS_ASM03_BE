const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    content: [
      {
        is_admin: {
          type: Boolean,
          required: true
        },
        id: {
          type: String,
          required: true
        },
        message: {
          type: String,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('session', sessionSchema);