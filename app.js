const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');


const userRoutes = require('./routes/user');
const airportRoutes = require('./routes/airport');
const tripRoutes = require('./routes/trip');
const vehicleRoutes = require('./routes/vehicle');
const stateAndCityRoutes = require('./routes/stateAndCity');
const localPackageRoutes = require('./routes/localPackage');
const couponRoutes = require('./routes/coupon');
const bookingRoutes = require('./routes/booking');
const hourlyRentalRoutes = require('./routes/hourlyRental');
const hourlyRentalBookingRoutes = require('./routes/hourlyRentalBooking');

const globalErrHandler = require('./controllers/error');
const AppError = require('./utils/appError');
const app = express();
app.use(cors());

app.use(helmet());

const limiter = rateLimit({
    max: 150,
    windowMs: 60 * 60 * 1000,
    message: 'Too Many Request from this IP, please try again in an hour'
});
// app.use('/api', limiter);

app.use(express.json({
    limit: '15kb'
}));

app.use(mongoSanitize());

app.use(xss());

app.use(hpp());


app.use('/auth', userRoutes);
app.use('/api/v1', airportRoutes);
app.use('/api/v1', tripRoutes);
app.use('/api/v1', vehicleRoutes);
app.use('/api/v1', localPackageRoutes);
app.use('/api/v1', stateAndCityRoutes);
app.use('/api/v1', couponRoutes);
app.use('/api/v1', bookingRoutes);
app.use('/api/v1', hourlyRentalRoutes);
app.use('/api/v1', hourlyRentalBookingRoutes);

app.use('*', (req, res, next) => {
    const err = new AppError(404, 'fail', 'undefined route');
    next(err, req, res, next);
});

app.use(globalErrHandler);

module.exports = app;