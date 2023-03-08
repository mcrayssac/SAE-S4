const graphController = require("../Controller/GraphController")
const express = require('express');
const router = express.Router();

router.get('/', graphController.accueil)

router.get('/vaccination/:country/:intervalStart/:intervalEnd', graphController.graphVaccination)

router.get('/relation/', graphController.graphCaseVaccinationRelation)


const dataRefresh = require("../DataRefresh/dataRefresh")
router.get('/refresh', dataRefresh.routerUpdate)
router.get('/mean/minutes', dataRefresh.meanMinutesUpdate)

module.exports = router;