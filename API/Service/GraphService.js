const PythonShell = require('python-shell')

const read = (file)=>{
    const dataBuffer = fs.readFileSync(file);
    let dataJSON = dataBuffer.toString();
    dataJSON = JSON.parse(dataJSON);
    return dataJSON
}

const getVaccinationPays = async (countryCode, callback) => {
    data = read("../../Files/full_df.json")
    await PythonShell.run('file.py/getVaccination', [countryCode])
        .then(results=>{
            return callback(null, results)
        })
        .catch(error=>{
            return callback(error, null)
        })
}

const getContaminationPays = async (countryCode, callback) => {
    data = read("../../Files/full_df.json")
    await PythonShell.run('file.py/getContamination', [countryCode])
        .then(results=>{
            return callback(null, results)
        })
        .catch(error=>{
            return callback(error, null)
        })
}

const getComparisonContaminationVaccination = async (countryCode, callback) => {
    data = read("../../Files/full_df.json")
    await PythonShell.run('file.py/getComparison', [countryCode])
        .then(results=>{
            return callback(null, results)
        })
        .catch(error=>{
            return calllback(error, null)
        })
}

const getWeekContamination = async (countryCode,weekNum, callback) =>{
    data = read("../../Files/full_df.json")
    await PythonShell.run('file.py/getContaminationNumber', [countryCode, weekNum])
        .then(results=>{
            return callback(null, results)
        })
        .catch(error=>{
            return callback(error, null)
        })
}

const getWeekVaccination = async (countryCode,weekNum, callback) =>{
    data = read("../../Files/full_df.json")
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