const processData = require("../services/processData");
const consumeData = async (req, res) => {
  try {
    const patientData = req.body.clinical_data;
    const { patientId, orgId } = req.body;
    processData(patientData, patientId, orgId);
    res.send({ sucess: true, message: "Processing Data" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ sucess: false, message: "Some error occurred" });
  }
};

module.exports = consumeData;
