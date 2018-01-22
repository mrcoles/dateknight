
Date Knight
===========

A universal date time formatting reference.


## Running locally

A react create app project exists underneath `web/`. In order to run it, you need to:

1.  Copy the json files into the web project:

    ```
    bash copy_json.sh
    ```

2.  Initialize the project:

    ```
    cd web/
    npm install
    ```

3.  Run the dev server (and sass watcher):

    ```
    npm start
    ```

## Crawling sources

The data inside `langs/` can be compared to what's online by pulling down the latest format codes from online. This info is specified in `CRAWL.json` and stored in `crawls/`. It is pulled down via:

```bash
node scripts/crawl.js
```

(The HTML results are cached for 7 weeks. If something updates, you can clear the .cache/ directory.)

You can compare the `crawls/` with the `langs/` directory by running:

```bash
node scripts/compare.js --missing crawls/ langs/
node scripts/compare.js --overlaps crawls/ langs/
```

Run `compare.js -h` for more info.
