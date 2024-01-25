const Admin = require('../../models/Admin');

const addNewAdmin= async (req, res) => {
  try {
    const admin = req.body;

    const newAdmin = new Admin(admin);
    await newAdmin.save();

    res.status(200).json({ message: "admin created successfully" });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ 'message': err.message });
  }
}

module.exports = addNewAdmin;
