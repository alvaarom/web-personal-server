const mongoose = require("mongoose");
const app = require("./app");
const {
  API_VERSION,
  DB_HOST,
  DB_PASSWORD,
  DB_USER,
  IP_SERVER,
} = require("./constants");

const PORT = process.env.PORT || 3977;

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log("####################");
      console.log("##### API REST #####");
      console.log("####################");
      console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
    });
  })
  .catch((err) => {
    throw err;
  });
