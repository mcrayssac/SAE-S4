import pandas as pd

from datetime import timedelta
from dateutil.parser import parse

df_vaccin = pd.read_csv('data.csv')
df_consta = pd.read_csv('data_conta.csv')

df_consta = df_consta.rename(columns={'year_week':'YearWeekISO'})

df_vaccin['YearWeekISO'] = df_vaccin['YearWeekISO'].str.replace('-W','')
df_consta['YearWeekISO'] = df_consta['YearWeekISO'].str.replace('-','')

#----- Cleaning time -----

df_consta = df_consta.drop(columns=['country_code', 'weekly_count', 'rate_14_day', 'source', 'note', 'cumulative_count'])
df_vaccin = df_vaccin.drop(columns=['Denominator', 'UnknownDose', 'NumberDosesExported', 'FirstDoseRefused', 'DoseAdditional1', 'DoseAdditional2', 'DoseAdditional3', 'Population', 'ReportingCountry'])

print(df_vaccin)
print(df_consta)

print(df_consta.isnull().sum().sum())
print(df_vaccin.isnull().sum().sum())

#----- Overly complicated solution to the date -----

def get_start_end_dates(yyyyww):
    year = yyyyww[:4]
    week = yyyyww[-2:]
    first_day_year = str(year) + '-' +  '01' + '-' + '01'
    d = parse(first_day_year)
    if(d.weekday()<= 3):
        d = d - timedelta(d.weekday())             
    else:
        d = d + timedelta(7-d.weekday())
    dlt = timedelta(days = (int(week)-1)*7)
    return (d + dlt).strftime('%Y-%m-%d'),  (d + dlt + timedelta(days=6)).strftime('%Y-%m-%d')# run it


#----- method test -----

print(get_start_end_dates('201837'))


#----- Apply method on dataframes

df_consta['YearWeekISO'] = df_consta['YearWeekISO'].apply(get_start_end_dates)
df_vaccin['YearWeekISO'] = df_vaccin['YearWeekISO'].apply(get_start_end_dates)

print(df_vaccin)
print(df_consta)


