import json

#----- Load File -----
def load(type, path):
    print("Beginning " + type + " loading")
    df = json.load(open(path))
    print("Ending " + type + " loading")
    return df

#----- Variables -----
vaccinationPath = "../Files/vaccination.json"
vaccinationType = "vaccinations"

vaccinationArchivedPath = "../Files/vaccinationArchived.json"
vaccinationArchivedType = "vaccinationsArchived"

casePath = "../Files/case.json"
caseType = "cases"

#----- Execution -----
def execution(type):
    if type == caseType:
        return load(caseType, casePath)
    elif type == vaccinationType:
        return load(vaccinationType, vaccinationPath)
    elif type == vaccinationArchivedType:
        return load(vaccinationArchivedType, vaccinationArchivedPath)
    else:
        return