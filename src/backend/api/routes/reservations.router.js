const { signedCookie } = require("cookie-parser");
const express = require("express");
const router = express.Router();
const knex = require("../../database");
const reservationsController = require('../controllers/reservations.controller')

router.get('/', reservationsController.getAllReservations);

router.post('/', reservationsController.postNewReservation);

router.get('/:id', reservationsController.getReservationsById);

router.put('/:id', reservationsController.updateReservationById);

router.delete('/:id', reservationsController.deleteReservation);


module.exports = router;