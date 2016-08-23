from elasticsearch import Elasticsearch
from pprint import pprint
import json

# init connection
es = Elasticsearch(["itracking.io"], maxsize=25, verify_certs=True)

