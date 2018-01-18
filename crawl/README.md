Crawl
=====

Configure data to crawl any site inside `SITES.json`.

The relevant fields for a site are:

*   id = the id name we use in the rest of this project
*   url = the URL where we can download the documentation
*   rows = a query selector to grab the relevant rows
*   fields = individual query selectors to grab the data for each row

Run via:

```
node main.js
```

The results are hidden under the `.crawls` directory.



## WIP

Check for missing data from the crawled values vs what's in ./langs/* via:

```
node compare.js ./.crawls/momentjs.json ../langs/momentjs.json
```
