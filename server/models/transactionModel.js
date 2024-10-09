const db = require('./db');

const getTransactions = (month, searchQuery, page, limit, callback) => {
    const offset = (page - 1) * limit;
    const search = searchQuery ? `%${searchQuery}%` : '%';
    const query = `
        SELECT * FROM transactions 
        WHERE MONTH(dateOfSale) = ? AND (title LIKE ? OR description LIKE ? OR price LIKE ?)
        LIMIT ?, ?;
    `;

    db.query(query, [month, search, search, search, offset, limit], callback);
};

const getStatistics = (month, callback) => {
    const query = `
        SELECT 
            SUM(price) AS totalSale,
            COUNT(CASE WHEN sold = 1 THEN 1 END) AS totalSold,
            COUNT(CASE WHEN sold = 0 THEN 1 END) AS totalNotSold
        FROM transactions WHERE MONTH(dateOfSale) = ?;
    `;
    db.query(query, [month], callback);
};

const getPriceRangeData = (month, callback) => {
    const query = `
        SELECT 
            CASE 
                WHEN price BETWEEN 0 AND 100 THEN '0-100'
                WHEN price BETWEEN 101 AND 200 THEN '101-200'
                WHEN price BETWEEN 201 AND 300 THEN '201-300'
                WHEN price BETWEEN 301 AND 400 THEN '301-400'
                WHEN price BETWEEN 401 AND 500 THEN '401-500'
                WHEN price BETWEEN 501 AND 600 THEN '501-600'
                WHEN price BETWEEN 601 AND 700 THEN '601-700'
                WHEN price BETWEEN 701 AND 800 THEN '701-800'
                WHEN price BETWEEN 801 AND 900 THEN '801-900'
                ELSE '901-above'
            END AS priceRange,
            COUNT(*) AS itemCount
        FROM transactions
        WHERE MONTH(dateOfSale) = ?
        GROUP BY priceRange;
    `;
    db.query(query, [month], callback);
};

const getCategoryData = (month, callback) => {
    const query = `
        SELECT category, COUNT(*) AS itemCount 
        FROM transactions 
        WHERE MONTH(dateOfSale) = ? 
        GROUP BY category;
    `;
    db.query(query, [month], callback);
};

const getCombinedData = (month, callback) => {
    getStatistics(month, (err, stats) => {
        if (err) return callback(err);

        getPriceRangeData(month, (err, priceRangeData) => {
            if (err) return callback(err);

            getCategoryData(month, (err, categoryData) => {
                if (err) return callback(err);

                callback(null, {
                    statistics: stats[0],
                    priceRangeData,
                    categoryData
                });
            });
        });
    });
};

module.exports = {
    getTransactions,
    getStatistics,
    getPriceRangeData,
    getCategoryData,
    getCombinedData
};
