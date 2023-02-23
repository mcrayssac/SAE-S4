// hello_python.js
const { loadPyodide } = require("pyodide");

async function hello_python() {
  let pyodide = await loadPyodide();
  return await pyodide.runPythonAsync(`
        import math
        math.sqrt(16)
    `);
}

hello_python().then((result) => {
  console.log("Python says : ", result);
});