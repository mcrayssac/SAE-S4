const graphService = require("../Service/GraphService")

exports.accueil = (req, res) => {
    console.log("il est passé par ici");
    return ("IT'S ALIIIIIIIIIIIVE");
}

exports.graphVaccination = (req, res) => {
    let codeCountry = req.params.codeCountry;
    return ("okaaaaayyyyyyy1 : "+codeCountry);
}

exports.graphContamination = (req, res) => {
    let codeCountry = req.params.codeCountry;
    return ("okaaaaayyyyyyy2 : "+codeCountry);
}

exports.graphComparison = (req, res) => {
    let codeCountry = req.params.codeCountry;
    return ("okaaaaayyyyyyy3 : "+codeCountry)
}

exports.prediction = (req, res) =>{
    let codeCountry = req.params.codeCountry;
    return ("okayyyyyyyyy4 : "+codeCountry)
}