import numpy as np
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import os
import csv
from sklearn.decomposition import PCA
from sklearn.svm import SVC
import downloadImg as download
import pickle
from sklearn.externals import joblib
from sklearn.metrics import accuracy_score
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

rootPath = '/home/baohg/IdeaProjects/node_examples/Tesseract/captcha_files/'

def getDirNames():
	return [x[1] for x in os.walk(rootPath)][0]

def getJpgImageNames(dirPath):
	return [x[2] for x in os.walk(dirPath)][0]

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
	printLetters([img])
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

def printLetters(letters):
	count = 0
	for let in letters:
		plt.figure(count)
		plt.imshow(let, cmap = plt.get_cmap('gray'))
		count+=1

def joinLetters(letters, labels):
	count = 0
	rows = []
	if len(letters) != 5:
		a = 1
		# print "ERROR"
		# print ''.join(labels)
	else:
		for let in letters:
			row = [dictLabel[str(labels[count])]] + let.flatten().tolist()
			rows.append(row)
			count += 1
	return rows   

def processImage(dirName):
	captchaDir = os.path.join(rootPath, dirName)
	jpgImages = getJpgImageNames(captchaDir)
	index = len(jpgImages) - 1
	print 'Number file: ', len(jpgImages), dirName
	allRows = []
	while index >= 0:
		index -= 1
		imgPath = os.path.join(captchaDir, jpgImages[index])
		letters = splitCharacter(imgPath)
		allRows += joinLetters(letters, dirName)

	with open("train.csv", "a") as f:
		writer = csv.writer(f)
		writer.writerows(allRows)

	return len(jpgImages)
			

def createTrainCSV():
	dirNames = getDirNames()
	index = len(dirNames) - 1
	print 'Number dir: ', len(dirNames)
	total = 0
	while index >= 0:
		index -= 1
		total += processImage(dirNames[index])

	print 'Total file: ', total

	
def test():
	lets = splitCharacter('./tmp/3A813.jpg')
	printLetters(lets)
	plt.show()

def readTrainData():
	print('Read training data...')
	with open('./train.csv', 'r') as reader:
	    train_label = []
	    train_data = []
	    for line in reader.readlines():
	        data = list(map(int, line.rstrip().split(',')))
	        train_label.append(data[0])
	        train_data.append(data[1:])
	print('Loaded ' + str(len(train_label)))

	print('Reduction...')
	train_label = np.array(train_label)
	train_data = np.array(train_data)
	return [train_data, train_label]

def trainSVM():
	print('Train SVM...')
	[train_data, train_label] = readTrainData()
	clf = SVC()
	clf.fit(train_data, train_label)
	joblib.dump(clf, 'svm.pkl') 

def trainRF():
	print('Train SVM...')
	[train_data, train_label] = readTrainData()
	clf = RandomForestClassifier(n_estimators=100)
	clf.fit(train_data, train_label)
	joblib.dump(clf, './rf/rf.pkl') 

	# pca = PCA(n_components=COMPONENT_NUM, whiten=True)
	# pca.fit(train_data)
	# train_data = pca.transform(train_data)

def testAccSVN():
	print('Train SVM...')
	[train_data, train_label]= readTrainData()

	# train_data = train_data[0:20000]
	# train_label = train_label[0:20000]

	index = range(0, len(train_data))
	ranIndex=int(0.7*len(train_data))

	train_index = index[:ranIndex]
	test_index = index[ranIndex:]

	test_data = train_data[test_index]
	test_label = train_label[test_index]

	train_data = train_data[train_index]
	train_label = train_label[train_index]

	clf = SVC()
	clf.fit(train_data, train_label)

	predict = clf.predict(test_data)
	print accuracy_score(test_label, predict) * 100
	# predicts = []
	# for label in predict:
	# 	for key, val in dictLabel.iteritems():
	# 		if val == label:
	# 			predicts.append(key)
	# print predicts

def testAccRF():
	print('Train SVM...')
	[train_data, train_label]= readTrainData()

	# train_data = train_data[0:20000]
	# train_label = train_label[0:20000]

	index = range(0, len(train_data))
	ranIndex=int(0.7*len(train_data))

	train_index = index[:ranIndex]
	test_index = index[ranIndex:]

	test_data = train_data[test_index]
	test_label = train_label[test_index]

	train_data = train_data[train_index]
	train_label = train_label[train_index]

	clf = RandomForestClassifier(n_estimators=100)
	clf.fit(train_data, train_label)

	predict = clf.predict(test_data)
	print accuracy_score(test_label, predict) * 100
	# predicts = []
	# for label in predict:
	# 	for key, val in dictLabel.iteritems():
	# 		if val == label:
	# 			predicts.append(key)
	# print predicts


def testSVM():
	print('Read testing data...')
	clf = joblib.load('svm.pkl') 
	# [train_data, train_label] = readTrainData()
	i = 10
	while i > 0:
		i -= 1
		imgName = download.downloadCaptchaToTest
		letters = splitCharacter(imgName)
		test_data = []
		if len(letters) != 5:
			print ''.join(letters)
		else:
			for let in letters:
			    row = let.flatten().tolist()
			    test_data.append(row)

		test_data = np.array(test_data)
		# test_data = pca.transform(test_data)
		predict = svc.predict(test_data)
		predicts = []
		for label in predict:
			for key, val in dictLabel.iteritems():
				if val == label:
					predicts.append(key)
		print predicts

def testRF():
	clf = joblib.load('./rf/rf.pkl') 
	i = 1
	while i > 0:
		i -= 1
		imgName = download.downloadCaptchaToTest()
		print imgName
		letters = splitCharacter(imgName)
		test_data = []
		if len(letters) != 5:
			print ''.join(letters)
		else:
			for let in letters:
			    row = let.flatten().tolist()
			    test_data.append(row)

		test_data = np.array(test_data)
		# test_data = pca.transform(test_data)
		predict = clf.predict(test_data)
		predicts = []
		for label in predict:
			for key, val in dictLabel.iteritems():
				if val == label:
					predicts.append(key)
		print predicts


createTrainCSV()
# testAccRF()
# trainSVM()
# testSVM()
# trainRF()
# testRF()def
try:
	pass
except Exception, e:
	raise e
finally:
	pass

def ():
	pass
	
# def demo():
# 	imgs = splitCharacter('./tmp/2D002.jpg')
# 	img = splitHeight(imgs[0])
# 	printLetters([img])
# 	plt.show()

# demo()