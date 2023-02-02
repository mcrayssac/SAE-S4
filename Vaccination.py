import importFile

#----- Import files -----
sns = importFile.sns
plt = importFile.plt
pd = importFile.pd
np = importFile.np
df_vaccin = importFile.df_vaccin

#----- See versions -----
def seeVersions():
    print(pd.show_versions())

#----- Seaborn -----
def seeInfos():
    df_vaccin.info()

#----- Number of first doses depending on the region -----
def regionFirstDose():
    is_FirstDose_50000 = df_vaccin["FirstDose"] > 50000
    fig = plt.figure(figsize=(35,20))
    sns.barplot(data=df_vaccin[is_FirstDose_50000], x="Region",  y="FirstDose")
    plt.grid()
    plt.title("Number of first doses depending on the region", fontsize=20)
    plt.ylabel("FirstDose", fontsize=15)
    plt.xlabel("Region", fontsize=15)
    plt.xticks(rotation=90)
    plt.show()

def yearWeekISOFirstDose():
    fig = plt.figure(figsize=(35,25))
    sns.lineplot(data=df_vaccin, x="YearWeekISO", y="FirstDose")
    plt.xlabel("Date as year and week")
    plt.ylabel("Number of first dose accross the world")
    plt.title("Evolution of the number of first dose administered through the world in from the end of 2020 to 2023")
    plt.xticks(rotation=90)
    plt.grid()
    plt.show()

def regionFirstDoseSecondDose(date):
    fig = plt.figure(figsize=(35,20))
    #is_Year = df_vaccin["YearWeekISO"][0:3] == "2020"
    #print(df_vaccin[is_Year])
    is_FirstDose_50000 = df_vaccin["TargetGroup"] == "Age0_4"
    print(df_vaccin["TargetGroup"].str.contains('ALL'))
    is_inVaccine = df_vaccin["Vaccine"].isin(["MOD", "COM", "SPU", "AZ", "BECNBG"])
    sns.lineplot(data=df_vaccin[is_inVaccine], x="YearWeekISO",  y="FirstDose", hue="Vaccine")
    df_vaccin[is_inVaccine].info()
    plt.text(116, -10, r'MOD = Moderna, COM = Pfizer/BioNTech, SPU = Sputnik V, AZ = AstraZeneca, BECNBG = Beijing CNBG', fontsize=8, rotation=-90)
    plt.grid()
    plt.title("", fontsize=20)
    #plt.ylabel("", fontsize=15)
    #plt.xlabel("", fontsize=15)
    plt.xticks(rotation=90)
    plt.show()


#----- Execute -----
seeInfos()

#regionFirstDose()
#yearWeekISOFirstDose()
regionFirstDoseSecondDose("2023")