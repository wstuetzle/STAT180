#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Nov 17 12:02:43 2017

@author: wxs
"""

# Import code libraries or "modules" in Python lingo

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from datascience import *
import importlib
import sys
sns.set_style("whitegrid")
# %matplotlib inline
#
# Import some new methods for class Table
# Add IDS directory to search path
dir = "/Users/wxs/Dropbox/STAT180/Git-repositories/IDS/"
if dir not in sys.path:
    sys.path.append(dir)

from datascience_extensions import *
#
module_name = "datascience_extensions"
importlib.reload(sys.modules[module_name])
#
# Read Titanic data
dir = "/Users/wxs/Dropbox/STAT180/Git-repositories/IDS/Data/"
titanic_filename = "titanic3.csv"
titanic_pathname = dir + titanic_filename

titanic = Table.read_table(titanic_pathname)
titanic.labels
titanic.take([0, 1, 2])
titanic.shape()
# So the table "titanic" has 1,310 rows, numbered 0..1309
# The spreadsheet "titanic3.csv" has also 1,310 rows, but row 1 contains
# the column labels. So we only have data on 1,309 passengers.
#
# Something is amiss. Let's look at the first row of the table
titanic.take(1)
# That looks ok. Take a peak at the last row
titanic.take(1309)
# All values are missing (nan). So Table.read_table read an empty
# row of the spreadsheet. Let's get rid of that row
titanic = titanic.take(np.arange(1309))
titanic.take(1308)
# That's a legit row

# There ar missing values (nan) in the table. Let's count the
# missing values for each variable
nan_count = titanic.count_nan()
nan_count
#
# ===========================================================================
# Now we are ready to do some analysis
# Start by looking at individual features

bla = titanic.group("survived")
bla
bla.barh("survived")
# Less than half the passengers survived

bla = titanic.group("sex")
bla.barh("sex")
bla
# About 2/3 of the passengers were males

bla = titanic.group("pclass")
bla.barh("pclass")
bla
# About half the passengers were in 3rd class
#
bla = titanic.group("embarked")
bla.barh("embarked")
bla
# Most assengers embarked in Southampton
# Let's see if there is a difference in the class and sex distribution
# between the ports of embarkation
titanic_sub = titanic.select("pclass", "embarked", "sex").take_complete_rows()
titanic_sub.pivot("pclass", "embarked").barh("embarked")
# Drastic differences

age = titanic.select("age").take_complete_rows()
age.hist(bins=np.arange(0, 80, 5))
age.where("age", are.below(30)).num_rows
# Almost half the passengers are younger than 30
age.mean()
# The mean age is just below 30
# ages.median()
np.median(age.column("age"))
# median age is 28
# Maybe the young passengers are poor emigrants who are
# predominantly in 3rd class
age_pclass = titanic.select("age", "pclass").take_complete_rows()
age_pclass.shape()
age_pclass.group("pclass", np.median).barh("pclass")
# Yes, the 3rd class passsengers are on average much younger
# than the 1st class passengers
#
# Let's see if there is a difference in the class distribution
# between the ports of embarkation
titanic_sub = titanic.select("pclass", "embarked", "sex").take_complete_rows()
titanic_sub.pivot("pclass", "embarked").barh("embarked")
# Dramatic difference.
# How about gender?
titanic_sub.pivot("sex", "embarked").barh("embarked")
# Conjecture: The passengers embarking at Queenstown
# tended to be young emigrant families?
#
#
# ============================================================================
# Let's no get to the most intersting question: How did the likelihood
# of survival "depend" on sex and pclass
titanic.pivot("sex", "pclass").barh("pclass")
titanic.pivot("sex", "pclass")
# Ratio of females to males is decreasing function of class
#
titanic.pivot("sex", "pclass", "survived", collect=np.mean).barh("pclass")
titanic.pivot("sex", "pclass", "survived", collect=np.mean)
# Males in first class were twice as likely to survive as males in 2nd
# and 3rd class
# Females were roughly equally likely to survice in 1st and 2nd class
# and twice as likely to survice as females in 3rd class
#
# Of course we could also state the result in terms of death rather than
# survival
died = 1 - titanic.column("survived")
titanic_extended = titanic.with_columns("died", died)
titanic_extended.pivot("sex", "pclass", "died", collect=np.mean)
titanic_extended.pivot("sex", "pclass", "died", collect=np.mean)\
    .barh("pclass")
# Females in 2nd class were three times as likely to die than females in 1st
# class. Females in 3rd class were 15 times more likely to die than females
# in 1st class