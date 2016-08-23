from elasticsearch.helpers import reindex
# from elasticsearch.helpers import get_mapping

from elasticsearch import Elasticsearch
import csv
from pprint import pprint
import json

# from elasticsearch_dsl import Search

es = Elasticsearch(["itracking.io"], maxsize=25, verify_certs=True)

def getMapping(client, srcIndex):
  return client.indices.get_mapping(index=srcIndex)



acctivitesIndex = {
  'activities': {
    'mappings': {
      'access': {
        'properties': {
          'accountId': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'appId': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'brandModel': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'brandName': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'cLang': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'city': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'clientVersion': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'country': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'cp': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'credit': {
           'index': 'not_analyzed',
            'type': 'string'
          },
          'currencyCode': {
           'index': 'not_analyzed',
            'type': 'string'
          },
          'deviceId': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'email': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'eventKey': {
           'index': 'not_analyzed',
            'type': 'string'
          },
          'gaid': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'idfa': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'imei': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'imsi': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'installedTime': {
            'format': 'strict_date_optional_time||epoch_millis',
            'type': 'date'
          },
          'ipPrivate': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'ipPublic': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'is3G': {
            'type': 'boolean'
          },
          'is3g': {
            'type': 'boolean'
          },
          'isOther': {
            'type': 'boolean'
          },
          'isWifi': {
            'type': 'boolean'
          },
          'macAddress': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'money': {
            'type': 'long'
          },
          'osVersion': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'pData': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'packageName': {
           'index': 'not_analyzed',
            'type': 'string'
          },
          'partnerId': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'paymentGateway': {
           'index': 'not_analyzed',
            'type': 'string'
          },
          'paymentType': {
           'index': 'not_analyzed',
            'type': 'string'
          },
          'placePurchase': {
           'index': 'not_analyzed',
            'type': 'string'
          },
          'platform': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'ram': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'requestId': {
           'index': 'not_analyzed',
            'type': 'string'
          },
          'sLang': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'screenSize': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'sdkVersion': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'serverId': {
            'type': 'long'
          },
          'storeCallback': {
            'type': 'boolean'
          },
          'telcoId': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'timestamp': {
            'format': 'strict_date_optional_time||epoch_millis',
            'type': 'date'
          },
          'trackId': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'unit': {
           'index': 'not_analyzed',
            'type': 'string'
          },
          'userAgent': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'userId': {
           'index': 'not_analyzed',
            'type': 'string'
          },
          'userName': {
           'index': 'not_analyzed',
            'type': 'string'
          },
          'utmCampaign': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'utmMedium': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'utmSource': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'utmTerm': {
            'index': 'not_analyzed',
            'type': 'string'
          },
          'wid': {
            'index': 'not_analyzed',
            'type': 'string'
          }
        }
      }
    }
  }
}


# docs = [{u'index': {u'status': 400, u'_type': u'access', u'_id': u'AVWhd1G-CxDNumwFLhhS', u'error': {u'reason': u'mapper [sLang] cannot be changed from type [boolean] to [string]', u'type': u'illegal_argument_exception'}, u'_index': u'activities-test'}}, {u'index': {u'status': 400, u'_type': u'access', u'_id': u'AVVKNDeLCxDNumwFIjm7', u'error': {u'reason': u'mapper [sLang] cannot be changed from type [boolean] to [string]', u'type': u'illegal_argument_exception'}, u'_index': u'activities-test'}}]

# for doc in docs:
#   id_ = doc['index']['_id']
#   es.delete(index="activities",doc_type="access",id=id_)



# mapping = json.loads(acctivitesIndex)

srcIndex = 'activities'
dstIndex = 'activities-test'

# es.indices.create(index=dstIndex, body=acctivitesIndex['activities'])

query = {
  "from": 0,
  "size": 200,
  "query": {
    "bool": {
      "must": {
        "range": {
          "timestamp": {
            "from": "2016-08-01T00:00:00.000Z",
            "to": "2016-08-17T00:00:00.000Z",
            "include_lower": True,
            "include_upper": False
          }
        }
      }
    }
  }
}
print query
reindex(es, srcIndex, dstIndex, chunk_size=1000, scroll='5m', query=query)


# main(es, 'activities', 'activities-temp')



# query = {
#   "query": {
#     "bool": {
#       "must": {
#         "bool": {
#           "must": [
#             {
#               "wildcard": {
#                 "appId": "570f3a724bd04d9a3778bceb"
#               }
#             },
#             {
#               "range": {
#                 "timestamp": {
#                   "from": "2016-08-01T00:00:00.000+0700",
#                   "to": "2016-08-12T16:00:00.000+0700",
#                   "include_lower": 'true',
#                   "include_upper": 'true'
#                 }
#               }
#             }
#           ]
#         }
#       }
#     }
#   }
# }
# if not es.ping():
#     raise ValueError("Connection failed")

# response = es.search(index="installs", body=query,size=1000000)

# sample = response['hits']['hits']


# allRows = []
# headers = ["accountId","trackId","partnerId","packageName","appId","deviceId","userAgent","brandName","brandModel","osVersion","clientVersion",	"sdkVersion",	"screenSize",	"ram",	"cpu",	"email",	"sLang",	"cLang",	"ipPrivate",	"idfa",	"gaid",	"wid",	"macAddress",	"imei",	"telcoId",	"imsi",	"isWifi",	"is3G",	"isOther",	"utmSource","utmMedium",	"utmTerm",	"utmCampaign",	"platform","ipPublic",	"country",	"city",	"timestamp"	,"storeCallback"]
# allRows.append(headers)


# print len(sample)
# for doc in sample:
# 	_source = doc['_source'] 
# 	row = []
# 	for x in headers:
# 		try:
# 			row.append(_source[x].replace(';', ',').decode(encoding='UTF-8',errors='strict'))
# 		except Exception, e:
# 			row.append('')
# 	allRows.append(row)


# with open("exportFile-01.08-installs.csv", "wb") as f:
# 		writer = csv.writer(f, delimiter=',')
# 		writer.writerows(allRows)

# # response = es.search(index="activities", body={"query": { "bool": {"must": [ { "term": {"appId": "570f3a724bd04d9a3778bceb"}}, {"term": {"accountId": "57021c3df84360a131e9d0bc"} }] } }},size=5000)

# # print len(response['hits']['hits'])
# # for doc in response['hits']['hits']:
# # 	es.update(index='activities',doc_type='access',id=doc['_id'] ,body={"doc": {"accountId": "579ad0e4c52f721176135b57"}})
# # # s = Search().using(client).query("match", appId="570f3a724bd04d9a3778bceb")
# # # response = s.execute()

# # # res = es.search(index="installs-temp", body={"query": "match": {"appId": {"query": "570f3a724bd04d9a3778bceb"}}})


