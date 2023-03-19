import pandas as pd
import json
import os

#----- Time -----
from datetime import datetime

#----- Start Time -----
def startTime():
    return datetime.now()

beginTime = startTime()

#----- End Time -----
def endTime(beginTime):
    global diffMinSecTime
    endTime = datetime.now()
    diffTime = endTime-beginTime
    diffMinSecTime = divmod(diffTime.total_seconds(), 60)
    print('Total time to load dataframe: ', diffMinSecTime[0], 'minutes', "%.2f" % diffMinSecTime[1], 'seconds')

#----- Storage Time -----
def storageTime():
    file_path = "../Files/mean_minutes_update.json"
    data = {"numbers": []}
    if os.path.exists(file_path):
        with open(file_path, "r") as in_file:
            file_size = os.stat(file_path).st_size
            if file_size > 0:
                data = json.load(in_file)
    if "numbers" not in data:
        data = {"numbers": []}
    data["numbers"].append({"minutes": diffMinSecTime[0], "seconds": float("%.2f" % diffMinSecTime[1])})
    with open(file_path, "w") as out_file:
        json.dump(data, out_file, indent=4)
    print("Ending time storage")

import readFile
#from Web_importation import importFile

import pycountry
def trans_alpha_country(x):
    country = pycountry.countries.get(name=x)
    return country.alpha_2 if country else "NA"

#----- Read Vaccination -----
df_vaccin = readFile.execution("vaccinations")
df_vaccin = pd.DataFrame.from_records(df_vaccin['records'])
df_vaccin = df_vaccin.sort_values('YearWeekISO')

#----- Read Contamination Archived -----
df_cases_archived = readFile.execution("casesArchived")
df_cases_archived = pd.DataFrame.from_records(df_cases_archived['records'])
df_cases_archived = df_cases_archived.sort_values('dateRep')

#----- Read Contamination -----
df_cases = readFile.execution("cases")
df_cases = pd.DataFrame.from_records(df_cases)
df_cases = df_cases.sort_values('year_week')
df_cases = df_cases.rename(columns={'year_week':'YearWeekISO'})
df_cases['YearWeekISO'] = df_cases['YearWeekISO'].str.replace('-','-W')

#----- Max Columns -----
pd.set_option('display.max_columns', None)

def concatVaccinationsArchived(df_cases, df_cases_archived, df_vaccin):
    pd.options.mode.chained_assignment = None  # default='warn'
    print(df_cases_archived.shape)
    df_cases_archived = df_cases_archived[ df_cases_archived["geoId"].str.len() == 2 ]
    df_cases_archived.loc[:, 'date'] = pd.to_datetime(df_cases_archived.loc[:, 'dateRep'], format='%d/%m/%Y')
    df_cases_archived.loc[:, 'YearWeekISO'] = df_cases_archived.loc[:, 'date'].apply(lambda x: x.strftime('%Y-W%U'))
    df_cases_archived = df_cases_archived.sort_values('YearWeekISO')
    df_cases_archived = df_cases_archived.drop(['date', 'countryterritoryCode', 'continentExp', 'dateRep', 'day', 'month', 'year'], axis=1)
    numeric_cols = ['cases', 'deaths', 'Cumulative_number_for_14_days_of_COVID-19_cases_per_100000']
    df_cases_archived_sum = df_cases_archived.groupby(['countriesAndTerritories', 'geoId', 'YearWeekISO'])[numeric_cols].sum(numeric_only=True).reset_index()
    popData2019 = df_cases_archived.groupby(['countriesAndTerritories', 'geoId', 'YearWeekISO'])['popData2019'].first().reset_index()['popData2019']
    df_cases_archived_sum['population'] = popData2019
    df_cases_archived = df_cases_archived_sum
    df_melt = pd.melt(df_cases_archived, id_vars=["countriesAndTerritories", "geoId", "YearWeekISO", "population"],
                      value_vars=["cases", "deaths"], var_name="indicator", value_name="weekly_count")
    df_cases_archived = df_melt[["countriesAndTerritories", "geoId", "YearWeekISO", "indicator", "weekly_count", "population"]]
    df_cases_archived = df_cases_archived.rename(columns={'countriesAndTerritories': 'country', 'geoId': 'country_code'})
    print(df_cases_archived)
    df_cases = df_cases.drop(['continent', 'source', 'note', 'cumulative_count', 'rate_14_day'], axis=1)
    df_cases = df_cases[(df_cases['YearWeekISO'] >= '2021-W01') & (df_cases['YearWeekISO'] <= '2023-W09')]
    print(df_cases)

    """df_cases_archived = df_cases_archived[(df_cases_archived['country_code'] == "FR") & (df_cases_archived['YearWeekISO'] == "2019-W52")]
    print(df_cases_archived)
    df_cases = df_cases[(df_cases['country_code'] == "FRA") & (df_cases['YearWeekISO'] == "2021-W52")]
    print(df_cases)"""

    df_combined = pd.concat([df_cases_archived, df_cases], ignore_index=True)
    print(df_combined)

    counts = df_combined.groupby('country')['country'].count()
    counts = counts.sort_values(ascending=False)
    counts = counts[0] - 0.20 * counts[0]

    df_cases_archived_countries = df_combined['country'].unique()
    for elt in df_cases_archived_countries:
        if (df_combined['country'] == elt).sum() <= counts:
            df_combined = df_combined.drop(df_combined[df_combined['country'] == elt].index)

    counts = df_combined.groupby('country')['country'].count()
    print(counts)


    print((df_combined['country'] == "France").sum())
    print((df_combined['country'] == "Italy").sum())
    print((df_combined['country'] == "Afghanistan").sum())




    """result = merged_df.to_json(orient="records")
    parsed = json.loads(result)
    dumped = json.dumps(parsed, indent=4)
    with open('.\data.json', 'w') as f:
        f.write(dumped)"""



