import json
from datetime import datetime

#----- Load File -----
def load(type, path):
    beginTime = datetime.now()
    print("Beginning " + type + " importation")
    df = json.load(open(path))
    print("Ending " + type + " importation")
    endTime = datetime.now()
    diffTime = endTime-beginTime
    diffMinSecTime = divmod(diffTime.total_seconds(), 60)
    print('Total time to load dataframe: ', diffMinSecTime[0], 'minutes', diffMinSecTime[1], 'seconds')
    return df

#----- Variables -----
vaccinationPath = "vaccination.json"
vaccinationType = "vaccinations"

casePath = "case.json"
caseType = "cases"

#----- Execution -----
def execution(type):
    if type == caseType:
        return load(caseType, casePath)
    elif type == vaccinationType:
        return load(vaccinationType, vaccinationPath)
    else:
        return