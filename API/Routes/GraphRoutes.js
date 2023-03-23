const graphController = require("../Controller/GraphController")
const express = require('express');
const router = express.Router();

router.get('/', graphController.accueil)

router.get('/vaccines', graphController.giveVaccine)

router.get('/countries/:vaccine', graphController.giveCountries)

router.get('/intervals/:vaccine/:country', graphController.giveInterval)

router.get('/vaccination/:vaccine/:country/:intervalStart/:intervalEnd', graphController.graphVaccination)

router.get('/relation/:vaccine/:country', graphController.graphCaseVaccinationRelation)

router.get('/prediction/:country/:transmission/:duration/:survival', graphController.graphPrediction)

router.get('/worldMap/:vaccine', graphController.graphWorldMapCases)

const dataRefresh = require("../DataRefresh/dataRefresh")
router.get('/refresh', dataRefresh.routerUpdate)
router.get('/mean/minutes', dataRefresh.meanMinutesUpdate)

module.exports = router;