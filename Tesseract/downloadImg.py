import matplotlib.pyplot as plt
import matplotlib.image as mpimg
from bs4 import BeautifulSoup
import requests
import tempfile
import os, sys
import string
import random
from sklearn.externals import joblib
from sklearn.neighbors import NearestNeighbors


rootPath = '/home/baohg/IdeaProjects/node_examples/Tesseract/captcha_files/'

def id_generator(size=6, chars=string.ascii_uppercase + string.digits):
	return ''.join(random.choice(chars) for _ in range(size))

def createDir():
	dirName = id_generator()
	directory = rootPath + dirName
	while os.path.exists(directory):
		dirName = id_generator()
		directory = rootPath + dirName

	os.makedirs(directory)
	return directory + '/'

def createJpgFileName(directory='/tmp/'):
	fileName = id_generator(size=12)
	filePath = directory + fileName + '.jpg'
	while os.path.exists(filePath):
		fileName = id_generator(size=12)
		filePath = directory + fileName + '.jpg'

	return filePath


def getCaptchaUrl():
	session = requests.Session()
	baseUrl = 'https://www.vietcombank.com.vn'
	loginUrl = 'https://www.vietcombank.com.vn/IBanking2015/55c3c0a782b739e063efa9d5985e2ab4/Account/Login'
	res = session.get(loginUrl)
	body = res.content

	soup = BeautifulSoup(body, 'html.parser')
	captchaUrl = baseUrl + soup.findAll('img',  id="captchaImage")[0]['src']

	return [session, captchaUrl]


def downloadCaptcha(num):
	numberCaptchaPerRequest = num;

	[session, captchaUrl] = getCaptchaUrl()

	directory = createDir()
	name = None
	while numberCaptchaPerRequest > 0:
		numberCaptchaPerRequest -= 1
		
		res = requests.get(captchaUrl, cookies = session.cookies.get_dict(), stream=True)
		name = createJpgFileName(directory)
		if res.status_code == 200:
		    with open(name, 'wb') as f:
		        for chunk in res.iter_content():
		            f.write(chunk)
	
	return name

def downloadCaptchaToTest():
	numberCaptchaPerRequest = 1;

	[session, captchaUrl] = getCaptchaUrl()

	directory = createDir()
	name = None
	while numberCaptchaPerRequest > 0:
		numberCaptchaPerRequest -= 1
		
		res = requests.get(captchaUrl, cookies = session.cookies.get_dict(), stream=True)
		name = createJpgFileName(directory)
		if res.status_code == 200:
		    with open(name, 'wb') as f:
		        for chunk in res.iter_content():
		            f.write(chunk)
	
	img = mpimg.imread(name)
	plt.imshow(img, cmap = plt.get_cmap('gray'))
	plt.show()
	return name

def main(numCaptcha = 20, num=10):
	while numCaptcha > 0:
		numCaptcha -= 1
		imgName = downloadCaptcha(num)
		img = mpimg.imread(imgName)
		plt.imshow(img, cmap = plt.get_cmap('gray'))
		plt.show()

		srcName = os.path.dirname(imgName)
		dstName = raw_input('Captcha Name:')
		dstName = rootPath + dstName
		print srcName + '  -  ' + dstName

		os.rename(srcName, dstName)
		plt.close('all')

# main(5, 1000)