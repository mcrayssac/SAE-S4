const graphController = require("../Controller/GraphController")
const express = require('express');
const router = express.Router();

router.get('/', graphController.accueil)
router.get('/vaccination/:codeCountry', graphController.graphVaccination)
router.get('/contamination/:codeCountry', graphController.graphContamination)
router.get('/comparison/:codeCountry', graphController.graphComparison)
router.get('/prediction/:codeCountry', graphController.prediction)

module.exports = router;