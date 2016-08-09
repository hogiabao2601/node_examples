from elasticsearch.helpers import reindex
from elasticsearch import Elasticsearch
import csv
# from elasticsearch_dsl import Search

# def main(client, srcIndex, dstIndex):
# 	reindex(client, srcIndex, dstIndex, chunk_size=500, scroll=u'5m')

es = Elasticsearch(["itracking.io"], maxsize=25, verify_certs=True)

query = {
  "query": {
    "bool": {
      "must": {
        "bool": {
          "must": [
            {
              "wildcard": {
                "appId": "570f3a724bd04d9a3778bceb"
              }
            },
            {
              "range": {
                "timestamp": {
                  "from": "2016-07-31T00:00:00.000+0700",
                  "to": "2016-07-31T23:59:59.999+0700",
                  "include_lower": 'true',
                  "include_upper": 'true'
                }
              }
            }
          ]
        }
      }
    }
  }
}
# if not es.ping():
#     raise ValueError("Connection failed")

# main(es, 'installs-temp', 'installs')
response = es.search(index="installs", body=query,size=10)

sample = response['hits']['hits']sad


allRows = []
headers = ["accountId","trackId","partnerId","packageName","appId","deviceId","userAgent","brandName","brandModel","osVersion","clientVersion",	"sdkVersion",	"screenSize",	"ram",	"cpu",	"email",	"sLang",	"cLang",	"ipPrivate",	"idfa",	"gaid",	"wid",	"macAddress",	"imei",	"telcoId",	"imsi",	"isWifi",	"is3G",	"isOther",	"utmSource","utmMedium",	"utmTerm",	"utmCampaign",	"platform","ipPublic",	"country",	"city",	"timestamp"	,"storeCallback"]
allRows.append(headers)


print len(sample)
for doc in sample:
	_source = doc['_source'] 
	row = []
	for x in headers:
		try:
			row.append(_source[x].replace(';', ',').decode(encoding='UTF-8','strict'))
		except Exception, e:
			row.append('')
	# print row
	allRows.append(row)


with open("exportFile.csv", "wb") as f:
		writer = csv.writer(f, delimiter=',')
		writer.writerows(allRows)

# response = es.search(index="activities", body={"query": { "bool": {"must": [ { "term": {"appId": "570f3a724bd04d9a3778bceb"}}, {"term": {"accountId": "57021c3df84360a131e9d0bc"} }] } }},size=5000)

# print len(response['hits']['hits'])
# for doc in response['hits']['hits']:
# 	es.update(index='activities',doc_type='access',id=doc['_id'] ,body={"doc": {"accountId": "579ad0e4c52f721176135b57"}})
# # s = Search().using(client).query("match", appId="570f3a724bd04d9a3778bceb")
# # response = s.execute()

# # res = es.search(index="installs-temp", body={"query": "match": {"appId": {"query": "570f3a724bd04d9a3778bceb"}}})


