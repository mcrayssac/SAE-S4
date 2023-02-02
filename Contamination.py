import itertools

import importFile

sns = importFile.sns
plt = importFile.plt
pd = importFile.pd
np = importFile.np
df_contamination = importFile.df_contamination

print(df_contamination.isnull().sum().sum())

def globalContaByWeek():
    plt.figure(figsize=(35,25))
    sns.lineplot(data=df_contamination, x="year_week", y="cumulative_count")
    plt.xlabel("date as year and week")
    plt.ylabel("number of contamination")
    plt.title("evolution of the number of cases through the world from the end of 2020 to 2023")
    plt.xticks(rotation=90)
    plt.grid()
    plt.show()

def evolutionContaminationRateByWeek(country):
    plt.figure(figsize=(35, 25))
    df_contamination_country = df_contamination["country"] == country
    sns.lineplot(data=df_contamination[df_contamination_country], x="year_week", y="weekly_count")
    plt.xlabel("date as year and week")
    plt.ylabel("number of contamination")
    plt.title("evolution of the number of cases in "+country+" from the end of 2020 to 2023")
    plt.xticks(rotation=90)
    plt.grid()
    plt.show()



# execute
#globalContaByWeek()
#evolutionContaminationRateByWeek('Africa (total)')
#evolutionContaminationRateByWeek('France')