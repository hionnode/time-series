const app = require("./config/server");

let PORT = 3000;
app.listen(PORT, () => console.log(`serve started on port ${PORT} `));

module.exports = app;
