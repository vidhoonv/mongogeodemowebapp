# Demo NodeJS webapp.
Geo Replication using Mongo API support Powered by **Azure DocumentDB**

* Please use only the following regions as Read/Write regions of DocumentDB account or to run workers.
 * South Central US
 * East US
 * West US
 * West Europe
 * South India
 * SouthEast Asia
 * Japan West
 * Australia East
 * Brazil South
* Details:
 * Latency Measurement is done by performing 1000 read/write operations and measuring p99 latency .
 * The home page is autorefreshed (actually map and charts are re rendered) every 30 secs. This can be modified.
 * All DB operations should be done from portal.
 * DB Acc used by Worker: mongodemovishi (Contact me for other details)
* Handy tools and libs used:
 * Chart courtesy - [Google Charts API](https://developers.google.com/chart/)  
 * Map courtesy -  [jvectormap](http://jvectormap.com/)                