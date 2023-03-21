const graphService = require("../Service/GraphService")

exports.accueil = (req, res) => {
    console.log("il est passé par ici");
    graphService.accueil((error, results)=>{
        if(error){
            console.log(error);
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: results})
    });
}

exports.giveVaccine = async (req, res) => {
    await graphService.giveVaccines((error, results)=>{
        if(error){
            console.log(error);
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: results})
    });
}

exports.giveCountries = async (req, res) => {
    let vaccine = req.params.vaccine
    await graphService.giveCountries(vaccine, (error, results)=>{
        if(error){
            console.log(error);
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: results})
    });
}

exports.giveInterval = async (req, res) => {
    let vaccine = req.params.vaccine
    let country = req.params.country
    await graphService.giveIntervals(vaccine, country, (error, results)=>{
        if(error){
            console.log(error);
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: results})
    });
}

exports.graphVaccination = (req, res) => {
    let country = req.params.country;
    let intervalStart = req.params.intervalStart;
    let intervalEnd = req.params.intervalEnd;
    graphService.getVaccinationPays(country, intervalStart, intervalEnd, (error, results)=>{
        if(error){
            console.log(error);
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: results})
    });
}

exports.graphCaseVaccinationRelation = (req, res) => {
    let country = req.params.country;
    graphService.getCaseVaccinationRelation(country, (error, results)=>{
        if(error){
            console.log(error);
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: results})
    });
}

exports.graphWorldMapCases = (req, res) => {
    graphService.getWorldMapCases((error, results)=>{
        if(error){
            console.log(error);
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: results})
    });
}

exports.graphPrediction = (req, res) => {
    let country = req.params.country;
    let transmission = req.params.transmission;
    let duration = req.params.duration;
    let survival = req.params.survival;
    graphService.getPredictionValue(country, transmission, duration, survival, (error, results)=>{
        if(error){
            console.log(error);
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: results})
    })

}