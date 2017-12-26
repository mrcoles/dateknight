Crawl
=====

These scripts are to pull down the latest data from the reference pages and to compare that data with what is in ../langs/.

Create crawled files such as:

```
mkdir -p data
node momentjs.js > data/momentjs.json
node python.js > data/django.json
node python.js > data/python.json
```

Check for missing data from the crawled values vs what's in ./langs/* via:

```
node compare.js ./data/momentjs.json ../langs/momentjs.json
```
