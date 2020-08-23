const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

//DB Connection
mongoose
  .connect('mongodb://localhost:27017/e-com_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('DB CONNECTED...');
  })
  .catch((err) => {
    console.log(`ERROR: ${err}`);
  });

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

//Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

//Starting Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
