const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5500;
const connectDB = require('./config/db');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectDB();
app.get('/', (req, res) => {
  res.send('Hello From the Server');
});

const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
