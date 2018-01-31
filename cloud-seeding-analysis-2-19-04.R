## Experiment with cloud seeding data(2-10-04)
## Clouds are first selected as suitable or unsuitable for seeding
## Then a coin is tossed to decide whether or not they are actually
## seeded

pathname <- "g:\\Stat390\\Winter04\\Bootstrap\\cloud-seeding-2-19-04.dat"
source(pathname)

length(seeded)
length(unseeded)
n <- length(seeded)  ## 26 seeded, 26 unseeded

par(mfrow = c(2,1))
hist(seeded, col = "green", nclass = 10, ylim = c(0,20))
hist(unseeded, col = "green", nclass = 10, ylim = c(0, 20))
par(mfrow = c(1,1))
boxplot(seeded, unseeded, col = "green", names = c("seeded", "unseeded"))

## Look at difference between means
diff.means <- mean(seeded) - mean(unseeded)  ## 277
se.diff.means <- sqrt((var(seeded) + var(unseeded))/n)  ## 139
ci.lower.sd <- diff.means - 1.96 * se.diff.means
ci.upper.sd <- diff.means + 1.96 * se.diff.means
c(ci.lower.sd, ci.upper.sd)  ## (5, 549)
## 95% CLT based confidence interval for difference in means
## is [5, 549]

## Find Bootstrap distribution for difference between means
nboot <- 1000
diff.means.boot <- rep(0, nboot)
for (i in 1:nboot) {
  seeded.boot <- sample(seeded, n, replace = T)
  unseeded.boot <- sample(unseeded, n, replace = T)
  diff.means.boot[i] <- mean(seeded.boot) - mean(unseeded.boot)
}
hist(diff.means.boot, col = "green", nclass = 20, main = "")
title("Cloud seeding: Bootstrap distribution of difference between means",
      cex.main = 1.0)
## Looks pretty Gaussian

## Compute Bootstrap percentile interval for difference between means
ci.lower.perc <- sort(diff.means.boot)[0.05 * nboot / 2 + 1]
ci.upper.perc <- sort(diff.means.boot)[nboot -0.05 * nboot / 2]
c(ci.lower.perc, ci.upper.perc)
## 95% Bootstrap percentile confidence interval for difference in means
## is [25, 569]


##-----------------------------------------------------------------
## Now analyze difference between medians

diff.medians <- median(seeded) - median(unseeded)  ## 177
nboot <- 1000
diff.medians.boot <- rep(0, nboot)
for (i in 1:nboot) {
  seeded.boot <- sample(seeded, n, replace = T)
  unseeded.boot <- sample(unseeded, n, replace = T)
  diff.medians.boot[i] <- median(seeded.boot) - median(unseeded.boot)
}
hist(diff.medians.boot, col = "green", nclass = 20, main = "")
title("Cloud seeding: Bootstrap distribution of difference between medians",
      cex.main = 1.0)

## Compute 95% CLT based Bootstrap confidence interval for difference
## between medians
ci.lower.sd <- diff.medians - 1.96 * sd(diff.medians.boot)
ci.upper.sd <- diff.medians + 1.96 * sd(diff.medians.boot)
c(ci.lower.sd, ci.upper.sd)
## 95% CLT based bootstrap confidence interval for difference between
## medians is [53, 301]

## Compute 95% Boostrap percentile confidence intervals for difference
## between medians
ci.lower.perc <- sort(diff.medians.boot)[0.05 * nboot / 2 + 1]
ci.upper.perc <- sort(diff.medians.boot)[nboot -0.05 * nboot / 2]
c(ci.lower.perc, ci.upper.perc)
## 95% Bootstrap percentile confidence interval for difference
## between medians is [40, 262]

## Summary of analysis so far: There is a consistent picture - cloud
## seeding appears to increase the amount of rainfall.


##=================================================================
##=================================================================
## Permutation tests: An alternative way of looking at the question

rainfalls <- c(seeded, unseeded)
labels <- c(rep("seeded", n), rep("unseeded", n))

## Compute difference between between medians of "seeded" and
## "unseeded" rainfalls

diff.orig.medians <- median(rainfalls[labels == "seeded"]) -
                     median(rainfalls[labels == "unseeded"])
diff.orig.medians

## If there was no difference, then switching labels should not matter

nperm <- 1000
diff.permuted.medians <- rep(0, nperm)
for (i in 1:nperm) {
  permuted.labels <- sample(labels)
  diff.permuted.medians[i] <- median(rainfalls[permuted.labels == "seeded"]) -
                              median(rainfalls[permuted.labels == "unseeded"])
}
hist(diff.permuted.medians, nclass = 20, col = "green", main = "")
abline(v = diff.orig.medians, col = "red", lwd = 3)
title("Cloud seeding: Permutation distribution of difference between medians",
      cex.main = 1.0)
sum(diff.permuted.medians > diff.orig.medians)  ## 7

## If seeding had no effect, only 0.7% of the (52 choose 26) possible
## assignements of labels to rainfalls would give a difference bigger
## than the one we observed. Therefore it is very unlikely that the
## difference can be explained by a fortuitous choice of clouds for
## seeding.


## Repeat analysis for means instead of medians
diff.orig.means <- mean(rainfalls[labels == "seeded"]) -
                   mean(rainfalls[labels == "unseeded"])
diff.orig.means

nperm <- 1000
diff.permuted.means <- rep(0, nperm)
for (i in 1:nperm) {
  permuted.labels <- sample(labels)
  diff.permuted.means[i] <- mean(rainfalls[permuted.labels == "seeded"]) -
                            mean(rainfalls[permuted.labels == "unseeded"])
}
hist(diff.permuted.means, nclass = 20, col = "green", main = "")
abline(v = diff.orig.means, col = "red", lwd = 3)
title("Cloud seeding: Permutation distribution of difference between means",
      cex.main = 1.0)

sum(diff.permuted.means > diff.orig.means)  ## 26


