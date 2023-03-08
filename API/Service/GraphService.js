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

async function giveCumulatedCasesValues(country, intervalStart, intervalEnd, data) {
    let filteredData = await data.filter(elt => elt.country && elt.country === country && elt.indicator && elt.indicator === 'cases' && elt.YearWeekISO && verifyIntervalStart(elt, intervalStart) && verifyIntervalEnd(elt, intervalEnd));
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

function verifyIntervalStart(elt, intervalStart) {
    return ((intervalStart.substring(0, 4) < elt.YearWeekISO.substring(0, 4)) || (intervalStart.substring(0, 4) === elt.YearWeekISO.substring(0, 4) && (intervalStart.substring(6, 8) < elt.YearWeekISO.substring(6, 8) || intervalStart.substring(6, 8) === elt.YearWeekISO.substring(6, 8))));
}

function verifyIntervalEnd(elt, intervalEnd) {
    return ((elt.YearWeekISO.substring(0, 4) < intervalEnd.substring(0, 4)) || (elt.YearWeekISO.substring(0, 4) === intervalEnd.substring(0, 4) && (elt.YearWeekISO.substring(6, 8) < intervalEnd.substring(6, 8) || elt.YearWeekISO.substring(6, 8) === intervalEnd.substring(6, 8))));
}

async function giveVaccinationsValues(country, intervalStart, intervalEnd, data) {
    let filterData = await data.filter(elt => elt.country && elt.country === country && elt.YearWeekISO && verifyIntervalStart(elt, intervalStart) && verifyIntervalEnd(elt, intervalEnd));
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

async function giveIndicatorValues(country, intervalStart, intervalEnd, data, indicator) {
    const filterData = await data.filter(elt => elt.country && elt.country === country && elt.indicator && elt.indicator === indicator && elt.YearWeekISO && verifyIntervalStart(elt, intervalStart) && verifyIntervalEnd(elt, intervalEnd));
    const filteredData = await filterData.map(({ YearWeekISO, weekly_count }) => ({ YearWeekISO, weekly_count }));
    const uniqueData = await filteredData.reduce((acc, obj) => {
        const index = acc.findIndex(item => item.YearWeekISO === obj.YearWeekISO && item.weekly_count === obj.weekly_count);
        if (index === -1) {
            acc.push(obj);
        }
        return acc;
    }, []);
    const renamedData = await uniqueData.map(obj => {
        return {x: obj.YearWeekISO, y: obj.weekly_count};
    });
    return renamedData
}

exports.getVaccinationPays = async (country, intervalStart, intervalEnd, callback) => {
    let data = await giveJsonValue("../Files/full_df.json");
    let casesValues = null;
    let deathsValues = null;
    let vaccinationsValues = null;
    let cumulatedCasesValues = null;
    if (country && intervalStart && intervalEnd){
        //console.log(country, intervalStart, intervalEnd);

        casesValues = await giveIndicatorValues(country, intervalStart, intervalEnd, data, 'cases');
        //console.log(casesValues);

        deathsValues= await giveIndicatorValues(country, intervalStart, intervalEnd, data, 'deaths');
        //console.log(deathsValues);

        cumulatedCasesValues = await giveCumulatedCasesValues(country, intervalStart, intervalEnd, data);
        //console.log(cumulatedCasesValues);

        vaccinationsValues = await giveVaccinationsValues(country, intervalStart, intervalEnd, data);
        //console.log(vaccinationsValues);
    }

    const countries = await giveCountriesValues(data);
    //console.log(countries)

    const interval = await giveIntervalValues(data)
    //console.log(interval);

    if (vaccinationsValues && vaccinationsValues.length > 0) {
        if (countries && countries.length > 0 && interval && interval.length > 0) return callback(null, {casesValues, deathsValues, vaccinationsValues, cumulatedCasesValues, countries, interval});
        else return callback("No countries found");
    } else {
        if (countries && countries.length > 0 && interval && interval.length > 0) return callback(null, {casesValues, deathsValues, vaccinationsValues, cumulatedCasesValues, countries, interval});
        else return callback("Country given not in database");
    }

}

exports.accueil = async(callback) => {
    try{
        callback(null, "I'm testing guys chill, and you know, our root's route (get it ;3) is working just fine~");
    } catch (err){
        callback(err);
    }
}