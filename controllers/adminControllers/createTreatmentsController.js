const Treatment = require('../../models/Treatment');

module.exports = {
  createTreatment: async (req, res) => {
    try {
      const treatment = req.body;

      const newTreatment = new Treatment(treatment);
      await newTreatment.save();

      res.status(200).json({ message: "Treatment created successfully" });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ 'message': err.message });
    }
  }
};
