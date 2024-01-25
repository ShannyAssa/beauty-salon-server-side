const mongoose = require('mongoose');
const Appointment = require('../../models/Appointment');
const Customers = require('../../models/Customer');

const deleteUnapprovedAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // const validAppointmentId = mongoose.Types.ObjectId(appointmentId);
    await Appointment.deleteOne({ _id: appointmentId });

    res.status(200).json({ message: 'Appointment canceled successfully' });
  } catch (error) {
    console.error('Error canceling appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = deleteUnapprovedAppointment;
