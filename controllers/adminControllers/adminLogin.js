const Admin = require('../../models/Admin');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config');

module.exports = {
  adminLogin: async (req, res) => {

    console.log("admin login process starts");

    try {
      // Get user input
      const { id } = req.body;
      console.log(id);

      // Validate if user exist in our database
      let currAdmin = await Admin.findOne({id : id.loginPassword});
    
      if(currAdmin) {
        // Generate JWT token
        const token = jwt.sign({ id: currAdmin.id }, secretKey, { expiresIn: 24*60*60 });
        console.log('token: ' + token);

        return res.status(200).json({ message: "admin logged in successfully", token });

      }
      else {
        if(!currAdmin) { 
          console.log("Unregistered admin");
          return res.status(400).json({ error: "Unregistered admin"});
        }
      } 
    } catch (err) {
      console.log(err);
      return res.status(500).json({ 'message': err.message });
    }
  },
};
