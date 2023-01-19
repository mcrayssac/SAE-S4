import importFile

sns = importFile.sns
plt = importFile.plt
pd = importFile.pd
np = importFile.np
df_vaccin = importFile.df_vaccin

#----- Seaborn -----
df_vaccin.info()
fig, axes = plt.subplots(figsize=(30,20))
sns.barplot(data=df_vaccin, x="Region",  y="FirstDose")
plt.grid()
plt.xticks(rotation=90)
plt.show()

fig2 = plt.figure(figsize=(35,25))
sns.lineplot(data=df_vaccin, x="YearWeekISO", y="FirstDose")
plt.xlabel("date as year and week")
plt.ylabel("number of first dose accross the world")
plt.title("evolution of the number of first dose administered through the world in from the end of 2020 to 2023")
plt.xticks(rotation=90)
plt.grid()
plt.show()
