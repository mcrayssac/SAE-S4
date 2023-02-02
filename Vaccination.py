import importFile
import readFile
import convertDate

sns = importFile.sns
plt = importFile.plt
pd = importFile.pd
np = importFile.np

#----- Import File -----
df_vaccin = readFile.execution("vaccinations")
df_vaccin = pd.DataFrame.from_records(df_vaccin['records'])
print(df_vaccin)

#----- Changing date format
df_vaccin = df_vaccin.rename(columns={'YearWeekISO':'date'})
df_vaccin['date'] = df_vaccin['date'].str.replace('-','')
df_vaccin['date'] = df_vaccin['date'].apply(convertDate.get_start_end_dates)
print(df_vaccin)

"""

#----- See versions -----
#print(pd.show_versions())

#----- Seaborn -----
def seeInfos():
    df_vaccin.info()
    df_vaccin.describe

#----- Number of first doses depending on the region -----
def regionFirstDose():
    is_FirstDose_50000 = df_vaccin["FirstDose"] > 50000
    plt.subplots(figsize=(35,20))
    sns.barplot(data=df_vaccin[is_FirstDose_50000], x="Region",  y="FirstDose")
    plt.grid()
    plt.title("Number of first doses depending on the region", fontsize=20)
    plt.ylabel("FirstDose", fontsize=15)
    plt.xlabel("Region", fontsize=15)
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

def regionFirstDoseSecondDose():
    is_FirstDose_50000 = df_vaccin["FirstDose"] > 50000
    is_SecondDose_50000 = df_vaccin["SecondDose"] > 50000
    plt.subplots(figsize=(35,20))
    sns.relplot(data=df_vaccin[is_FirstDose_50000], x="SecondDose",  y="FirstDose")
    plt.grid()
    plt.title("Number of first doses depending on the region", fontsize=20)
    plt.ylabel("SecondDose", fontsize=15)
    plt.xlabel("FirstDose", fontsize=15)
    plt.xticks(rotation=90)
    plt.show()


#----- Execute -----
#regionFirstDose()
regionFirstDoseSecondDose()

"""