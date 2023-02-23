const { spawn } = require('child_process');
const chalk = require('chalk');
const fs = require("fs");
const os = require("os");


/**
 * Environment and Port configuration
 */
const dotEnv = require("dotenv");
dotEnv.config();
const timestand_update = process.env.TIMESTAND_UPDATE;


/**
 * If
 */
let currentImportation = false;
if (timestand_update === undefined || new Date(timestand_update) == "Invalid Date"){
  console.log(chalk.inverse.red.bold.bgBlack(`No timestand_update found !`));
  webImportation();
} else {
  const dateNow = new Date();
  if ((new Date(timestand_update)) - dateNow < -86400000) {
    webImportation();
  }
}

function setEnvValue(key, value) {

  let ENV_VARS = [];
  let target = -1;

  // Check if the file exists
  if (fs.existsSync("./.env")) {
    // read file from hdd & split it from a linebreak to an array
    ENV_VARS = fs.readFileSync("./.env", "utf8").split(os.EOL);

    // find the env we want based on the key
    target = ENV_VARS.indexOf(ENV_VARS.find((line) => {
        return line.match(new RegExp(key));
    }));
  } else {
    // create the file if it doesn't exist
    fs.writeFileSync("./.env", "");
  }

  // if the key was found, replace its value
  if (target > -1) {
    ENV_VARS.splice(target, 1, `${key}=${value}`);
  } else {
    // if the key was not found, add it to the end of the file
    ENV_VARS.push(`${key}=${value}`);
  }

  // write everything back to the file system
  fs.writeFileSync("./.env", ENV_VARS.join(os.EOL));
}

function webImportation() {
  const pythonFile = '../Python/Web_importation/importFile.py';
  const pythonProcessWebImporation = spawn('python', [pythonFile]);

  pythonProcessWebImporation.on('spawn', () => {
    currentImportation = true;
    console.log(chalk.inverse.blue.bold.bgBlack(`Web imporation child process begin !`));
  });

  pythonProcessWebImporation.stdout.on('data', (data) => {
    console.log(chalk.inverse.black.bold.bgBlue(`STDOUT:\n ${data}`));
  });

  pythonProcessWebImporation.stderr.on('data', (data) => {
    console.error(chalk.inverse.black.bold.bgRed(`stderr:\n ${data}`));
  });

  pythonProcessWebImporation.on('close', (code) => {
    currentImportation = false;
    console.log(chalk.inverse.blue.bold.bgBlack(`Web imporation child process exited with code ${code}`));
    setEnvValue("TIMESTAND_UPDATE", new Date());
  });
}

/*var obj = {
  numbers: []
};
obj.numbers.push({value: 13});
obj.numbers.push({value: 12});
obj.numbers.push({value: 11});
obj.numbers.push({value: 10});
obj.numbers.push({value: 8});
var json = JSON.stringify(obj);
fs.writeFile('../Files/mean_minutes_update.json', json, 'utf-8', (err) => {
  if (err) throw err;
  console.log('Saved!');
  const data = fs.readFileSync('../Files/mean_minutes_update.json');
  console.log(JSON.parse(data));
});*/

function giveMeanMinutesUpdate() {
  if (fs.existsSync("../Files/mean_minutes_update.json")) {
    fs.readFile('../Files/mean_minutes_update.json', 'utf8', (err, data) => {
      if (err) console.log(err);
      else {
        let mean = 0;
        obj = JSON.parse(data);
        obj.numbers.forEach( elt => {
          mean += elt.value;
        });
        mean /= obj.numbers.length;
        return mean;
      }
    });
  } else return null
}

//giveMeanMinutesUpdate()