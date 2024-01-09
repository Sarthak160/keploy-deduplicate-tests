```
Keploy Deduplication Library for tests 
```

Deduplication works only on test mode there are no special instructions to record your tests.

1) `npm i github:Sarthak160/keploy-deduplicate-tests`

2) `require('keploy-deduplicate-tests/dist/integrations/express/register')` on top of your server.js/app.js file

3) `sudo -E enterprise-server test -c "<your command to run node server>"  --delay 10 --dedup`

4) (optional) `keploy dedup --rm` to remove all the deduplication files 