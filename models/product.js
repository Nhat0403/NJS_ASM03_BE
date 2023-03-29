const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    img1: {String},
    img2: {String},
    img3: {String},
    img4: {String},
    img5: {String},
    long_desc: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    short_desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema);