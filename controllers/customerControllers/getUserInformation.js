const Treatment = require('../../models/Treatment');
const Customer = require('../../models/Customer');
const Appointment = require('../../models/Appointment');

const getUserInformation = async (req, res) => {
  try {
    const username = req.user.username;
    // console.log(username);
    const currentCustomer = await Customer.findOne({username: username});
    const customerAppointments = await Appointment.find({'customer.username': username});
    console.log(customerAppointments);
    const allTreatments = await Treatment.find();

    res.status(200).json({currentCustomer, customerAppointments, allTreatments});

  } catch (err) {
    console.log(err);
    return res.status(500).json({ 'message': err.message });
  }
}

module.exports = getUserInformation;