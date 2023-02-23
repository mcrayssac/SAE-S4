import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import json
from urllib.request import urlopen
from datetime import datetime

#----- Show Versions -----
#print(pd.show_versions())

#----- Import File -----
def importation(type, url):
    beginTime = datetime.now()
    print("Beginning " + type + " importation")
    #df = pd.read_json(url)
    in_file = urlopen(url)
    df = json.loads(in_file.read())
    print("Ending " + type + " importation")
    endTime = datetime.now()
    diffTime = endTime-beginTime
    diffMinSecTime = divmod(diffTime.total_seconds(), 60)
    print('Total time to load dataframe: ', diffMinSecTime[0], 'minutes', diffMinSecTime[1], 'seconds')
    return df

#----- Storage File -----
def storage(df, file, type):
    print("Beginning " + type + " storage")
    out_file = open(file, "w")
    json.dump(df, out_file, indent = 6)
    out_file.close()
    print("Ending " + type + " storage")

#----- Variables -----
vaccinationFile = "../Files/vaccination.json"
vaccinationType = "vaccinations"
vaccinationUrl = "https://opendata.ecdc.europa.eu/covid19/vaccine_tracker/json/"

caseFile = "../Files/case.json"
caseType = "cases"
caseUrl = "https://opendata.ecdc.europa.eu/covid19/nationalcasedeath/json/"

#----- Execution -----
def execution():
    storage(importation(caseType, caseUrl), caseFile, caseType)
    storage(importation(vaccinationType, vaccinationUrl), vaccinationFile, vaccinationType)