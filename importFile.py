import seaborn as sns
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

#print(pd.show_versions())

#----- Import File -----
#df_vaccin = pd.read_csv('data.csv')
print("Beginning")
url = "https://opendata.ecdc.europa.eu/covid19/vaccine_tracker/json/"
df_vaccin = pd.read_json(url)
df_vaccin.sort_index()
print(df_vaccin)
print("Ending")

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