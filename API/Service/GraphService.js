const { spawn } = require('child_process');
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
    let result = spawn('python', ['loadGraphDf.py/getVaccination',countryCode])
    return callback(null, result)
}

const getContaminationPays = async (countryCode, callback) => {
    let data = read()
    await new Promise((resolve,reject) =>{
        let result = spawn('python', ['loadGraphDf.py/getContamination']);
        let results = ""
        result.stdout.on('data', (data)=>{
            results+= data
        });
        result.on('close', ()=>{
            resolve(result)
        });
        result.on('error', (err)=>{
            reject(err)
        })
    })
        .then(result=>{
            return callback(null, result)
        })
        .catch(error=>{
            return callback(error, null)
        })
}

const getComparisonContaminationVaccination = async (countryCode, callback) => {
    let data = read()
    let result = spawn('python', ['loadGraphDf.py/getComparison',countryCode])
    return callback(null, result)
}

const getWeekContamination = async (countryCode,weekNum, callback) =>{
    let data = read()
    let result =  spawn('python', ['loadGraphDf.py/getContaminationNumber',countryCode, weekNum])
    return callback(null, result)
}

const getWeekVaccination = async (countryCode,weekNum, callback) =>{
    let data = read()
    let result =  spawn('python', ['loadGraphDf.py/getVaccinationNumber',countryCode, weekNum])
    return callback(null, result)
}

module.exports = {
    getVaccinationPays: getVaccinationPays,
    getContaminationPays: getContaminationPays,
    getComparisonContaminationVaccination: getComparisonContaminationVaccination,
    getWeekContamination: getWeekContamination,
    getWeekVaccination: getWeekVaccination,
    accueil: accueil
}