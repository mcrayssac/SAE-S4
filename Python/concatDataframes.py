import pandas as pd
from datetime import datetime

import pycountry
def trans_alpha_country(x):
    country = pycountry.countries.get(name=x)
    return country.alpha_2 if country else "NA"

import Vaccination
import Contamination

df_vaccin = Vaccination.df_vaccin
print(df_vaccin)
df_cases = Contamination.df_cases
print(df_cases)

pd.set_option('display.max_columns', None)



def Cases(indicator):
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


tabVaccine = df_vaccin["Vaccine"].unique()
tabTargetGroup = df_vaccin["TargetGroup"].unique()
tabIndicator = df_cases["indicator"].unique()


print("Full First Concat beginning !")
beginTime = datetime.now()
tabConcat = []
for elt in tabIndicator:
    for elt1 in tabTargetGroup:
        for elt2 in tabVaccine:
            tabConcat.append(Concat(elt, elt1, elt2))
df_concat_full = pd.concat(tabConcat)
pd.set_option('display.max_columns', None)
df_concat_full = df_concat_full.sort_index()
print(df_concat_full.tail(50))
print(df_concat_full.shape)
endTime = datetime.now()
diffTime = endTime-beginTime
diffMinSecTime = divmod(diffTime.total_seconds(), 60)
print('Total time to df_concat_full: ', diffMinSecTime[0], 'minutes', diffMinSecTime[1], 'seconds')
print("\n\n\n")