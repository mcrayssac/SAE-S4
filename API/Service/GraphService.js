const PythonShell = require('python-shell')
const fs = require('fs')
const path = require('path')

const read = ()=>{
    const absolutePath = path.resolve("../Files/full_df.json");
    let dataBuffer = fs.readFileSync(absolutePath);
    const dataJSON = JSON.parse(dataBuffer.toString());
    return dataJSON
}

const accueil =()=>{
    const data = read()
    return data;
}

const getVaccinationPays = async (countryCode, callback) => {
    let data = read()
    await PythonShell.run('file.py/getVaccination', [countryCode])
        .then(results=>{
            return callback(null, results);
        })
        .catch(error=>{
            return callback(error, null);
        })
}

const getContaminationPays = async (countryCode, callback) => {
    let data = read()
    await PythonShell.run('file.py/getContamination', [countryCode])
        .then(results=>{
            return callback(null, results)
        })
        .catch(error=>{
            return callback(error, null)
        })
}

const getComparisonContaminationVaccination = async (countryCode, callback) => {
    let data = read()
    await PythonShell.run('file.py/getComparison', [countryCode])
        .then(results=>{
            return callback(null, results)
        })
        .catch(error=>{
            return calllback(error, null)
        })
}

const getWeekContamination = async (countryCode,weekNum, callback) =>{
    let data = read()
    await PythonShell.run('file.py/getContaminationNumber', [countryCode, weekNum])
        .then(results=>{
            return callback(null, results)
        })
        .catch(error=>{
            return callback(error, null)
        })
}

const getWeekVaccination = async (countryCode,weekNum, callback) =>{
    let data = read()
    await PythonShell.run('file.py/getContaminationNumber', [countryCode, weekNum])
        .then(results=>{
            return callback(null, results)
        })
        .catch(error=>{
            return callback(error, null)
        })
}

module.exports = {
    getVaccinationPays: getVaccinationPays,
    getContaminationPays: getContaminationPays,
    getComparisonContaminationVaccination: getComparisonContaminationVaccination,
    getWeekContamination: getWeekContamination,
    getWeekVaccination: getWeekVaccination,
    accueil: accueil
}