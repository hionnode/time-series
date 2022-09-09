const db = require("../../config/db");
const getData = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    let queryType = req.query.type;
    console.log(queryType);
    let resData = await db.query(
      `SELECT data_id from data_list where data_type=$1`,
      [queryType]
    );
    let dataId = resData.rows[0].data_id;
    let patientData = await db.query(
      `SELECT time_bucket('15 minutes', time_stamp) AS start_time,
      		time_bucket('15 minutes', time_stamp)+( 15 || 'minutes')::interval AS end_time,
    MAX(data_value) AS max_value,
    MIN(data_value) as min_value
  FROM series_data
  WHERE time_stamp < NOW() - INTERVAL '3 hours' AND data_id=$1 AND patient_id =$2
  GROUP BY start_time, data_id
  ORDER BY start_time DESC;`,
      [dataId, patientId]
    );
    let transformedData = patientData.rows.map((obj) => {
      return {
        from_date: obj.start_time,
        to_date: obj.end_time,
        measurement: {
          low: obj.min_value,
          high: obj.max_value,
        },
      };
    });
    res.send({ success: true, data: transformedData });
  } catch (error) {
    console.log(error);
    res.send({ success: false });
  }
};
module.exports = getData;