concatVaccinationsArchived(df_cases, df_cases_archived, df_vaccin)

"""def Cases(indicator):
    #print("Cases beginning !")
    #print(df_cases['YearWeekISO'].isnull().sum())
    #print(df_cases['country_code'].isnull().sum())
    #print(df_cases['indicator'].isnull().sum())
    df_cases['Region'] = df_cases['country'].apply(trans_alpha_country)
    df_cases_one = df_cases[ df_cases["indicator"] == indicator ]
    df_cases_one = df_cases_one.set_index(["YearWeekISO", "Region"])
    #print("Cases ending !")
    return df_cases_one


def Vaccination(TargetGroup, Vaccine):
    #print("Vaccine beginning !")
    #print(df_vaccin['YearWeekISO'].isnull().sum())
    df_vaccin_one = df_vaccin[ df_vaccin["Region"].str.len() == 2 ]
    df_vaccin_one = df_vaccin_one[ df_vaccin_one["TargetGroup"] == TargetGroup ]
    df_vaccin_one = df_vaccin_one[ df_vaccin_one["Vaccine"] == Vaccine ]
    df_vaccin_one = df_vaccin_one.set_index(["YearWeekISO", "Region"])
    #print("Vaccine ending !")
    return df_vaccin_one


def Concat(indicator, TargetGroup, Vaccine):
    #print("Concat beginning !")
    df_concat = pd.concat([Cases(indicator), Vaccination(TargetGroup, Vaccine)], axis=1)
    df_concat = df_concat[df_concat['FirstDose'].notna()]
    df_concat = df_concat[df_concat['country'].notna()]
    #print("Concat ending !")
    return df_concat

import cleanFile as cleanFile

def concat_full():
    tabVaccine = df_vaccin["Vaccine"].unique()
    tabTargetGroup = df_vaccin["TargetGroup"].unique()
    tabIndicator = df_cases["indicator"].unique()

    print("Full First Concat beginning !")
    tabConcat = []
    for elt in tabIndicator:
        for elt1 in tabTargetGroup:
            for elt2 in tabVaccine:
                tabConcat.append(Concat(elt, elt1, elt2))
    df_concat_full = pd.concat(tabConcat)
    df_concat_full = cleanFile.clean(df_concat_full)
    pd.set_option('display.max_columns', None)
    df_concat_full = df_concat_full.sort_index()
    #print(df_concat_full.tail(50))
    print("Dataframe shape : ")
    print(df_concat_full.shape)
    #print("\n\n\n")
    return df_concat_full

#----- Storage File -----
def storage(df, file):
    print("Beginning storage")
    df.reset_index(inplace=True)
    df = df.to_dict(orient="records")
    out_file = open(file, "w")
    json.dump(df, out_file, indent = 2)
    out_file.close()
    print("Ending storage")

#----- Variables -----
fullDataframeFile = "../Files/full_df.json"

#----- Execution -----
def execution():
    storage(concat_full(), fullDataframeFile)

execution()
endTime(beginTime)
storageTime()"""