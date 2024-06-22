const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const fs = require('fs');
const path = require('path');


const userRoutes = require('./routes/user');
const airportRoutes = require('./routes/airport');
const tripRoutes = require('./routes/trip');
const vehicleRoutes = require('./routes/vehicle');
const stateAndCityRoutes = require('./routes/stateAndCity');
const localPackageRoutes = require('./routes/localPackage');
const couponRoutes = require('./routes/coupon');
const bookingRoutes = require('./routes/booking');
const airportBookingRoutes = require('./routes/airportBooking');
const hourlyRentalRoutes = require('./routes/hourlyRental');
const outStationRoutes = require('./routes/outStation');
const hourlyRentalBookingRoutes = require('./routes/hourlyRentalBooking');
const localAirportBookingRoutes = require('./routes/localAiportBooking');
const outStationBookingRoutes = require('./routes/outStationBooking');
const referRoutes = require('./routes/refer');
const driverRoutes = require('./routes/driver');
const policyRoutes = require('./routes/policy');
const dashboardRoutes = require('./routes/dashboard');
const rolePermissionRoutes = require('./routes/rolePermission');

const globalErrHandler = require('./controllers/error');
const AppError = require('./utils/appError');
const app = express();
app.use(cors());

const uploadsDir = path.join(__dirname,  'uploads/img/trip');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads/img/trip',express.static('uploads/img/trip'));//for image

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
app.use('/api/v1', userRoutes);
app.use('/api/v1', airportRoutes);
app.use('/api/v1', tripRoutes);
app.use('/api/v1', vehicleRoutes);
app.use('/api/v1', localPackageRoutes);
app.use('/api/v1', stateAndCityRoutes);
app.use('/api/v1', couponRoutes);
app.use('/api/v1', bookingRoutes);
app.use('/api/v1', airportBookingRoutes);
app.use('/api/v1', hourlyRentalRoutes);
app.use('/api/v1', outStationRoutes);
app.use('/api/v1', hourlyRentalBookingRoutes);
app.use('/api/v1', localAirportBookingRoutes);
app.use('/api/v1', outStationBookingRoutes);
app.use('/api/v1', referRoutes);
app.use('/api/v1', driverRoutes);
app.use('/api/v1', policyRoutes);
app.use('/api/v1', dashboardRoutes);
app.use('/api/v1', rolePermissionRoutes);

app.use('*', (req, res, next) => {
    const err = new AppError(404, 'fail', 'undefined route');
    next(err, req, res, next);
});

app.use(globalErrHandler);

module.exports = app;