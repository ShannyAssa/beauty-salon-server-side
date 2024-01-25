const mongoose = require('mongoose');
const Customers = require('../../models/Customer');
const Appointments = require('../../models/Appointment');

const deleteCustomer = async (req, res) => {
  const { customerId } = req.params;
  try {
    const customer = await Customers.findOne({id: customerId});
    if (!customer) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    await Customers.deleteOne({ id: customerId });

    await Appointments.deleteMany({'customer.id' : customerId});
    
    res.status(200).json({ message: 'Customer was deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = deleteCustomer;
