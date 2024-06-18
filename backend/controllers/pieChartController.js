// controllers/pieChartController.js

const Product = require('../models/Product');

// Controller to generate pie chart data for categories
exports.getPieChartData = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.status(400).json({ error: 'Month is required' });
        }

        const monthNumber = parseInt(month, 10);

        // Aggregation pipeline to group by category and count items
        const pieChartData = await Product.aggregate([
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
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: '$_id',
                    count: 1
                }
            }
        ]);

        res.status(200).json(pieChartData);
    } catch (error) {
        console.error('Error fetching pie chart data:', error);
        res.status(500).json({ error: 'Failed to fetch pie chart data' });
    }
};
