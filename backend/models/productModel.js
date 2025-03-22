const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  comment: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const productSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Please add an image']
  },
  brand: {
    type: String,
    required: [true, 'Please add a brand']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category'
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    minlength: [10, 'Description must be at least 10 characters']
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    default: 0
  },
  discountPrice: {
    type: Number,
    default: 0
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create index for search
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);