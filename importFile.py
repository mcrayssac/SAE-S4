import seaborn as sns
import pandas as pd
import numpy as np
import json

#----- Show Versions -----
#print(pd.show_versions())

#----- Import File -----
def importation(type, url):
    print("Beginning " + type + " importation")
    df = pd.read_json(url)
    print("Ending " + type + " importation")
    return df


#----- Storage File -----
def storage(df, file, type):
    print("Beginning " + type + " storage")
    out_file = open(file, "w")
    df = df.to_json()
    json.dump(df, out_file, indent = 6)
    out_file.close()
    print("Ending " + type + " storage")

#----- Variables -----
vaccinationFile = "vaccination.json"
vaccinationType = "vaccinations"
vaccinationUrl = "https://opendata.ecdc.europa.eu/covid19/vaccine_tracker/json/"

caseFile = "case.json"
caseType = "cases"
caseUrl = "https://opendata.ecdc.europa.eu/covid19/nationalcasedeath/json/"

#----- Execution -----
storage(importation(vaccinationType, vaccinationUrl), vaccinationFile, vaccinationType)
storage(importation(caseType, caseUrl), caseFile, caseType)


print("beginning cleaning")
#df_vaccin['NumberDosesReceived'] = df_vaccin['NumberDosesReceived'].replace('', np.nan)
#df_contamination = df_vaccin.dropna(subset=['NumberDosesReceived'])
print(df_vaccin.isnull().sum())
# les champs qui contiennent des nulls sont : denominator, numberDoseReceived, numberDoseExported et firstDoseRefused
print("###################################################################################################################")
df_contamination = pd.read_csv('data_conta.csv')
df_contamination.sort_index()
df_contamination.pop('note')
df_contamination['weekly_count'] = df_contamination['weekly_count'].replace('', np.nan)
df_contamination = df_contamination.dropna(subset=['weekly_count'])
df_contamination['rate_14_day'] = df_contamination['rate_14_day'].replace('', np.nan)
df_contamination = df_contamination.dropna(subset=['rate_14_day'])
df_contamination['weekly_count'] = df_contamination['weekly_count'].replace('', np.nan)
print(df_contamination.isnull().sum()) # les champs null qu'il reste sont ceux des pays avec (total) dans leur nom donc
# a voir ce qu'on fait si on leur trouve une abreviation ou autre chose
#print(df_contamination)