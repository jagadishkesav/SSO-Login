require("dotenv").config("./.env");
const app = require("./app");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running ${PORT}`);
});
