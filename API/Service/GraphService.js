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
async function giveCountriesValues() {
    const data = await giveJsonValue("../Files/full_df.json");
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


async function giveIntervalValues() {
    const data = await giveJsonValue("../Files/full_df.json");
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

async function giveIntervalValues() {
    const data = await giveJsonValue("../Files/full_df.json");
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

exports.getVaccinationPays = async (country, intervalStart, intervalEnd, callback) => {
    let data = await giveJsonValue("../Files/full_df.json");
    let renamedData = null;
    let temp3 = null;
    if (country && intervalStart && intervalEnd){
        let temp1 = await data.filter(elt => elt.country && elt.country === country && elt.indicator && elt.indicator === 'cases');
        const temp2 = await temp1.map(({ YearWeekISO, cumulative_count }) => ({ YearWeekISO, cumulative_count }));
        //console.log(temp2);
        temp3 = await temp2.map(obj => {
            return { x: obj.YearWeekISO, y: obj.cumulative_count };
        });

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
        renamedData = await result.map(obj => {
            return { x: obj.YearWeekISO, y: obj.TotalDoses };
        });
        //console.log(renamedData);

    }

    const countries = await giveCountriesValues();
    //console.log(countries)

    const interval = await giveIntervalValues()
    //console.log(interval);

    if (renamedData && renamedData.length > 0) {
        if (countries && countries.length > 0 && interval && interval.length > 0) return callback(null, {data: renamedData, data2: temp3, countries, interval});
        else return callback("No countries found");
    } else {
        if (countries && countries.length > 0 && interval && interval.length > 0) return callback(null, {data: null, data2: null, countries, interval});
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