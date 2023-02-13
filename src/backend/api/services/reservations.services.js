const knex = require('../../database');

const selectAllReservationsQuery = () => {
  return knex('reservations').select('*');
};

const addNewReservationQuery = (newReservationData) => {
  return knex('reservations').insert(newReservationData).into('reservations');
};

const getReservationById = (reservationId) => {
  return knex('reservations').select('*').where({ id: reservationId });
};

const updateReservation = (reservationId, updatedReservationBody) => {
  return knex('reservations').where({ id: reservationId }).update(updatedReservationBody);
};

const deleteReservation = (reservationId, deletedReservationBody) => {
    return knex('meals').where({ id: reservationId }).del(deletedReservationBody);
  };
  

module.exports = { selectAllReservationsQuery, addNewReservationQuery, getReservationById, updateReservation, deleteReservation };
