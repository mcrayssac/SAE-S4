const PythonShell = require('python-shell')
const fs = require('fs')

const read = ()=>{
    let file = fs.open('../../Files/full_df.json')
    const dataBuffer = fs.readFileSync(file);
    let dataJSON = dataBuffer.toString();
    dataJSON = JSON.parse(dataJSON);
    console.log(dataJSON)
    return dataJSON
}

const accueil =()=>{
    let data = read()
    return data;
}

const getVaccinationPays = async (countryCode, callback) => {
    let data = read()
    await PythonShell.run('file.py/getVaccination', [countryCode])
        .then(results=>{
            return callback(null, results)
        })
        .catch(error=>{
            return callback(error, null)
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