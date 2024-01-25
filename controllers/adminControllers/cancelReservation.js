const mongoose = require('mongoose');
const Appointment = require('../../models/Appointment');
const Customers = require('../../models/Customer');

const cancelReservation = async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const appointment = await Appointment.findById(appointmentId);
    const currCustomer = await Customers.findOne( {id: appointment.customer.id});
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    await Appointment.deleteOne({ _id: appointmentId });
    /**
     * sending an email to the customer! currCustomer.email
     */
    res.status(200).json({ message: 'Appointment canceled successfully' });
  } catch (error) {
    console.error('Error canceling appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = cancelReservation;
