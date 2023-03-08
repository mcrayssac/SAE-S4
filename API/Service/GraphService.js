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

/**
 * Give unique countries in full_df.json
 * @returns {Promise<*>}
 */
async function giveCountriesValues(data) {
    const filteredCountry = await data.map(({ country }) => (`${country}`));
    const uniqueCountry = await filteredCountry.reduce((acc, obj) => {
        const index = acc.findIndex(item => item === obj);
        if (index === -1) {
            acc.push(obj);
        }
        return acc;
    }, []);
    //console.log(uniqueCountry);
    return uniqueCountry;
}


async function giveIntervalValues(data) {
    const filteredCountry = await data.map(({ YearWeekISO }) => (`${YearWeekISO}`));
    const uniqueCountry = await filteredCountry.reduce((acc, obj) => {
        const index = acc.findIndex(item => item === obj);
        if (index === -1) {
            acc.push(obj);
        }
        return acc;
    }, []);
    //console.log(uniqueCountry);
    return uniqueCountry;
}

async function giveCumulatedCasesValues(country, data) {
    let filteredData = await data.filter(elt => elt.country && elt.country === country && elt.indicator && elt.indicator === 'cases');
    let mappedData = await filteredData.map(({ YearWeekISO, cumulative_count }) => ({ YearWeekISO, cumulative_count }));
    const uniqueData = await mappedData.reduce((acc, obj) => {
        const index = acc.findIndex(item => item.cumulative_count === obj.cumulative_count && item.YearWeekISO === obj.YearWeekISO);
        if (index === -1) {
            acc.push(obj);
        }
        return acc;
    }, []);
    mappedData = await uniqueData.map(obj => {
        return { x: obj.YearWeekISO, y: obj.cumulative_count };
    });
    return mappedData;
}

async function giveVaccinationsValues(country, data) {
    let filterData = await data.filter(elt => elt.country && elt.country === country);
    //console.log(filterData);
    const filteredData = await filterData.map(({ YearWeekISO, FirstDose, SecondDose, DoseAdditional1, DoseAdditional2, DoseAdditional3, DoseUnk }) => ({ YearWeekISO, FirstDose, SecondDose, DoseAdditional1, DoseAdditional2, DoseAdditional3, DoseUnk }));
    //console.log(filteredData);
    const cleanedData = filteredData.map(d => ({
        ...d,
        TotalDoses: isNaN(d.TotalDoses) ? 0 : d.TotalDoses,
        FirstDose: isNaN(d.FirstDose) ? 0 : d.FirstDose,
        SecondDose: isNaN(d.SecondDose) ? 0 : d.SecondDose,
        DoseAdditional1: isNaN(d.DoseAdditional1) ? 0 : d.DoseAdditional1,
        DoseAdditional2: isNaN(d.DoseAdditional2) ? 0 : d.DoseAdditional2,
        DoseAdditional3: isNaN(d.DoseAdditional3) ? 0 : d.DoseAdditional3,
        DoseUnk: isNaN(d.DoseUnk) ? 0 : d.DoseUnk
    }));
    const mergedData = cleanedData.map(d => ({
        ...d,
        TotalDoses: d.FirstDose + d.SecondDose + d.DoseAdditional1 + d.DoseAdditional2 + d.DoseAdditional3 + d.DoseUnk,
        FirstDose: d.FirstDose,
        SecondDose: d.SecondDose,
        DoseAdditional1: d.DoseAdditional1,
        DoseAdditional2: d.DoseAdditional2,
        DoseAdditional3: d.DoseAdditional3,
        DoseUnk: d.DoseUnk
    }));

    //console.log(mergedData);
    const uniqueData = Object.values(await mergedData.reduce((acc, curr) => {
        const key = curr.YearWeekISO + curr.TotalDoses;
        if (!acc[key]) {
            acc[key] = { YearWeekISO: curr.YearWeekISO, TotalDoses: curr.TotalDoses };
        }
        return acc;
    }, {}));
    //console.log(uniqueData);
    const result = await uniqueData.reduce((acc, obj) => {
        const index = acc.findIndex(item => item.YearWeekISO === obj.YearWeekISO);
        if (index === -1) {
            acc.push(obj);
        } else {
            acc[index].TotalDoses += obj.TotalDoses;
        }
        return acc;
    }, []);
    //console.log(result);
    let renamedData = await result.map(obj => {
        return {x: obj.YearWeekISO, y: obj.TotalDoses};
    });
    //console.log(renamedData);
    return renamedData;
}

exports.getVaccinationPays = async (country, intervalStart, intervalEnd, callback) => {
    let data = await giveJsonValue("../Files/full_df.json");
    let vaccinationsValues = null;
    let cumulatedCasesValues = null;
    if (country && intervalStart && intervalEnd){
        console.log(country, intervalStart, intervalEnd);
        cumulatedCasesValues = await giveCumulatedCasesValues(country, data);
        //console.log(cumulatedCasesValues);

        vaccinationsValues = await giveVaccinationsValues(country, data);
        //console.log(vaccinationsValues);
    }

    const countries = await giveCountriesValues(data);
    //console.log(countries)

    const interval = await giveIntervalValues(data)
    //console.log(interval);

    if (vaccinationsValues && vaccinationsValues.length > 0) {
        if (countries && countries.length > 0 && interval && interval.length > 0) return callback(null, {vaccinationsValues, cumulatedCasesValues, countries, interval});
        else return callback("No countries found");
    } else {
        if (countries && countries.length > 0 && interval && interval.length > 0) return callback(null, {vaccinationsValues, cumulatedCasesValues, countries, interval});
        else return callback("Country given not in database");
    }

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