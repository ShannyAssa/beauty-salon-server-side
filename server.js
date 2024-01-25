const express = require('express');
const app = express();
const port = 8000;
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');
const signUpController = require('./controllers/customerControllers/signUpController');
const loginController = require('./controllers/customerControllers/loginController');
const authMiddleware = require('./middleware/authMiddleware');
const createTreatment = require('./controllers/adminControllers/createTreatmentsController'); 
const getAllTreatments = require('./controllers/getTreatmentsController');
const getUserInformation = require('./controllers/customerControllers/getUserInformation');
const makeNewAppointmentAsUser = require('./controllers/customerControllers/makeNewAppointmentAsUser');
const deleteUnapprovedAppointment = require('./controllers/customerControllers/deleteUnapprovedAppointment');
const addNewAdmin = require('./controllers/adminControllers/addNewAdmin');
const adminLogin = require('./controllers/adminControllers/adminLogin');
const getAppointments = require('./controllers/adminControllers/getAppointments');
const cancelReservation = require('./controllers/adminControllers/cancelReservation');
const acceptReservation = require('./controllers/adminControllers/acceptReservation');
const getCustomers = require('./controllers/adminControllers/getCustomers');
const deleteCustomer = require('./controllers/adminControllers/deleteCustomer');

// Connect to MongoDB Atlas
const { username, password, cluster } = config.mongoDB;
const connectionString = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/`;

try {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

app.use(cors());
app.use(express.json());

// login & signup & admin login routes before authMiddleware
app.post('/login', loginController.login);
app.post('/signup', signUpController.signUp);
app.post('/admin/login',adminLogin.adminLogin);

// getting treatments info is not involved with authentication 
app.get('/treatments', getAllTreatments.getAllTreatments);

// using the authMiddleware for routes which require authentication
app.use(authMiddleware);

// customer routes
app.get('/MyProfile/getUserInformation', getUserInformation);
app.post('/MyProfile/makeReservation', makeNewAppointmentAsUser);
app.delete(`/MyProfile/cancelReservation/:appointmentId`, deleteUnapprovedAppointment);

// admin routes
app.post('/admin/treatments', createTreatment.createTreatment);
app.post('/admin/addAdmin', addNewAdmin);
app.get('/admin/getAppointments', getAppointments);
app.delete('/admin/cancelReservation/:appointmentId', cancelReservation);
app.post('/admin/acceptReservation', acceptReservation);
app.get('/admin/getCustomers', getCustomers);
app.delete('/admin/deleteCustomer/:customerId', deleteCustomer);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
