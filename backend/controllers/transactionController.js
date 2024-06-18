const Product = require('../models/Product');

// Controller to list all transactions with search and pagination
exports.listTransactions = async (req, res) => {
    try {
        const { search = '', page = 1, perPage = 10, month } = req.query;
        const regex = new RegExp(search, 'i'); // Create a regex for case-insensitive search

        if (!month) {
            return res.status(400).json({ error: 'Month is required' });
        }

        const monthNumber = parseInt(month, 10);
        const searchNumber = parseFloat(search); // Parse the search string to a float for price comparison

        // Step 1: Add month field
        const addFieldsStage = {
            $addFields: {
                month: { $month: '$dateOfSale' }
            }
        };

        // Step 2: Match documents with the specified month and search criteria
        const matchStage = {
            $match: {
                month: monthNumber,
                $or: [
                    { title: regex },
                    { description: regex },
                    { price: isNaN(searchNumber) ? { $exists: true } : searchNumber } // Check if search is a number
                ]
            }
        };

        // Step 3: Apply pagination
        const skipStage = {
            $skip: (page - 1) * perPage
        };

        const limitStage = {
            $limit: parseInt(perPage, 10)
        };

        const finalProducts = await Product.aggregate([addFieldsStage, matchStage, skipStage, limitStage]);

        // Send the list of products as response
        res.status(200).json(finalProducts);
    } catch (error) {
        // Log the error for debugging
        console.error('Error fetching transactions:', error);
        // Send an error response in case of failure
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
};




// Controller to get statistics for a selected month
exports.getStatistics = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.status(400).json({ error: 'Month is required' });
        }

        const monthNumber = parseInt(month, 10);

        // Add month field and calculate statistics
        const stats = await Product.aggregate([
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
                    _id: null,
                    totalSaleAmount: {
                        $sum: {
                            $cond: [{ $eq: ["$sold", true] }, "$price", 0]
                        }
                    },
                    totalSoldItems: {
                        $sum: {
                            $cond: [{ $eq: ["$sold", true] }, 1, 0]
                        }
                    },
                    totalNotSoldItems: {
                        $sum: {
                            $cond: [{ $eq: ["$sold", false] }, 1, 0]
                        }
                    }
                }
            }
        ]);


        // Extract the result from the aggregation pipeline
        const result = stats[0] || { totalSaleAmount: 0, totalSoldItems: 0, totalNotSoldItems: 0 };

        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
};