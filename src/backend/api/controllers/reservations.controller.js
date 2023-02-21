const reservationsService = require('../services/reservations.services');

const getAllReservations = async (request, response) => {
  try {
    const reservations = await reservationsService.selectAllQuery();

    return response.json(reservations);
  } catch (error) {
    throw error;
  }
};

const postNewReservation = async (request, response) => {
  try {
    const newReservationData = request.body;
    await reservationsService.addNewReservationQuery(newReservationData);

    return response.status(201).json({ message: 'New reservation created.' });
  } catch (error) {
    throw error;
  }
};

const getReservationsById = async (request, response) => {
  try {
    const reservationId = request.params.id;

    if (!reservationId) {
      return response.json({ message: 'No reservation with this id found' });
    }
    const reservation = await reservationsService.getReservationById(reservationId);

    return response.json(reservation);
  } catch (error) {
    throw error;
  }
};

const updateReservationById = async (request, response) => {
  try {
    const reservationId = request.params.id;
    const reservationBody = request.body;
    if (!reservationId) {
      return response.json({ message: 'No reservation with this id found' });
    }

    await reservationsService.updateReservation(reservationId, reservationBody);

    return response.status(201).json({ message: 'Reservation updated' });
  } catch (error) {
    throw error;
  }
};

const deleteReservation = async (request, response) => {
  try {
    const reservationId = request.params.id;
    const reservationBody = request.body;
    if (!reservationId) {
      return response.json({ message: 'No reservation with this id found' });
    }

    await reservationsService.deleteReservation(reservationId, reservationBody);

    return response.status(201).json({ message: 'Reservation deleted' });
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllReservations, postNewReservation, getReservationsById, updateReservationById, deleteReservation };
