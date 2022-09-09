const format = require("pg-format");
const db = require("../../config/db");

const processData = async (data, patientId, clientId) => {
  try {
    for (let property of Object.keys(data)) {
      console.log(`${property}: ${data[property]}`);
      if (data[property].data) {
        let resData = await db.query(
          `SELECT data_id from data_list where data_type=$1`,
          [property.toUpperCase()]
        );

        let dataId = resData.rows[0].data_id;

        let transformedData = data[property].data.map((obj) => {
          return [obj.on_date, dataId, obj.measurement, patientId];
        });
        let bulkInsertQuery = format(
          "INSERT INTO series_data(time_stamp,data_id,data_value,patient_id) VALUES %L",
          transformedData
        );
        console.log("bulk insert query", bulkInsertQuery);
        let respBulk = await db.query(bulkInsertQuery);
        console.log(respBulk);
      }
    }
  } catch (error) {
    console.log("processdata error", error);
  }
};
module.exports = processData;
