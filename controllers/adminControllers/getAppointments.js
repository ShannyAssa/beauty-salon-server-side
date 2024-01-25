const Appointment = require('../../models/Appointment');
const Customer = require('../../models/Customer');

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    // console.log(appointments);
    const modifiedAppointments = [];

    for (const appointment of appointments) {
      const currCustomer = await Customer.findOne({id : appointment.customer.id});
      const fullName = `${currCustomer.firstname} ${currCustomer.lastname}`;
      // console.log('full name : ', fullName);
      const modifiedAppointment = {
        id: appointment._id,
        date : appointment.date,
        customer : {
          fullName: fullName,
          id: currCustomer.id,
          phoneNumber: currCustomer.phoneNumber,
        },
        treatment: {
          name: appointment.treatment.name,
          durationMinutes: appointment.treatment.durationMinutes,
        },
        approvedByAdmin: appointment.approvedByAdmin,
        notes: appointment.notes,
        }

        modifiedAppointments.push(modifiedAppointment);
    }

    // console.log(modifiedAppointments);

    res.status(200).json({modifiedAppointments});

  } catch (err) {
    console.log(err);
    return res.status(500).json({ 'message': err.message });
  }
}

module.exports = getAppointments;