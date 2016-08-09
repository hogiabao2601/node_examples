import numpy as np
import matplotlib.image as mpimg
import os
from sklearn.decomposition import PCA
from sklearn.ensemble import RandomForestClassifier

dictLabel = {
	'0': 0,
	'1': 1,
	'2': 2,
	'3': 3,
	'4': 4,
	'5': 5,
	'6': 6,
	'7': 7,
	'8': 8,
	'9': 9,
	'A': 10,
	'B': 11,
	'C': 12,
	'D': 13,
	'E': 14,
	'F': 15,
	}

def rgb2gray(rgb):
	return np.dot(rgb[...,:3], [0.299, 0.587, 0.114])

def appendArray(arr):
	imgWidth = 14
	(row, col) = arr.shape

	addArray = np.full((row, 1), 255, dtype=np.int)
	flag = True
	while col < imgWidth:
		if(flag):
			arr = np.append(arr, addArray, axis=1)
			flag = False
		else:
			arr = np.append(addArray, arr, axis=1)
			flag = True
		(row, col) = arr.shape
	return arr

def removeArray(arr):
	imgWidth = 14
	(row, col) = arr.shape
	flag = True
	while col > imgWidth:
		if(flag):
			arr = np.delete(arr, col-1, axis=1)
			flag = False
		else:
			arr = np.delete(arr, 0, axis=1)
			flag = True
		(row, col) = arr.shape
	return arr
	
def appendRow(arr):
	imgWidth = 14
	(row, col) = arr.shape

	addArray = np.full((1, col), 255, dtype=np.int)
	flag = True
	while row < imgWidth:
		if(flag):
			arr = np.append(arr, addArray, axis=0)
			flag = False
		else:
			arr = np.append(addArray, arr, axis=0)
			flag = True
		(row, col) = arr.shape
	return arr

def removeRow(arr):
	imgWidth = 14
	(row, col) = arr.shape
	flag = True
	while row > imgWidth:
		if(flag):
			arr = np.delete(arr, row-1, axis=0)
			flag = False
		else:
			arr = np.delete(arr, 0, axis=0)
			flag = True
		(row, col) = arr.shape
	return arr

def group_consecutives(vals, step=1):
    """Return list of consecutive lists of numbers from vals (number list)."""
    run = []
    result = [run]
    expect = None
    for v in vals:
        if (v == expect) or (expect is None):
            run.append(v)
        else:
            run = [v]
            result.append(run)
        expect = v + step
    return result

def repocessRGB(img):
	th_green = 213
	th_blue = 205
	th_red = 205

	red = img[..., 0]
	green = img[..., 1]
	blue = img[..., 2]

	red[green > th_green] = 255
	green[green > th_green] = 255
	blue[green > th_green] = 255

	red[blue > th_blue] = 255
	green[blue > th_blue] = 255
	blue[blue > th_blue] = 255

	red[blue > th_red] = 255
	green[blue > th_red] = 255
	blue[blue > th_red] = 255

	img[..., 0] = red
	img[..., 1] = green
	img[..., 2] = blue

	return img

def splitHeight(img):
	thresholdGray = 255
	
	grayBinary = np.array(img, copy=True)
	
	grayBinary[thresholdGray-1 >= grayBinary] = 1
	grayBinary[thresholdGray <= grayBinary] = 0

	sumArray = np.sum(grayBinary, axis=1)
	
	indexArray = np.array(range(0, len(sumArray)))
	letters = group_consecutives(indexArray[(sumArray >= 1)])
	
	for letter in letters:
		if(len(letter) > 5):
			arr = img[letter,:]
			arr = appendRow(arr)
			arr = removeRow(arr)
	return arr 

def splitCharacter(imgPath):
	thresholdGray = 255
	
	img = mpimg.imread(imgPath) 

	img = repocessRGB(img)
	gray = rgb2gray(img)  
	gray = gray.astype(int)
	
	grayBinary = np.array(gray, copy=True)
	
	grayBinary[thresholdGray-1 >= grayBinary] = 1
	grayBinary[thresholdGray <= grayBinary] = 0

	sumArray = np.sum(grayBinary, axis=0)
	
	indexArray = np.array(range(0, len(sumArray)))
	letters = group_consecutives(indexArray[(sumArray >= 2)])
	images = []
	for letter in letters:
		if(len(letter) > 3):
			arr = gray[:,letter]
			arr = appendArray(arr)
			arr = removeArray(arr)
			checkArr = np.array(arr, copy=True)
			checkArr[thresholdGray-1 >= checkArr] = 1
			checkArr[thresholdGray <= checkArr] = 0
			if  np.sum(checkArr) >= 20:
				img = splitHeight(arr)
				img[img != 255] = 0
				images.append(img)
	return images


def decaptcha(imgPath):
	clf = joblib.load('./rf/rf.pkl') 
	letters = splitCharacter(imgPath)
	test_data = []
	if len(letters) == 5:
		return 'ERROR'
	else:
		for let in letters:
		    row = let.flatten().tolist()
		    test_data.append(row)

	test_data = np.array(test_data)
	predict = clf.predict(test_data)
	predicts = ''
	for label in predict:
		for key, val in dictLabel.iteritems():
			if val == label:
				predicts += key
	return predicts

print decaptcha('/home/baohg/IdeaProjects/node_examples/Tesseract/captcha_files/111C8/00JW5OL5CXCL.jpg')