import vm from "vm";
const executeCode = async (req, res) => {
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
};

export default executeCode;
