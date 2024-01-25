const Customers = require('../../models/Customer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secretKey } = require('../../config');

module.exports = {
  login: async (req, res) => {

    // console.log("login process starts");

    try {
      // Get user input
      // console.log(req.body);
      const { loginType, loginValue, password } = req.body;
      const lowercaseLoginValue = loginValue.toLowerCase();

      // Validate if user exist in our database
      let currCustomer;
      if(loginType === 'email')
      {
        currCustomer = await Customers.findOne({email: lowercaseLoginValue})
      }
      else { // loginType === 'username'
        currCustomer = await Customers.findOne({username: lowercaseLoginValue})
      }

      if (currCustomer && bcrypt.compareSync(password, currCustomer.password)) {
        // console.log("user",currCustomer.firstname, "logged in :)");
          // Generate JWT token
          const token = jwt.sign({ username: currCustomer.username }, secretKey, { expiresIn: 24*60*60 });
          // console.log('token: ' + token);

          return res.status(200).json({ message: "User logged in successfully", token });
      }
      else {
        if(!currCustomer) { 
          console.log("Unregistered user, please sign up (login value doesnt exist");
          return res.status(400).json({ error: "Unregistered user, please sign up"});
        }
        // else:
          console.log("password is wrong");
          return res.status(400).json({ error: `Wrong password`});
      } 
    } catch (err) {
      console.log(err);
      return res.status(500).json({ 'message': err.message });
    }
  },
};
