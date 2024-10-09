const transactionModel = require('../models/transactionModel');

const listTransactions = (req, res) => {
    const { month, search = '', page = 1, limit = 10 } = req.query;
    transactionModel.getTransactions(month, search, page, limit, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const getStatistics = (req, res) => {
    const { month } = req.query;
    transactionModel.getStatistics(month, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
};

const getBarChart = (req, res) => {
    const { month } = req.query;
    transactionModel.getPriceRangeData(month, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const getCategoryData = (req, res) => {
    const { month } = req.query;
    transactionModel.getCategoryData(month, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const getCombinedData = (req, res) => {
    const { month } = req.query;
    transactionModel.getCombinedData(month, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

module.exports = {
    listTransactions,
    getStatistics,
    getBarChart,
    getCategoryData,
    getCombinedData
};
