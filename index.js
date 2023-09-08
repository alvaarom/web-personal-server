const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 3977;

console.log(process.env);
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log("####################");
      console.log("##### API REST #####");
      console.log("####################");
      console.log(
        `http://${process.env.IP_SERVER}:${PORT}/api/${process.env.API_VERSION}`
      );
    });
  })
  .catch((err) => {
    throw err;
  });
