const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Vivek@123',
    database: 'transactions_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

// Create the transactions table if it doesn't exist
const createTableQuery = `
CREATE TABLE IF NOT EXISTS transactions (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2),
    category VARCHAR(255),
    sold BOOLEAN,
    dateOfSale DATE,
    image VARCHAR(255)
);
`;

connection.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log('Transactions table created or already exists');
});

module.exports = connection;
