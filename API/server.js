const { spawn } = require('child_process');
const chalk = require('chalk');
const fs = require("fs");
const os = require("os");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const AppError = require("./utils/appError");
const express = require('express');
const app = express();
const router = require("./Routes/GraphRoutes");

/**
 * Environment and Port configuration
 */
const dotEnv = require("dotenv");
dotEnv.config();
const timestand_update = process.env.TIMESTAND_UPDATE;

const swaggerOption = {
  swaggerDefinition: (swaggerJsdoc.Options = {
    info: {
      title: "API REST",
      description: "API documentation",
      contact: {
        name: "Groupe 13",
      },
      servers: ["http://localhost:3000/"],
    },
  }),
  apis: ["app.js", "./routes/*.js"],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const swaggerDocs = swaggerJsdoc(swaggerOption);
app.use("/api-docs", swaggerUi.serve,swaggerUi.setup(swaggerDocs));
app.use("/", router);

app.all("*", (req, res,next) => {
  throw new AppError(`Requested URL ${req.path} not found !`, 404)
})

app.listen(process.env.PORT, () => {
  console.log(`The server listening on port http://localhost:${process.env.PORT}`)
})

/**
 * Usage
 */
console.log(chalk.cyan.bold.bgBlack(`Usage : \nLunch nodeJS server : \nnpm start \nLunch nodeJS server and force update : \nnpm run start_update\n`));


/**
 * If
 */
let currentError = false;
let currentImportation = false;
if (process.env.npm_lifecycle_script.substring(process.env.npm_lifecycle_script.length - 6, process.env.npm_lifecycle_script.length) === "update") {
  console.log(chalk.red.bold.bgBlack(`Force update detected !\n`));
  webImportation();
} else if (timestand_update === undefined || new Date(timestand_update) == "Invalid Date"){
  console.log(chalk.red.bold.bgBlack(`No timestand_update found !\n`));
  webImportation();
} else {
  const dateNow = new Date();
  if ((new Date(timestand_update)) - dateNow < -86400000) {
    webImportation();
  } else console.log(chalk.green.bold.bgBlack(`All your files are up to date !`));
}

function setEnvValue(key, value) {
  let ENV_VARS = [];
  let target = -1;

  // Check if the file exists
  if (fs.existsSync("./.env")) {
    // Read file & split it to an array
    ENV_VARS = fs.readFileSync("./.env", "utf8").split(os.EOL);

    // Find the env we want based on the key
    target = ENV_VARS.indexOf(ENV_VARS.find((line) => {
        return line.match(new RegExp(key));
    }));
  } else {
    // Create the file if it doesn't exist
    fs.writeFileSync("./.env", "");
  }

  // If the key was found, replace its value
  if (target > -1) {
    ENV_VARS.splice(target, 1, `${key}=${value}`);
  } else {
    // If the key was not found, add it to the end of the file
    ENV_VARS.push(`${key}=${value}`);
  }

  // Write everything back to the file system
  fs.writeFileSync("./.env", ENV_VARS.join(os.EOL));
}

async function giveMeanMinutesUpdate() {
  if (fs.existsSync("../Files/mean_minutes_update.json")) {
    try {
      const data = await fs.promises.readFile('../Files/mean_minutes_update.json', 'utf8');
      if (data.trim() === '') return null;
      let minutesMean = 0;
      let secondsMean = 0;
      obj = JSON.parse(data);
      if (obj.numbers && obj.numbers.length > 0){
        obj.numbers.forEach( elt => {
          minutesMean += elt.minutes;
          secondsMean += elt.seconds;
        });
        minutesMean /= obj.numbers.length;
        secondsMean /= obj.numbers.length;
        return {"minutes": minutesMean.toFixed(0), "seconds": secondsMean.toFixed(0)};
      }
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  } else return null;
}

function webImportation() {
  const pythonFile = '../Python/concatDataframes.py';
  const pythonProcessWebImporation = spawn('python', [pythonFile]);

  pythonProcessWebImporation.on('spawn', () => {
    currentImportation = true;
    console.log(chalk.green.bold.bgBlack(`Web imporation child process begin !`));
    giveMeanMinutesUpdate().then(result => {
      if (result) console.log(chalk.yellowBright.bold.bgBlack(`Waiting time is around ${result.minutes} minutes and ${result.seconds} seconds calculated from your last data imports. \nPlease wait !`));
      else console.log(chalk.yellowBright.bold.bgBlack(`No imports found before this importation. \nWaiting time will be short or long... \nPlease wait !`));
    });
  });

  pythonProcessWebImporation.stdout.on('data', (data) => {
    console.log(chalk.inverse.black.bold.bgBlue(`STDOUT:\n ${data}`));
  });

  pythonProcessWebImporation.stderr.on('data', (data) => {
    currentError = true;
    console.error(chalk.inverse.black.bold.bgRed(`stderr:\n ${data}`));
  });

  pythonProcessWebImporation.on('close', (code) => {
    currentImportation = false;
    console.log(chalk.inverse.blue.bold.bgBlack(`Web imporation child process exited with code ${code}`));
    if (!currentError) setEnvValue("TIMESTAND_UPDATE", new Date());
  });
}
























/*var obj = {
  numbers: []
};
obj.numbers.push({value: 13});
var json = JSON.stringify(obj);
fs.writeFile('../Files/mean_minutes_update.json', json, 'utf-8', (err) => {
  if (err) throw err;
  console.log('Saved!');
  const data = fs.readFileSync('../Files/mean_minutes_update.json');
  console.log(JSON.parse(data));
});*/