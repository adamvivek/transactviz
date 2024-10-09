const express = require('express');
const cors = require('cors');
const initializeDatabase = require('./utils/initializeDatabase');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', transactionRoutes);

// Initialize the database
initializeDatabase();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
