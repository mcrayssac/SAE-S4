import json
from datetime import datetime

#----- Load File -----
def load(type, path):
    beginTime = datetime.now()
    print("Beginning " + type + " loading")
    df = json.load(open(path))
    print("Ending " + type + " loading")
    endTime = datetime.now()
    diffTime = endTime-beginTime
    diffMinSecTime = divmod(diffTime.total_seconds(), 60)
    print('Total time to load dataframe: ', diffMinSecTime[0], 'minutes', diffMinSecTime[1], 'seconds')
    return df

#----- Variables -----
vaccinationPath = "../Files/vaccination.json"
vaccinationType = "vaccinations"

casePath = "../Files/case.json"
caseType = "cases"

#----- Execution -----
def execution(type):
    if type == caseType:
        return load(caseType, casePath)
    elif type == vaccinationType:
        return load(vaccinationType, vaccinationPath)
    else:
        return