const express = require("express");
const app = express();
const port = 3001;
require("./db");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

app.get("/", (req, res) => {
  res.send(
    "This is the backend server! Server is running perfectly, you can close this tab"
  );
});

app.use(express.json());
// app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/UpdateAddress"));
app.use("/api", require("./Routes/GetAddress"));
// app.use("/api", require("./Routes/UpdateCart"));

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`);
});
