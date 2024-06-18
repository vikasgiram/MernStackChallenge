const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

const initController=require("../controllers/initController");

const barChartController = require('../controllers/barChartController');
const pieChartController =require("../controllers/pieChartController");


// Route to initialize the database
router.get('/initialize', initController.initializeDatabase);

// Route to list transactions with search and pagination
router.get('/transactions', transactionController.listTransactions);

// Route to get statistics for a selected month
router.get('/statistics', transactionController.getStatistics);

// Route to get bar chart data
router.get('/bar-chart', barChartController.getBarChartData);

// Route to get pie chart data
router.get('/pie-chart', pieChartController.getPieChartData);



module.exports = router;
