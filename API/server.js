const { spawn } = require('child_process');
const chalk = require('chalk');

const pythonFile = '../Python/Web_importation/importFile.py';
const args = ['argument1', 'argument2'];

const pythonProcessWebImporation = spawn('python', [pythonFile/*, ...args*/]);
console.log(chalk.inverse.blue.bold.bgBlack(` Web imporation child process begin ! `));

pythonProcessWebImporation.stdout.on('data', (data) => {
  console.log(chalk.inverse.black.bold.bgBlue(`STDOUT:\n ${data}`));
});

pythonProcessWebImporation.stderr.on('data', (data) => {
  console.error(chalk.inverse.black.bold.bgRed(`stderr:\n ${data}`));
});

pythonProcessWebImporation.on('close', (code) => {
  console.log(chalk.inverse.black.bold.bgBlue(`Web imporation child process exited with code ${code}`));
});