var express = require('express');
var router = express.Router();
var cntl = require('../controllers/home');
var locationController = require('../controllers/locationInfo');

//Route to handle Home Page
router.get('/', cntl.getDashboard);
//Route to handle Crime vs Arrest Rate Analysis
router.get('/laws',cntl.getLawEnforcementDetails);
//Route to handle Yearly Crime Rate Analysis
router.get('/yearly', cntl.getYearly);
//Route to handle Crime Rate Based on Location
router.get('/location', locationController.getLocationInfo);
router.post('/locationFilter', locationController.locationFilter);
//Route to handle Overall Crime Rate Insights
router.get('/bar',cntl.getOverallInsights);
//Route to feedback forms
router.get('/feedback', cntl.getFeedBack);
router.post('/feedback', cntl.postFeedBackSubmit);


module.exports = router;