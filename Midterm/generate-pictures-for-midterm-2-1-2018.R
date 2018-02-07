## Generate pictures for STAT180 midterm (2-1-2018)
## ================================================

n <- 200
x <- 2 * pi * runif(n)
y <- sin(x) + 0.3 * rnorm(n)
jpeg("sin-wave.jpg")
plot(x, y, pch = 20, xlab = "X", ylab = "Y")
dev.off()

n <- 1000
count <- 0
outer <- 1
inner <- 0.7
X = matrix(0, nrow = 500, ncol = 2)
for (i in 1:n) {
  x = runif(2, -1, 1)
  rad <- sqrt(sum(x^2))
  if ((rad <= outer) & (rad >= inner)) {
    count <- count + 1
    X[count, ] <- x
  }
}
jpeg("annulus.jpg")
plot(X[1:count, ], pch = 20, xlab = "X", ylab = "Y")
dev.off()  
count

##-----------------------------------------------------------------
## generate pictures for solution
n <- 200
x <- 2 * pi * runif(n)
y <- sin(x) + 0.3 * rnorm(n)
jpeg("new-sin-wave-solution.jpg")
plot(x, y, pch = 20, xlab = "X", ylab = "Y")
lines(sort(x), sin(sort(x)), lwd = 3)
dev.off()

n <- 1000
count <- 0
outer <- 1
inner <- 0.7
X = matrix(0, nrow = 500, ncol = 2)
for (i in 1:n) {
  x = runif(2, -1, 1)
  rad <- sqrt(sum(x^2))
  if ((rad <= outer) & (rad >= inner)) {
    count <- count + 1
    X[count, ] <- x
  }
}
jpeg("new-annulus-solution.jpg")
plot(X[1:count, ], pch = 20, xlab = "X", ylab = "Y")
abline(h = 0, lwd = 3)
dev.off()  
count
