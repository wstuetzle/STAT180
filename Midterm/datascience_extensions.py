#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Dec  9 07:35:50 2017

@author: wxs
"""

# ======================================================


# A few new methdods for class Table
#
from datascience import *
import numpy as np
import pandas as pd
#
def shape(self):
    return([self.num_rows, self.num_columns])
#
Table.shape = shape


def count_nan(self):
    column_names = self.labels
    nan_counts = dict()
    for name in column_names:
        col = self.column(name)
        if isinstance(col[0], float):
            nan_counts[name] = sum(np.isnan(col))
            # print(name + " float")
        elif isinstance(col[0], str):
            nan_counts[name] = sum(col == "nan")
            # print(name + "  string")
        else:
            print(name + "  type unrecognized")
    return(nan_counts)
#
Table.count_nan = count_nan


def take_complete_rows(self):
    column_names = self.labels
    n = self.num_rows
    row_complete = np.full(n, True)
    for name in column_names:
        col = self.column(name)
        if isinstance(col[0], float):
            present = np.logical_not(np.isnan(col))
        elif isinstance(col[0], str):
            present = np.logical_not(col == "nan")
        else:
            print(name + "  type unrecognized")
        row_complete = np.logical_and(row_complete, present)
    complete_row_indices = np.array(range(n))[row_complete]
    return(self.take(complete_row_indices))
#
Table.take_complete_rows = take_complete_rows


def as_data_frame(self):
    df = dict()
    for name in self.labels:
        df[name] = self.column(name)
    return(pd.DataFrame(df))
#
Table.as_data_frame = as_data_frame


# =============================================================================
# Functions from "minimal-numpy-pandas-9-15-2017.py
#def table(df, split_by_var, target_var, summary_function_name):
#    # pdb.set_trace()
#    result = dict()
#    for val in set(df[split_by_var]):
#        is_in = df[split_by_var] == val
#        if summary_function_name == "count":
#            summary_function = len
#        else:
#            summary_function = eval(summary_function_name)
#        summary = summary_function(df[target_var][is_in])
#        summary = round(summary, 2)
#        # result[val] = {"count": count,
#        #                summary_function_name: summary}
#        result[val] = {summary_function_name: summary}
#    return(np.transpose(pd.DataFrame(result)))
#
#
#table(titanic, "sex", "survived", "np.mean")
#table(titanic, "sex", "survived", "count")
#
#
## ----------------------------------------------------------------------------
## Now define a function that produces 2d tables
#
#def two_dim_table(df, split_by_vars, target_var, summary_function_name):
#    # pdb.set_trace()
#    sv0 = split_by_vars[0]
#    sv1 = split_by_vars[1]
#    values_sv0 = list(set(df[sv0]))
#    values_sv1 = list(set(df[sv1]))
#    nrow = len(values_sv0)
#    ncol = len(values_sv1)
#    summary = np.empty((nrow, ncol), dtype=np.float64)
#    for i in range(nrow):
#        for j in range(ncol):
#            cond1 = (df[sv0] == values_sv0[i])
#            cond2 = (df[sv1] == values_sv1[j])
#            is_in = np.logical_and(cond1, cond2)
#            count = sum(is_in)
#            if summary_function_name == "count":
#                summary[i, j] = count
#            elif count == 0:
#                summary[i, j] = np.nan
#            else:
#                sf = eval(summary_function_name)
#                summary[i, j] = sf(df[target_var][is_in])
#    # pdb.set_trace()
#    result = pd.DataFrame(summary, copy=True)
#    result.index = values_sv0
#    result.columns = values_sv1
#    return(result)

