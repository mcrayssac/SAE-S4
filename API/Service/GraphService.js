const { spawn } = require('child_process');
const fs = require('fs')
const path = require('path')
const {read} = require("fs");

/**
 * Import data.json
 * @returns {Promise<null|*>}
 */
async function giveJsonValue(path) {
    if (fs.existsSync(path)) {
        try {
            const data = await fs.promises.readFile(path, 'utf8');
            if (data.trim() === '') return null;
            let obj = JSON.parse(data);
            return obj;
        } catch (err) {
            console.log(err);
            return null;
        }
    } else return null;
}

exports.getVaccinationPays = async (country, callback) => {
    let data = await giveJsonValue("../Files/full_df.json");
    let filterData = await data.filter(elt => elt.country && elt.country === country);
    //console.log(filterData);
    const filteredData = await filterData.map(({ YearWeekISO, cumulative_count }) => ({ YearWeekISO, cumulative_count }));
    //console.log(filteredData);
    const uniqueData = Object.values(await filteredData.reduce((acc, curr) => {
        const key = curr.YearWeekISO + curr.cumulative_count;
        if (!acc[key]) {
            acc[key] = { YearWeekISO: curr.YearWeekISO, cumulative_count: curr.cumulative_count };
        }
        return acc;
    }, {}));
    //console.log(uniqueData);
    const result = await uniqueData.reduce((acc, obj) => {
        const index = acc.findIndex(item => item.YearWeekISO === obj.YearWeekISO);
        if (index === -1) {
            acc.push(obj);
        } else {
            acc[index].cumulative_count += obj.cumulative_count;
        }
        return acc;
    }, []);
    //console.log(result);

    const renamedData = await result.map(obj => {
        return { x: obj.YearWeekISO, y: obj.cumulative_count };
    });
    //console.log(renamedData);

    const filteredCountry = await data.map(({ country }) => (`${country}`));
    //console.log(filteredCountry)
    const uniqueCountry = await filteredCountry.reduce((acc, obj) => {
        const index = acc.findIndex(item => item === obj);
        if (index === -1) {
            acc.push(obj);
        } else {
            acc[index].cumulative_count += obj.cumulative_count;
        }
        return acc;
    }, []);
    console.log(uniqueCountry);

    if (renamedData.length > 0 && uniqueCountry.length > 0) return callback(null, {data: renamedData, countries: uniqueCountry});
    else return callback("Country given not in database");

}

function createProcess(){
    new Promise((resolve,reject) =>{
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
}

exports.getContaminationPays = async (countryCode, callback) => {
    let data = read()
    const res = await createProcess()
    console.log(res)
    return callback(null, res)
}

exports.getComparisonContaminationVaccination = async (countryCode, callback) => {
    let data = read()
    let result = spawn('python', ['loadGraphDf.py/getComparison',countryCode])
    return callback(null, result)
}

exports.getWeekContamination = async (countryCode,weekNum, callback) =>{
    let data = read()
    let result =  spawn('python', ['loadGraphDf.py/getContaminationNumber',countryCode, weekNum])
    return callback(null, result)
}

exports.getWeekVaccination = async (countryCode,weekNum, callback) =>{
    let data = read()
    let result =  spawn('python', ['loadGraphDf.py/getVaccinationNumber',countryCode, weekNum])
    return callback(null, result)
}