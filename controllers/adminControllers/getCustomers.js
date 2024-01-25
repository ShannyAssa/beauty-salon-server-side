const Customer = require('../../models/Customer');

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    // console.log(customers);

    res.status(200).json({customers});

  } catch (err) {
    console.log(err);
    return res.status(500).json({ 'message': err.message });
  }
}

module.exports = getCustomers;