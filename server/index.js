import express from "express";
import bodyParser from "body-parser";
import executeCode from "./controllers/executeCode.js";
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/execute", executeCode);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
