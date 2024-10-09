const axios = require('axios');
const db = require('../models/db');

const initializeDatabase = async () => {
    try {
        const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        
        // Clear previous data if necessary
        const clearQuery = 'DELETE FROM transactions';
        db.query(clearQuery, (err, result) => {
            if (err) throw err;
            console.log('Old data cleared');
        });

        // Insert new data with image
        const seedQuery = `INSERT INTO transactions (id, title, description, price, category, sold, dateOfSale, image) VALUES ?`;

        const values = data.map(item => [
            item.id, 
            item.title, 
            item.description, 
            item.price, 
            item.category, 
            item.sold, 
            new Date(item.dateOfSale),
            item.image // Include the image field
        ]);

        db.query(seedQuery, [values], (err, result) => {
            if (err) throw err;
            console.log(`${result.affectedRows} rows inserted.`);
        });
    } catch (error) {
        console.error("Error fetching or inserting data:", error);
    }
};

module.exports = initializeDatabase;
