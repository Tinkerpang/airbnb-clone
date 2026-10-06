const Reservation = require('../models/Reservation');
const Accommodation = require('../models/Accommodation');

// @route   POST /api/reservations
// @desc    Create a new reservation for an accommodation
// @access  Private
const createReservation = async (req, res) => {
  try {
    const { accommodationId, checkIn, checkOut, guests, total } = req.body;

    if (!accommodationId || !checkIn || !checkOut) {
      return res.status(400).json({ message: 'accommodationId, checkIn and checkOut are required' });
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      return res.status(400).json({ message: 'Checkout date must be after check-in date' });
    }

    const accommodation = await Accommodation.findById(accommodationId);
    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }

    const reservation = await Reservation.create({
      accommodation: accommodation._id,
      user: req.user.id,
      host: accommodation.host_id,
      bookedBy: req.user.username,
      propertyTitle: accommodation.title,
      checkIn,
      checkOut,
      guests: guests || 1,
      total: total || accommodation.price,
    });

    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ message: 'Server error creating reservation', error: err.message });
  }
};

// @route   GET /api/reservations/host
// @desc    Get all reservations for listings owned by the logged in host
// @access  Private (host)
const getReservationsByHost = async (req, res) => {
  try {
    const reservations = await Reservation.find({ host: req.user.id })
      .populate('accommodation', 'title location images')
      .sort({ createdAt: -1 });
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching host reservations', error: err.message });
  }
};

// @route   GET /api/reservations/user
// @desc    Get all reservations made by the logged in user
// @access  Private
const getReservationsByUser = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.id })
      .populate('accommodation', 'title location images')
      .sort({ createdAt: -1 });
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching your reservations', error: err.message });
  }
};

// @route   DELETE /api/reservations/:id
// @desc    Delete/cancel a reservation
// @access  Private
const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });

    const isOwner = reservation.user.toString() === req.user.id;
    const isHost = reservation.host.toString() === req.user.id;

    if (!isOwner && !isHost) {
      return res.status(403).json({ message: 'You are not authorized to delete this reservation' });
    }

    await reservation.deleteOne();
    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error deleting reservation', error: err.message });
  }
};

module.exports = {
  createReservation,
  getReservationsByHost,
  getReservationsByUser,
  deleteReservation,
};
