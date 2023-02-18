import readFile as rf
import importFile
import numpy as np

def replaceEu(data):
    data['country_code'] = data['country_code'].replace(np.nan, 'EU')
    return data

def clean(type, data):
    print(data.columns)
    print(data.isnull().sum())
    if type == importFile.caseType:
        data.pop('note')
        data['weekly_count'] = data['weekly_count'].replace('', np.nan)
        data = data.dropna(subset=['weekly_count'])
        data['rate_14_day'] = data['rate_14_day'].replace('', np.nan)
        data = data.dropna(subset=['rate_14_day'])
        data = replaceEu(data)
        # les champs null qu'il reste sont ceux des pays avec (total) dans leur nom donc
        # a voir ce qu'on fait si on leur trouve une abreviation ou autre chose
        # print(df_contamination)
    elif type == importFile.vaccinationType:
        data.pop('FirstDoseRefused')
        data.pop('NumberDosesReceived')
        data.pop('NumberDosesExported')
        # Il ne reste plus que le denominator à gérer une fois que ca marche
    else:
        return data
    print("nettoyage terminé")
    print(data.head(10))
    print(data.isnull().sum())
    return data