const express = require('express');
const router = express.Router();
const {
  createAccommodation,
  getAccommodations,
  getAccommodationById,
  getMyAccommodations,
  updateAccommodation,
  deleteAccommodation,
} = require('../controllers/accommodationController');
const { protect } = require('../middleware/auth');

// Static/specific routes must come before the dynamic ':id' route
router.get('/host/mine', protect, getMyAccommodations);

router.route('/')
  .get(getAccommodations)
  .post(protect, createAccommodation);

router.route('/:id')
  .get(getAccommodationById)
  .put(protect, updateAccommodation)
  .delete(protect, deleteAccommodation);

module.exports = router;
