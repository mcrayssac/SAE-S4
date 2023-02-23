import readFile as rf
import Web_importation.importFile as importFile
import numpy as np

def replaceEu(data):
    data['country_code'] = data['country_code'].replace(np.nan, 'EU')
    return data

def clean(data):
    print(data.isnull().sum())
    print("début du nettoyage")
    data['weekly_count'] = data['weekly_count'].replace('', np.nan)
    data = data.dropna(subset=['weekly_count'])
    data['rate_14_day'] = data['rate_14_day'].replace('', np.nan)
    data = data.dropna(subset=['rate_14_day'])
    print("nettoyage terminé")
    print(data.shape)
    print(data.isnull().sum())
    return data