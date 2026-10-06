const Accommodation = require('../models/Accommodation');

// @route   POST /api/accommodations
// @desc    Create a new accommodation listing
// @access  Private (host)
const createAccommodation = async (req, res) => {
  try {
    const {
      title, type, location, description, guests, bedrooms, bathrooms, beds,
      amenities, images, price, weeklyDiscount, cleaningFee, serviceFee,
      occupancyTaxes,
    } = req.body;

    if (!title || !type || !location || !description || !guests || !bedrooms || !bathrooms || !price) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const accommodation = await Accommodation.create({
      title,
      type,
      location,
      description,
      guests,
      bedrooms,
      bathrooms,
      beds: beds || 1,
      amenities: amenities || [],
      images: images || [],
      price,
      weeklyDiscount: weeklyDiscount || 0,
      cleaningFee: cleaningFee || 0,
      serviceFee: serviceFee || 0,
      occupancyTaxes: occupancyTaxes || 0,
      host: req.user.username,
      host_id: req.user.id,
    });

    res.status(201).json(accommodation);
  } catch (err) {
    res.status(500).json({ message: 'Server error creating accommodation', error: err.message });
  }
};

// @route   GET /api/accommodations
// @desc    Get all accommodations, optionally filtered by ?location=
// @access  Public
const getAccommodations = async (req, res) => {
  try {
    const { location } = req.query;
    const filter = {};
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    const accommodations = await Accommodation.find(filter).sort({ createdAt: -1 });
    res.status(200).json(accommodations);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching accommodations', error: err.message });
  }
};

// @route   GET /api/accommodations/:id
// @desc    Get a single accommodation by id
// @access  Public
const getAccommodationById = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) return res.status(404).json({ message: 'Accommodation not found' });
    res.status(200).json(accommodation);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching accommodation', error: err.message });
  }
};

// @route   GET /api/accommodations/host/mine
// @desc    Get all accommodations belonging to the logged in host
// @access  Private (host)
const getMyAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find({ host_id: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(accommodations);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching your accommodations', error: err.message });
  }
};

// @route   PUT /api/accommodations/:id
// @desc    Update an accommodation listing
// @access  Private (host, owner only)
const updateAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) return res.status(404).json({ message: 'Accommodation not found' });

    if (accommodation.host_id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to update this listing' });
    }

    Object.assign(accommodation, req.body);
    await accommodation.save();

    res.status(200).json(accommodation);
  } catch (err) {
    res.status(500).json({ message: 'Server error updating accommodation', error: err.message });
  }
};

// @route   DELETE /api/accommodations/:id
// @desc    Delete an accommodation listing
// @access  Private (host, owner only)
const deleteAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) return res.status(404).json({ message: 'Accommodation not found' });

    if (accommodation.host_id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to delete this listing' });
    }

    await accommodation.deleteOne();
    res.status(200).json({ message: 'Accommodation deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error deleting accommodation', error: err.message });
  }
};

module.exports = {
  createAccommodation,
  getAccommodations,
  getAccommodationById,
  getMyAccommodations,
  updateAccommodation,
  deleteAccommodation,
};
