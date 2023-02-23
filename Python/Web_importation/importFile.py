import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import json
from urllib.request import urlopen
from datetime import datetime

#----- Show Versions -----
#print(pd.show_versions())
totalTime = 0

#----- Import File -----
def importation(type, url):
    beginTime = startTime()
    print("Beginning " + type + " importation")
    #df = pd.read_json(url)
    in_file = urlopen(url)
    df = json.loads(in_file.read())
    print("Ending " + type + " importation")
    endTime(beginTime)
    return df

#----- Start Time -----
def startTime():
    return datetime.now()

#----- End Time -----
def endTime(beginTime):
    global totalTime
    endTime = datetime.now()
    diffTime = endTime-beginTime
    diffMinSecTime = divmod(diffTime.total_seconds(), 60)
    totalTime += diffMinSecTime[0] 
    print('Total time to load dataframe: ', diffMinSecTime[0], 'minutes', diffMinSecTime[1], 'seconds')

#----- Storage Time -----
def storageTime():
    in_file = open("../Files/mean_minutes_update.json")
    obj = json.load(in_file)
    obj["numbers"].append({"value": totalTime})
    out_file = open("../Files/mean_minutes_update.json", "w")
    json.dump(obj, out_file, indent = 6)
    in_file.close()
    out_file.close()
    print("Ending time storage")

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
    storageTime()

execution()