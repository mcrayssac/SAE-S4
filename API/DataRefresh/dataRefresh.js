const { spawn } = require('child_process');
const chalk = require('chalk');
const fs = require("fs");
const os = require("os");

/**
 * Environment and Port configuration
 */
const dotEnv = require("dotenv");
dotEnv.config();

/**
 * If
 */

exports.main = (req, res) => {
    const timestand_update = process.env.TIMESTAND_UPDATE;
    let importation = false;
    if (process.env.npm_lifecycle_script.substring(process.env.npm_lifecycle_script.length - 6, process.env.npm_lifecycle_script.length) === "update") {
        console.log(chalk.red.bold.bgBlack(`Force update detected !\n`));
        importation = true;
    } else if (timestand_update === undefined || new Date(timestand_update) == "Invalid Date"){
        console.log(chalk.red.bold.bgBlack(`No timestand_update found !\n`));
        importation = true;
    } else {
        const dateNow = new Date();
        if ((new Date(timestand_update)) - dateNow < -86400000) {
            importation = true;
        } else console.log(chalk.green.bold.bgBlack(`All your files are up to date !`));
    }
    if (importation){
        webImportation().then(function (response) {
            console.log(response.data);
            return res.status(200).send({success:1, data: response.data});
        }).catch(function (error) {
            console.log(error.data);
            return res.status(401).send({success:0, data: `ERROR : Importation error !`});
        })
    } else return res.status(200).send({success:1, data: `All your files are up to date !`});
}

async function setEnvValue(key, value) {
    let ENV_VARS = [];
    let target = -1;

    try {
        if (fs.existsSync("./.env")) {
            ENV_VARS = fs.readFileSync("./.env", "utf8").split(os.EOL);
            target = ENV_VARS.indexOf(ENV_VARS.find((line) => {
                return line.match(new RegExp(key));
            }));
        } else {
            fs.writeFileSync("./.env", "");
        }

        if (target > -1) {
            ENV_VARS.splice(target, 1, `${key}=${value}`);
        } else {
            ENV_VARS.push(`${key}=${value}`);
        }

        await fs.promises.writeFile("./.env", ENV_VARS.join(os.EOL));
    } catch (error) {
        console.error(`Error while setting ${key}=${value}: ${error.message}`);
        throw error;
    }
}

async function giveMeanMinutesUpdate() {
    if (fs.existsSync("../../Files/mean_minutes_update.json")) {
        try {
            const data = await fs.promises.readFile('../../Files/mean_minutes_update.json', 'utf8');
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

async function webImportation() {
    const pythonFile = '../../Python/concatDataframes.py';
    const pythonProcessWebImporation = spawn('python', [pythonFile]);

    await new Promise((resolve, reject) => {
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
            console.error(chalk.inverse.black.bold.bgRed(`stderr:\n ${data}`));
            reject();
        });

        pythonProcessWebImporation.on('close', (code) => {
            console.log(chalk.inverse.blue.bold.bgBlack(`Web importation child process exited with code ${code}.`));
            setEnvValue("TIMESTAND_UPDATE", new Date()).then(function (response) {
                console.log(`Storing success ! `);
            }).catch(function (error) {
                console.log(error.data);
                reject();
            })
            resolve();
        });
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