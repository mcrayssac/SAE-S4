import seaborn as sns
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

#----- See versions -----
#print(pd.show_versions())

#----- Import File -----
df_vaccin = pd.read_csv('data.csv')

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