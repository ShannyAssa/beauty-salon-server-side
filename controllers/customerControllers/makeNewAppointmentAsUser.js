const Appointment = require('../../models/Appointment');
const Customers = require('../../models/Customer');

const makeNewAppointmentAsUser = async (req, res) => {
  try {
    const appointmentDetails = req.body;
    const user = req.user;
    const currCustomer = await Customers.findOne({username: user.username})

    const appointment = {
      date: appointmentDetails.date,
      customer: {
        id: currCustomer.id, 
        username: currCustomer.username,
      },
      treatment: {
        name: appointmentDetails.treatmentName,
        durationMinutes: appointmentDetails.treatmentDuration,
      },
      approvedByAdmin: false, // You might want to change this based on your business logic
      notes: appointmentDetails.notes,
    };
    
    const newAppointment = new Appointment(appointment);
    await newAppointment.save();
    
    // console.log('A new appointment was created:');
    // console.log(newAppointment);
    
    res.status(200).json({ message: "Appointment was created successfully" });
    
  } catch (err) {
    console.error(err);

    if (err.name === 'ValidationError') {
      // Handle validation error specifically
      return res.status(400).json({ message: err.message });
    }

    return res.status(500).json({ message: err.message });
  }
};

module.exports = makeNewAppointmentAsUser;
