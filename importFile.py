import seaborn as sns
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

#print(pd.show_versions())

#----- Import File -----
df_vaccin = pd.read_csv('data.csv', index_col="YearWeekISO")
df_vaccin.sort_index()

df_contamination = pd.read_csv('data_conta.csv', index_col="year_week")
df_contamination.sort_index()