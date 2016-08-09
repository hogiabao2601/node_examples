#!/usr/bin/python

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import sys

def rgb2gray(rgb):
	return np.dot(rgb[...,:3], [0.299, 0.587, 0.114])


img = mpimg.imread(sys.argv[1])
tmpImg = np.array(img, copy=True)
gray = rgb2gray(img)
tmpImg[..., 0] = gray
tmpImg[..., 1] = gray
tmpImg[..., 2] = gray
c = np.array(tmpImg)
mpimg.imsave(sys.argv[1], c)