import seaborn as sns
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

#----- Import File -----
df_vaccin = pd.read_csv('data.csv')

#----- Seaborn -----
df_vaccin.info()
fig, axes = plt.subplots(figsize=(30,20))
sns.barplot(data=df_vaccin, x="Region",  y="FirstDose")
plt.grid()
plt.xticks(rotation=90)
plt.show()