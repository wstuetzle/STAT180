## Demonstration of sampling (5-16-2017)
##======================================
## Use %paste to paste code into iPython

%matplotlib
import numpy as np
import scipy as sp
import scipy.stats as stats
import matplotlib as mpl
import matplotlib.pyplot as plt
plt.style.use('ggplot')

pop_size = 10000
pop_mean = 30000
chisquare_df = 3

pop = (pop_mean / chisquare_df) * \
            np.random.chisquare(chisquare_df, size = pop_size)
plt.figure(1)
plt.hist(pop, bins = 40)
plt.clf()
plt.hist(pop, bins = 80)

np.mean(pop)
np.median(pop)
np.sqrt(np.var(pop))

pop1 = pop * 25000/np.sqrt(np.var(pop)) ## Adjusts sd to be 25,000
pop2 = pop1 - np.mean(pop1) + 30000  ## Adjusts mean to be 30,000
pop = pop2
np.mean (pop)
np.sqrt(np.var(pop))
np.min(pop)
np.max(pop)

##-----------------------------------------------------------------
## Sampling experiment

nsamples = 1000
sample_means = np.empty(nsamples)

sample_size = 4
replace = True
nbins = 40
bin_range = (0, 70000)

for i in range(0, nsamples):
    sample = np.random.choice(pop, sample_size, replace = replace)
    sample_means[i] = np.mean(sample)

tit = "sample size = " + '{:d}'.format(sample_size) + \
      "  mean = " + '{:03.2f}'.format(np.mean(sample_means)) + \
      "  sd = " + '{:03.2f}'.format(np.sqrt(np.var(sample_means)))

plt.figure()
bla = plt.hist(sample_means, bins = nbins, range = bin_range)
plt.title(tit)

##-----------------------------------------------------------------
## Draw histograms for 4 sample sizes, Matlab-like plotting version

nsamples = 1000
sample_means = np.empty(nsamples)

sample_sizes = [4, 16, 64, 256]
nss = len(sample_sizes)

replace = True
nbins = 40
bin_range = (0, 70000)

plt.figure()
for i in range(0, nss):
    n = sample_sizes[i]
    for j in range(0, nsamples):
        sample = np.random.choice(pop, n, replace = replace)
        sample_means[j] = np.mean(sample)
        
    tit = "sample size = " + '{:d}'.format(n) + \
          "  mean = " + '{:03.2f}'.format(np.mean(sample_means)) + \
          "  sd = " + '{:03.2f}'.format(np.sqrt(np.var(sample_means)))
          
    plt.subplot(nss, 1, i + 1)
    bla = plt.hist(sample_means, bins = nbins, range = bin_range)
    plt.title(tit)

##-----------------------------------------------------------------
## Now try object-oriented version. Plots on same x-scale

nsamples = 100000
sample_means = np.empty(nsamples)

sample_sizes = [4, 16, 64, 256]
nss = len(sample_sizes)

replace = True
nbins = 40
bin_range = (0, 70000)

fig, ax = plt.subplots(4)
fig.subplots_adjust(hspace=.3)
for i in range(0, nss):
    n = sample_sizes[i]
    for j in range(0, nsamples):
        sample = np.random.choice(pop, n, replace = replace)
        sample_means[j] = np.mean(sample)
        
    tit = "sample size = " + '{:d}'.format(n) + \
          "  mean = " + '{:03.2f}'.format(np.mean(sample_means)) + \
          "  sd = " + '{:03.2f}'.format(np.sqrt(np.var(sample_means)))
          
    ax[i].hist(sample_means, bins = nbins, range = bin_range)
    ax[i].set_title(tit, fontsize = 10)
    if i != (nss-1): ax[i].set_xticklabels([])
    ax[i].set_yticklabels([])

##-----------------------------------------------------------------
## Now with individual x-scales

fig, ax = plt.subplots(4)
fig.subplots_adjust(hspace=.5)
for i in range(0, nss):
    n = sample_sizes[i]
    for j in range(0, nsamples):
        sample = np.random.choice(pop, n, replace = replace)
        sample_means[j] = np.mean(sample)
        
    tit = "sample size = " + '{:d}'.format(n) + \
          "  mean = " + '{:03.2f}'.format(np.mean(sample_means)) + \
          "  sd = " + '{:03.2f}'.format(np.sqrt(np.var(sample_means)))
          
    ax[i].hist(sample_means, bins = nbins)
    ax[i].set_title(tit, fontsize = 10)
    ## if i != (nss-1): ax[i].set_xticklabels([])
    ax[i].set_yticklabels([])

##-----------------------------------------------------------------
## Compute and plot variance of means for different sample sizes

nsamples = 100000
sample_means = np.empty(nsamples)

sample_sizes = [4, 16, 64, 256]
nss = len(sample_sizes)

replace = True

var_means = np.empty(nss)

for i in range(0, nss):
    n = sample_sizes[i]
    for j in range(0, nsamples):
        sample = np.random.choice(pop, n, replace = replace)
        sample_means[j] = np.mean(sample)
    var_means[i] = np.var(sample_means)

fig = plt.figure()
plt.plot(sample_sizes, np.sqrt(var_means), "-")
## Not very impressive

(var_means * sample_sizes) / np.var(pop)
## essentially constant

##-----------------------------------------------------------------
## Compare sampling with and without replacement

nsamples = 4000
sample_means = np.empty(nsamples)

sample_sizes = [4, 16, 64, 256, 1024, 2048, 4096, 8192, 9000, 9900]
nss = len(sample_sizes)

var_means_with = np.empty(nss)
var_means_without = np.empty(nss)

for i in range(0, nss):
    n = sample_sizes[i]
    for j in range(0, nsamples):
        sample = np.random.choice(pop, n, replace = True)
        sample_means[j] = np.mean(sample)
    var_means_with[i] = np.var(sample_means)
    for j in range(0, nsamples):
        sample = np.random.choice(pop, n, replace = False)
        sample_means[j] = np.mean(sample)
    var_means_without[i] = np.var(sample_means)

fig = plt.figure()
plt.plot(sample_sizes, sample_sizes * var_means_without / np.var(pop), "-")
plt.plot(sample_sizes, sample_sizes * var_means_with / np.var(pop), "--")


dafafaf










    
    















