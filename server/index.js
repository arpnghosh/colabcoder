import express from "express";
import bodyParser from "body-parser";
import vm from "vm";

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

app.post("/execute", (req, res) => {
  const { code } = req.body;

  try {
    const sandbox = {
      console: {
        log: (...args) => {
          capturedConsole.push(
            args.map((arg) => JSON.stringify(arg)).join(" ")
          );
        },
      },
      setTimeout,
      clearTimeout,
      setInterval,
      clearInterval,
    };

    const capturedConsole = [];

    const script = new vm.Script(code);
    const context = new vm.createContext(sandbox);
    script.runInContext(context);

    res.json({ consoleOutput: capturedConsole });
  } catch (error) {
    console.error("Error while running code:", error);
    res
      .status(500)
      .json({ error: "An error occurred while executing the code." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
