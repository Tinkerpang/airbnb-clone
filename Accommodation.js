const mongoose = require('mongoose');

// Accommodation schema, matching the recommended reservation/listing data
// structure from the brief (Location Details Page fields + Create Listing form fields).
const accommodationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Type of place is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 0,
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 0,
    },
    beds: {
      type: Number,
      default: 1,
      min: 1,
    },
    amenities: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: [true, 'Price per night is required'],
      min: 0,
    },
    weeklyDiscount: { type: Number, default: 0 },
    cleaningFee: { type: Number, default: 0 },
    serviceFee: { type: Number, default: 0 },
    occupancyTaxes: { type: Number, default: 0 },
    enhancedCleaning: { type: Boolean, default: true },
    selfCheckIn: { type: Boolean, default: true },
    rating: { type: Number, default: 5.0, min: 0, max: 5 },
    reviews: { type: Number, default: 0 },
    specificRatings: {
      cleanliness: { type: Number, default: 5 },
      communication: { type: Number, default: 5 },
      checkIn: { type: Number, default: 5 },
      accuracy: { type: Number, default: 5 },
      location: { type: Number, default: 5 },
      value: { type: Number, default: 5 },
    },
    host: {
      type: String,
      required: true,
    },
    host_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Accommodation', accommodationSchema);
