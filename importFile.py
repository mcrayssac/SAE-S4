import seaborn as sns
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import requests
from pandas.io.json import json_normalize

#print(pd.show_versions())

#----- Import File -----
#df_vaccin = pd.read_csv('data.csv')
print("Beginning")
url = "https://opendata.ecdc.europa.eu/covid19/vaccine_tracker/json/"
df_vaccin = pd.read_json(url)
df_vaccin.sort_index()
print(df_vaccin)
print("Ending")

#df_contamination = pd.read_csv('data_conta.csv', index_col="year_week")
#df_contamination.sort_index()