const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 5500;
const connectDB = require('./config/db');
const app = express();

app.use(express.json());

//Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'pages')));

app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
    credentials: true,
  })
);
connectDB();
app.get('/', (req, res) => {
  res.send('Hello From the Server');
});

const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
