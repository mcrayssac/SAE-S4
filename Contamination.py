import importFile

sns = importFile.sns
plt = importFile.plt
pd = importFile.pd
np = importFile.np
df_contamination = importFile.df_contamination

fig2 = plt.figure(figsize=(35,25))
sns.lineplot(data=df_contamination, x="year_week", y="cumulative_count")
plt.xlabel("date as year and week")
plt.ylabel("number of death")
plt.title("evolution of the number of death through the world in from the end of 2020 to 2023")
plt.xticks(rotation=90)
plt.grid()
plt.show()