const express = require('express');
const personController = require('../controllers/PersonController');

const router = express.Router();

// Routes for person-related operations
router.post('/', personController.createPerson);           // Create new person
router.get('/', personController.getAllPersons);           // Get all persons
router.get('/search', personController.getPersonBySearch); // Search for a person

module.exports = router;
