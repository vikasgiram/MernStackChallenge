// controllers/barChartController.js

const Product = require('../models/Product');

// Controller to generate bar chart data for price ranges
exports.getBarChartData = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.status(400).json({ error: 'Month is required' });
        }

        const monthNumber = parseInt(month, 10);

        // Aggregation pipeline to group by price ranges and count items
        const barChartData = await Product.aggregate([
            {
                $addFields: {
                    month: { $month: '$dateOfSale' }
                }
            },
            {
                $match: {
                    month: monthNumber
                }
            },
            {
                $bucket: {
                    groupBy: '$price',
                    boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Number.POSITIVE_INFINITY],
                    default: 'Other',
                    output: {
                        count: { $sum: 1 }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    priceRange: {
                        $concat: [
                            { $cond: [{ $eq: ['$_id', 0] }, '0', '' ] },
                            { $cond: [{ $and: [{ $gt: ['$_id', 0] }, { $lte: ['$_id', 100] }] }, '0 - 100', '' ] },
                            { $cond: [{ $and: [{ $gt: ['$_id', 100] }, { $lte: ['$_id', 200] }] }, '101 - 200', '' ] },
                            { $cond: [{ $and: [{ $gt: ['$_id', 200] }, { $lte: ['$_id', 300] }] }, '201 - 300', '' ] },
                            { $cond: [{ $and: [{ $gt: ['$_id', 300] }, { $lte: ['$_id', 400] }] }, '301 - 400', '' ] },
                            { $cond: [{ $and: [{ $gt: ['$_id', 400] }, { $lte: ['$_id', 500] }] }, '401 - 500', '' ] },
                            { $cond: [{ $and: [{ $gt: ['$_id', 500] }, { $lte: ['$_id', 600] }] }, '501 - 600', '' ] },
                            { $cond: [{ $and: [{ $gt: ['$_id', 600] }, { $lte: ['$_id', 700] }] }, '601 - 700', '' ] },
                            { $cond: [{ $and: [{ $gt: ['$_id', 700] }, { $lte: ['$_id', 800] }] }, '701 - 800', '' ] },
                            { $cond: [{ $and: [{ $gt: ['$_id', 800] }, { $lte: ['$_id', 900] }] }, '801 - 900', '' ] },
                            { $cond: [{ $eq: ['$_id', Number.POSITIVE_INFINITY] }, '901-above', '' ] }
                        ]
                    },
                    count: '$count'
                }
            }
        ]);

        res.status(200).json(barChartData);
    } catch (error) {
        console.error('Error fetching bar chart data:', error);
        res.status(500).json({ error: 'Failed to fetch bar chart data' });
    }
};
