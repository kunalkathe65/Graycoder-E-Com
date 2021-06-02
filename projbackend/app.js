const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./config/passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const stripeRoutes = require('./routes/stripe');

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
//encrypts outgoing cookies and decrypt incoming cookies
app.use(
  cookieSession({
    name: 'user',
    maxAge: 24 * 60 * 60 * 1000, //24 hrs
    keys: [process.env.SESSION_COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', stripeRoutes);

//Starting Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
