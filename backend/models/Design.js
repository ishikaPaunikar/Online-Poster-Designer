const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Design title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  thumbnail: {
    type: String,
    default: ''
  },
  designData: {
    type: Object,
    required: true,
    // Stores canvas elements, text, images, shapes, colors, etc.
  },
  category: {
    type: String,
    enum: ['poster', 'flyer', 'invitation', 'announcement', 'other'],
    default: 'poster'
  },
  dimensions: {
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 1000
    }
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Index for faster queries
designSchema.index({ user: 1, createdAt: -1 });
designSchema.index({ category: 1 });

const Design = mongoose.model('Design', designSchema);

module.exports = Design;
