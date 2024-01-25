const Treatment = require('../models/Treatment');

module.exports = {
  getAllTreatments: async (req, res) => {
    try {
      const treatment = req.body;

      console.log(req.body);

      const allTreatments = await Treatment.find();
      console.log(allTreatments);

      res.status(200).json(allTreatments);

    } catch (err) {
      console.log(err);
      return res.status(500).json({ 'message': err.message });
    }
  }
};
