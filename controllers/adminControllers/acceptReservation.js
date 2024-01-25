const mongoose = require('mongoose');
const Appointment = require('../../models/Appointment');
const Customers = require('../../models/Customer');

const acceptReservation = async (req, res) => {
  const { appointmentId } = req.body;
  try {
    const appointment = await Appointment.findById(appointmentId);
    const currCustomer = await Customers.findOne( {id: appointment.customer.id});
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      {_id: appointment._id},
      {$set: {approvedByAdmin : true}},
      {new:true}
    );

    if (!updatedAppointment) {
      return res.status(500).json({ message: 'Appointment was not confirmed' });
    }
  
    /**
     * sending an email to the customer! currCustomer.email
     */
    res.status(200).json({ message: 'Appointment was confirmed successfully' });
  } catch (error) {
    console.error('Error confirming appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = acceptReservation;
