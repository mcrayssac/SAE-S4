import importFile
import readFile
import convertDate

sns = importFile.sns
plt = importFile.plt
pd = importFile.pd
np = importFile.np

#----- Import File -----
df_cases = readFile.execution("cases")
df_cases = pd.DataFrame.from_records(df_cases)
df_cases = df_cases.sort_values('year_week')
print(df_cases.tail(10))

#----- Changing date format
"""df_cases = df_cases.rename(columns={'year_week':'date'})
df_cases['date'] = df_cases['date'].str.replace('-','')
df_cases['start_date'] = df_cases['date'].apply(convertDate.get_start_date)
df_cases['end_date'] = df_cases['date'].apply(convertDate.get_end_date)
df_cases = df_cases.drop('date', axis=1)
df_cases = df_cases.sort_values('start_date')
print(df_cases.start_date.tail(10))"""

df_cases = df_cases.rename(columns={'year_week':'YearWeekISO'})
df_cases['YearWeekISO'] = df_cases['YearWeekISO'].str.replace('-','-W')
print(df_cases.tail(10))



"""
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
"""