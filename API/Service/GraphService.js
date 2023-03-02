const PythonShell = require('python-shell')

const getVaccinationPays = async (countryCode, callback) => {
    await PythonShell.run('file.py/getVaccination', [countryCode])
        .then(results=>{
            return callback(null, results)
        })
        .catch(error=>{
            return callback(error, null)
        })
}

const getContaminationPays = async (countryCode, callback) => {
    await PythonShell.run('file.py/getContamination', [countryCode])
        .then(results=>{
            return callback(null, results)
        })
        .catch(error=>{
            return callback(error, null)
        })
}

const getComparisonContaminationVaccination = async (countryCode, callback) => {
    await PythonShell.run('file.py/getComparison', [countryCode])
        .then(results=>{
            return callback(null, results)
        })
        .catch(error=>{
            return calllback(error, null)
        })
}

const getWeekContamination = async (countryCode,weekNum, callback) =>{
    await PythonShell.run('file.py/getContaminationNumber', [countryCode, weekNum])
        .then(results=>{
            return callback(null, results)
        })
        .catch(error=>{
            return callback(error, null)
        })
}

const getWeekVaccination = async (countryCode,weekNum, callback) =>{
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
    getWeekVaccination: getWeekVaccination
}