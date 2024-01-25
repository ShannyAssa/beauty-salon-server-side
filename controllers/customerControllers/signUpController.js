const Customers = require('../../models/Customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config');

module.exports = {
  signUp: async (req, res) => {
    try {
      const user = req.body;

      // console.log(req.body);
      // Validate customer's input
      if (!user.firstname || !user.lastname || !user.id || !user.email 
        || !user.birthday || !user.username || !user.password || !user.gender || !user.phoneNumber) {
        return res.status(400).json({ error: "Missing registration details!" });
      }

      // Check if this customer already exists in our system
      const oldCustomer = await Customers.findOne({ id: user.id });
      if (oldCustomer) {
        return res.status(409).json({ error: "User Already Exists. Please Login." });
      }

      // Check if username already exists in our database.
      const oldUsername = await Customers.findOne({ username: user.username.toLowerCase() });
      if (oldUsername) {
        return res.status(409).json({ error: "The chosen username is already in use. Please select a different username." });
      }

      const oldEmail = await Customers.findOne({ email: user.email.toLowerCase() });
      if (oldEmail) {
        return res.status(409).json({ error: "The chosen email is already in use." });
      }

      // Create user in our database
      user.email = user.email.toLowerCase();
      user.username = user.username.toLowerCase();
      // Hash the user's password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
      const newUser = new Customers(user);
      await newUser.save();
      // console.log('A new user was created:');
      // console.log(newUser);

      // Generate a JWT token
      // console.log(secretKey);
      const token = jwt.sign({ username : newUser.username } , secretKey, { expiresIn: 24*60*60 }); // expires in should be in seconds
      // console.log(token);
      // Return the token and any other relevant user data
      res.json({ message: "User created successfully", token });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ 'message': err.message });
    }
  }
};
