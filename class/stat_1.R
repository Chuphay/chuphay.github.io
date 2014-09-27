print('Sum of the first n positive integers. Consider the sequence of positive integers 1, 2, 3, 4, .... One can show by mathematical induction that the sum of the first n of them is sn = n(n + 1)/2. For example, 1 + 2 + 3 + 4 + 5 = 15 = 5(6)/30. For values of n up to 50, we can illustrate this theorem in R as follows: ')
print('i = 1:50')
i = 1:50 
cat('s = i*(i+1)/2')
s = i*(i+1)/2
cat ('\n ') 
print(cumsum(i))
message('mean should be one?\n', mean(s == cumsum(i)))
cat('\n --------------------- \n')
cat('This difference function seems pretty cool. lets try to mess with it\n')
cat('> a <- (1:5)^3\n')
a<- (1:5)^3
cat('> a\n')
print(a)
cat('> diff(a)\n')
print(diff(a))
cat('\nnotice how its length is shorter than the original by one, naturally\n')
cat('\n')
cat('do some plotting\n\n')
#cat('> plot(c(a,rev(a)))\n')

#plot(c(a,rev(a)))
t <- seq(0, 1, length=200) 
d <- 6*(t - t^2) 

par(mfrow=c(1,2))
plot(t, d, type="l", lwd=2, col="blue", main="Parabola") 
plot(t, d/2, type="o", lwd=2, col="black", main="Parabola") 