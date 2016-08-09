import random
import math
import numpy as np

data = np.array([1, 2, 34, 5, 6, 6,7 ,8,1, 2, 34, 5, 6, 6,7 ,8,1, 2, 34, 5, 6, 6,7 ,8,1, 2, 34, 5, 6, 6, 2])
random.shuffle(data)

index = range(0, len(data))
ranIndex=int(0.7*len(data))

print index

train_index = index[:ranIndex]
test_index = index[ranIndex:]
print train_index
print test_index
print data[train_index]
# 0102703793