const graphService = require("../Service/GraphService")

exports.accueil = (req, res) => {
    console.log("il est passé par ici");
    data = graphService.accueil()
    return res.status(200).send({success: 1, data: data})
}

exports.graphVaccination = (req, res) => {
    let codeCountry = req.params.codeCountry;
    graphService.getVaccinationPays(codeCountry, (error, results)=>{
        if(error){
            console.log(error);
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: results})
    });
}

exports.graphContamination = (req, res) => {
    let codeCountry = req.params.codeCountry;
    graphService.getContaminationPays(codeCountry, (error, results)=>{
        if(error){
            console.log(error);
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: results})
    });
}

exports.graphComparison = (req, res) => {
    let codeCountry = req.params.codeCountry;
    graphService.getComparisonContaminationVaccination(codeCountry, (error, results)=>{
        if(error){
            console.log(error);
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: results})
    });
}

exports.prediction = (req, res) =>{
    let codeCountry = req.params.codeCountry;
    return ("okayyyyyyyyy4 : "+codeCountry);
}