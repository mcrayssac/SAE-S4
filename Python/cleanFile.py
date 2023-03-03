import readFile as rf
import numpy as np

def replaceEu(data):
    data['country_code'] = data['country_code'].replace(np.nan, 'EU')
    return data

def clean(data):
    print(data.isnull().sum())
    print("Beginning cleaning")
    data.loc[data['weekly_count'] == '', 'weekly_count'] = np.nan
    data = data.dropna(subset=['weekly_count'])
    data.loc[data['rate_14_day'] == '', 'rate_14_day'] = np.nan
    data = data.dropna(subset=['rate_14_day'])
    print("Ending cleaning")
    print(data.shape)
    print(data.isnull().sum())
    return data