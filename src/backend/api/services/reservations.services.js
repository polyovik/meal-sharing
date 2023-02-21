const knex = require('../../database');
const reservationTableName = 'reservation'

const selectAllReservationsQuery = () => {
  return knex(reservationTableName).select('*');
};

const addNewReservationQuery = (newReservationData) => {
  return knex(reservationTableName).insert(newReservationData).into(reservationTableName);
};

const getReservationById = (reservationId) => {
  return knex(reservationTableName).where({ id: reservationId });
};

const updateReservation = (reservationId, updatedReservationBody) => {
  return knex(reservationTableName).where({ id: reservationId }).update(updatedReservationBody);
};

const deleteReservation = (reservationId, deletedReservationBody) => {
    return knex('meal').where({ id: reservationId }).del(deletedReservationBody);
  };
  

module.exports = { selectAllReservationsQuery, addNewReservationQuery, getReservationById, updateReservation, deleteReservation };
