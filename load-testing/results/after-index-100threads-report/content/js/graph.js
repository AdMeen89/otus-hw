/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 181.0, "minX": 0.0, "maxY": 2786.0, "series": [{"data": [[0.0, 181.0], [0.1, 181.0], [0.2, 202.0], [0.3, 202.0], [0.4, 202.0], [0.5, 202.0], [0.6, 202.0], [0.7, 202.0], [0.8, 202.0], [0.9, 202.0], [1.0, 202.0], [1.1, 202.0], [1.2, 203.0], [1.3, 203.0], [1.4, 203.0], [1.5, 203.0], [1.6, 203.0], [1.7, 203.0], [1.8, 203.0], [1.9, 203.0], [2.0, 203.0], [2.1, 203.0], [2.2, 203.0], [2.3, 203.0], [2.4, 203.0], [2.5, 203.0], [2.6, 203.0], [2.7, 203.0], [2.8, 203.0], [2.9, 203.0], [3.0, 203.0], [3.1, 203.0], [3.2, 203.0], [3.3, 203.0], [3.4, 203.0], [3.5, 230.0], [3.6, 230.0], [3.7, 231.0], [3.8, 231.0], [3.9, 233.0], [4.0, 233.0], [4.1, 307.0], [4.2, 307.0], [4.3, 382.0], [4.4, 382.0], [4.5, 418.0], [4.6, 418.0], [4.7, 430.0], [4.8, 430.0], [4.9, 468.0], [5.0, 468.0], [5.1, 468.0], [5.2, 468.0], [5.3, 469.0], [5.4, 469.0], [5.5, 474.0], [5.6, 474.0], [5.7, 492.0], [5.8, 492.0], [5.9, 493.0], [6.0, 493.0], [6.1, 496.0], [6.2, 496.0], [6.3, 497.0], [6.4, 497.0], [6.5, 497.0], [6.6, 497.0], [6.7, 498.0], [6.8, 498.0], [6.9, 498.0], [7.0, 498.0], [7.1, 498.0], [7.2, 498.0], [7.3, 498.0], [7.4, 498.0], [7.5, 498.0], [7.6, 498.0], [7.7, 502.0], [7.8, 502.0], [7.9, 504.0], [8.0, 504.0], [8.1, 508.0], [8.2, 508.0], [8.3, 512.0], [8.4, 512.0], [8.5, 512.0], [8.6, 512.0], [8.7, 513.0], [8.8, 513.0], [8.9, 513.0], [9.0, 513.0], [9.1, 514.0], [9.2, 514.0], [9.3, 514.0], [9.4, 514.0], [9.5, 515.0], [9.6, 515.0], [9.7, 515.0], [9.8, 515.0], [9.9, 523.0], [10.0, 523.0], [10.1, 527.0], [10.2, 527.0], [10.3, 540.0], [10.4, 540.0], [10.5, 540.0], [10.6, 540.0], [10.7, 541.0], [10.8, 541.0], [10.9, 542.0], [11.0, 542.0], [11.1, 542.0], [11.2, 542.0], [11.3, 543.0], [11.4, 543.0], [11.5, 543.0], [11.6, 543.0], [11.7, 558.0], [11.8, 558.0], [11.9, 561.0], [12.0, 561.0], [12.1, 565.0], [12.2, 565.0], [12.3, 574.0], [12.4, 577.0], [12.5, 577.0], [12.6, 577.0], [12.7, 577.0], [12.8, 578.0], [12.9, 578.0], [13.0, 578.0], [13.1, 578.0], [13.2, 578.0], [13.3, 578.0], [13.4, 579.0], [13.5, 579.0], [13.6, 579.0], [13.7, 579.0], [13.8, 579.0], [13.9, 579.0], [14.0, 579.0], [14.1, 579.0], [14.2, 579.0], [14.3, 579.0], [14.4, 579.0], [14.5, 579.0], [14.6, 579.0], [14.7, 579.0], [14.8, 580.0], [14.9, 580.0], [15.0, 580.0], [15.1, 580.0], [15.2, 580.0], [15.3, 580.0], [15.4, 580.0], [15.5, 580.0], [15.6, 580.0], [15.7, 586.0], [15.8, 608.0], [15.9, 608.0], [16.0, 612.0], [16.1, 612.0], [16.2, 614.0], [16.3, 614.0], [16.4, 674.0], [16.5, 674.0], [16.6, 676.0], [16.7, 676.0], [16.8, 678.0], [16.9, 678.0], [17.0, 682.0], [17.1, 682.0], [17.2, 683.0], [17.3, 683.0], [17.4, 687.0], [17.5, 687.0], [17.6, 688.0], [17.7, 688.0], [17.8, 689.0], [17.9, 689.0], [18.0, 690.0], [18.1, 690.0], [18.2, 690.0], [18.3, 690.0], [18.4, 692.0], [18.5, 692.0], [18.6, 697.0], [18.7, 697.0], [18.8, 736.0], [18.9, 736.0], [19.0, 736.0], [19.1, 736.0], [19.2, 737.0], [19.3, 737.0], [19.4, 737.0], [19.5, 737.0], [19.6, 737.0], [19.7, 737.0], [19.8, 745.0], [19.9, 745.0], [20.0, 746.0], [20.1, 746.0], [20.2, 746.0], [20.3, 746.0], [20.4, 747.0], [20.5, 747.0], [20.6, 747.0], [20.7, 747.0], [20.8, 747.0], [20.9, 747.0], [21.0, 748.0], [21.1, 748.0], [21.2, 787.0], [21.3, 787.0], [21.4, 790.0], [21.5, 790.0], [21.6, 806.0], [21.7, 806.0], [21.8, 825.0], [21.9, 825.0], [22.0, 856.0], [22.1, 856.0], [22.2, 858.0], [22.3, 858.0], [22.4, 859.0], [22.5, 859.0], [22.6, 863.0], [22.7, 863.0], [22.8, 864.0], [22.9, 864.0], [23.0, 866.0], [23.1, 866.0], [23.2, 866.0], [23.3, 866.0], [23.4, 867.0], [23.5, 867.0], [23.6, 868.0], [23.7, 868.0], [23.8, 868.0], [23.9, 868.0], [24.0, 869.0], [24.1, 869.0], [24.2, 869.0], [24.3, 869.0], [24.4, 869.0], [24.5, 869.0], [24.6, 869.0], [24.7, 869.0], [24.8, 869.0], [24.9, 869.0], [25.0, 869.0], [25.1, 869.0], [25.2, 870.0], [25.3, 870.0], [25.4, 871.0], [25.5, 871.0], [25.6, 872.0], [25.7, 872.0], [25.8, 872.0], [25.9, 872.0], [26.0, 874.0], [26.1, 874.0], [26.2, 875.0], [26.3, 875.0], [26.4, 877.0], [26.5, 877.0], [26.6, 878.0], [26.7, 878.0], [26.8, 878.0], [26.9, 878.0], [27.0, 879.0], [27.1, 879.0], [27.2, 879.0], [27.3, 879.0], [27.4, 879.0], [27.5, 879.0], [27.6, 880.0], [27.7, 880.0], [27.8, 880.0], [27.9, 880.0], [28.0, 880.0], [28.1, 880.0], [28.2, 881.0], [28.3, 881.0], [28.4, 881.0], [28.5, 881.0], [28.6, 882.0], [28.7, 882.0], [28.8, 882.0], [28.9, 882.0], [29.0, 889.0], [29.1, 889.0], [29.2, 890.0], [29.3, 890.0], [29.4, 890.0], [29.5, 890.0], [29.6, 890.0], [29.7, 890.0], [29.8, 891.0], [29.9, 891.0], [30.0, 891.0], [30.1, 891.0], [30.2, 891.0], [30.3, 891.0], [30.4, 892.0], [30.5, 892.0], [30.6, 892.0], [30.7, 892.0], [30.8, 892.0], [30.9, 892.0], [31.0, 892.0], [31.1, 892.0], [31.2, 892.0], [31.3, 892.0], [31.4, 892.0], [31.5, 892.0], [31.6, 892.0], [31.7, 892.0], [31.8, 893.0], [31.9, 893.0], [32.0, 893.0], [32.1, 893.0], [32.2, 893.0], [32.3, 893.0], [32.4, 893.0], [32.5, 893.0], [32.6, 893.0], [32.7, 893.0], [32.8, 893.0], [32.9, 893.0], [33.0, 893.0], [33.1, 893.0], [33.2, 894.0], [33.3, 894.0], [33.4, 894.0], [33.5, 894.0], [33.6, 894.0], [33.7, 894.0], [33.8, 912.0], [33.9, 912.0], [34.0, 913.0], [34.1, 913.0], [34.2, 913.0], [34.3, 913.0], [34.4, 914.0], [34.5, 914.0], [34.6, 914.0], [34.7, 914.0], [34.8, 914.0], [34.9, 914.0], [35.0, 914.0], [35.1, 914.0], [35.2, 914.0], [35.3, 914.0], [35.4, 915.0], [35.5, 915.0], [35.6, 915.0], [35.7, 915.0], [35.8, 915.0], [35.9, 915.0], [36.0, 915.0], [36.1, 915.0], [36.2, 915.0], [36.3, 915.0], [36.4, 915.0], [36.5, 915.0], [36.6, 916.0], [36.7, 916.0], [36.8, 916.0], [36.9, 916.0], [37.0, 916.0], [37.1, 916.0], [37.2, 916.0], [37.3, 916.0], [37.4, 917.0], [37.5, 917.0], [37.6, 917.0], [37.7, 917.0], [37.8, 937.0], [37.9, 937.0], [38.0, 938.0], [38.1, 938.0], [38.2, 939.0], [38.3, 939.0], [38.4, 939.0], [38.5, 939.0], [38.6, 939.0], [38.7, 939.0], [38.8, 939.0], [38.9, 939.0], [39.0, 948.0], [39.1, 948.0], [39.2, 969.0], [39.3, 969.0], [39.4, 974.0], [39.5, 974.0], [39.6, 974.0], [39.7, 974.0], [39.8, 977.0], [39.9, 977.0], [40.0, 980.0], [40.1, 980.0], [40.2, 981.0], [40.3, 981.0], [40.4, 984.0], [40.5, 984.0], [40.6, 1008.0], [40.7, 1008.0], [40.8, 1008.0], [40.9, 1008.0], [41.0, 1008.0], [41.1, 1008.0], [41.2, 1008.0], [41.3, 1008.0], [41.4, 1008.0], [41.5, 1008.0], [41.6, 1009.0], [41.7, 1009.0], [41.8, 1009.0], [41.9, 1009.0], [42.0, 1009.0], [42.1, 1009.0], [42.2, 1009.0], [42.3, 1009.0], [42.4, 1009.0], [42.5, 1009.0], [42.6, 1009.0], [42.7, 1009.0], [42.8, 1010.0], [42.9, 1010.0], [43.0, 1010.0], [43.1, 1010.0], [43.2, 1010.0], [43.3, 1010.0], [43.4, 1011.0], [43.5, 1011.0], [43.6, 1011.0], [43.7, 1011.0], [43.8, 1011.0], [43.9, 1011.0], [44.0, 1014.0], [44.1, 1014.0], [44.2, 1016.0], [44.3, 1016.0], [44.4, 1016.0], [44.5, 1026.0], [44.6, 1026.0], [44.7, 1027.0], [44.8, 1027.0], [44.9, 1028.0], [45.0, 1028.0], [45.1, 1030.0], [45.2, 1030.0], [45.3, 1030.0], [45.4, 1030.0], [45.5, 1034.0], [45.6, 1034.0], [45.7, 1050.0], [45.8, 1050.0], [45.9, 1050.0], [46.0, 1050.0], [46.1, 1052.0], [46.2, 1052.0], [46.3, 1052.0], [46.4, 1052.0], [46.5, 1053.0], [46.6, 1053.0], [46.7, 1053.0], [46.8, 1053.0], [46.9, 1053.0], [47.0, 1053.0], [47.1, 1053.0], [47.2, 1053.0], [47.3, 1053.0], [47.4, 1053.0], [47.5, 1057.0], [47.6, 1057.0], [47.7, 1063.0], [47.8, 1063.0], [47.9, 1094.0], [48.0, 1094.0], [48.1, 1122.0], [48.2, 1122.0], [48.3, 1145.0], [48.4, 1145.0], [48.5, 1146.0], [48.6, 1146.0], [48.7, 1146.0], [48.8, 1146.0], [48.9, 1146.0], [49.0, 1146.0], [49.1, 1147.0], [49.2, 1147.0], [49.3, 1148.0], [49.4, 1148.0], [49.5, 1173.0], [49.6, 1173.0], [49.7, 1244.0], [49.8, 1244.0], [49.9, 1293.0], [50.0, 1293.0], [50.1, 1306.0], [50.2, 1306.0], [50.3, 1307.0], [50.4, 1307.0], [50.5, 1307.0], [50.6, 1307.0], [50.7, 1308.0], [50.8, 1308.0], [50.9, 1309.0], [51.0, 1309.0], [51.1, 1310.0], [51.2, 1310.0], [51.3, 1311.0], [51.4, 1311.0], [51.5, 1336.0], [51.6, 1336.0], [51.7, 1339.0], [51.8, 1339.0], [51.9, 1339.0], [52.0, 1339.0], [52.1, 1395.0], [52.2, 1395.0], [52.3, 1395.0], [52.4, 1395.0], [52.5, 1411.0], [52.6, 1411.0], [52.7, 1412.0], [52.8, 1412.0], [52.9, 1413.0], [53.0, 1413.0], [53.1, 1423.0], [53.2, 1423.0], [53.3, 1423.0], [53.4, 1423.0], [53.5, 1424.0], [53.6, 1424.0], [53.7, 1425.0], [53.8, 1425.0], [53.9, 1425.0], [54.0, 1425.0], [54.1, 1426.0], [54.2, 1426.0], [54.3, 1426.0], [54.4, 1426.0], [54.5, 1427.0], [54.6, 1427.0], [54.7, 1427.0], [54.8, 1427.0], [54.9, 1427.0], [55.0, 1427.0], [55.1, 1428.0], [55.2, 1428.0], [55.3, 1428.0], [55.4, 1428.0], [55.5, 1452.0], [55.6, 1452.0], [55.7, 1455.0], [55.8, 1455.0], [55.9, 1456.0], [56.0, 1456.0], [56.1, 1460.0], [56.2, 1460.0], [56.3, 1461.0], [56.4, 1461.0], [56.5, 1461.0], [56.6, 1461.0], [56.7, 1462.0], [56.8, 1462.0], [56.9, 1462.0], [57.0, 1462.0], [57.1, 1462.0], [57.2, 1462.0], [57.3, 1462.0], [57.4, 1462.0], [57.5, 1463.0], [57.6, 1463.0], [57.7, 1463.0], [57.8, 1463.0], [57.9, 1464.0], [58.0, 1464.0], [58.1, 1465.0], [58.2, 1465.0], [58.3, 1476.0], [58.4, 1476.0], [58.5, 1477.0], [58.6, 1477.0], [58.7, 1477.0], [58.8, 1477.0], [58.9, 1477.0], [59.0, 1477.0], [59.1, 1477.0], [59.2, 1477.0], [59.3, 1478.0], [59.4, 1478.0], [59.5, 1479.0], [59.6, 1479.0], [59.7, 1479.0], [59.8, 1479.0], [59.9, 1479.0], [60.0, 1479.0], [60.1, 1479.0], [60.2, 1479.0], [60.3, 1480.0], [60.4, 1480.0], [60.5, 1481.0], [60.6, 1481.0], [60.7, 1503.0], [60.8, 1503.0], [60.9, 1504.0], [61.0, 1504.0], [61.1, 1504.0], [61.2, 1504.0], [61.3, 1505.0], [61.4, 1505.0], [61.5, 1507.0], [61.6, 1507.0], [61.7, 1507.0], [61.8, 1507.0], [61.9, 1507.0], [62.0, 1507.0], [62.1, 1508.0], [62.2, 1508.0], [62.3, 1509.0], [62.4, 1509.0], [62.5, 1510.0], [62.6, 1510.0], [62.7, 1510.0], [62.8, 1510.0], [62.9, 1511.0], [63.0, 1511.0], [63.1, 1511.0], [63.2, 1511.0], [63.3, 1511.0], [63.4, 1511.0], [63.5, 1511.0], [63.6, 1511.0], [63.7, 1523.0], [63.8, 1523.0], [63.9, 1524.0], [64.0, 1524.0], [64.1, 1524.0], [64.2, 1524.0], [64.3, 1524.0], [64.4, 1524.0], [64.5, 1525.0], [64.6, 1525.0], [64.7, 1525.0], [64.8, 1525.0], [64.9, 1525.0], [65.0, 1525.0], [65.1, 1525.0], [65.2, 1525.0], [65.3, 1526.0], [65.4, 1526.0], [65.5, 1527.0], [65.6, 1527.0], [65.7, 1528.0], [65.8, 1528.0], [65.9, 1532.0], [66.0, 1532.0], [66.1, 1533.0], [66.2, 1533.0], [66.3, 1536.0], [66.4, 1536.0], [66.5, 1564.0], [66.6, 1564.0], [66.7, 1565.0], [66.8, 1565.0], [66.9, 1567.0], [67.0, 1567.0], [67.1, 1567.0], [67.2, 1567.0], [67.3, 1568.0], [67.4, 1568.0], [67.5, 1568.0], [67.6, 1568.0], [67.7, 1568.0], [67.8, 1568.0], [67.9, 1568.0], [68.0, 1568.0], [68.1, 1569.0], [68.2, 1569.0], [68.3, 1569.0], [68.4, 1569.0], [68.5, 1569.0], [68.6, 1569.0], [68.7, 1573.0], [68.8, 1573.0], [68.9, 1581.0], [69.0, 1581.0], [69.1, 1581.0], [69.2, 1581.0], [69.3, 1582.0], [69.4, 1582.0], [69.5, 1582.0], [69.6, 1582.0], [69.7, 1583.0], [69.8, 1583.0], [69.9, 1584.0], [70.0, 1584.0], [70.1, 1598.0], [70.2, 1598.0], [70.3, 1599.0], [70.4, 1599.0], [70.5, 1599.0], [70.6, 1599.0], [70.7, 1600.0], [70.8, 1600.0], [70.9, 1600.0], [71.0, 1600.0], [71.1, 1601.0], [71.2, 1601.0], [71.3, 1601.0], [71.4, 1601.0], [71.5, 1602.0], [71.6, 1602.0], [71.7, 1602.0], [71.8, 1602.0], [71.9, 1602.0], [72.0, 1602.0], [72.1, 1602.0], [72.2, 1602.0], [72.3, 1603.0], [72.4, 1603.0], [72.5, 1603.0], [72.6, 1603.0], [72.7, 1603.0], [72.8, 1603.0], [72.9, 1604.0], [73.0, 1604.0], [73.1, 1604.0], [73.2, 1604.0], [73.3, 1604.0], [73.4, 1604.0], [73.5, 1604.0], [73.6, 1604.0], [73.7, 1605.0], [73.8, 1605.0], [73.9, 1605.0], [74.0, 1605.0], [74.1, 1619.0], [74.2, 1619.0], [74.3, 1621.0], [74.4, 1621.0], [74.5, 1629.0], [74.6, 1629.0], [74.7, 1629.0], [74.8, 1629.0], [74.9, 1630.0], [75.0, 1630.0], [75.1, 1630.0], [75.2, 1630.0], [75.3, 1630.0], [75.4, 1630.0], [75.5, 1631.0], [75.6, 1631.0], [75.7, 1631.0], [75.8, 1631.0], [75.9, 1631.0], [76.0, 1631.0], [76.1, 1632.0], [76.2, 1632.0], [76.3, 1632.0], [76.4, 1632.0], [76.5, 1632.0], [76.6, 1632.0], [76.7, 1633.0], [76.8, 1633.0], [76.9, 1633.0], [77.0, 1633.0], [77.1, 1635.0], [77.2, 1635.0], [77.3, 1635.0], [77.4, 1635.0], [77.5, 1637.0], [77.6, 1637.0], [77.7, 1637.0], [77.8, 1637.0], [77.9, 1660.0], [78.0, 1660.0], [78.1, 1671.0], [78.2, 1671.0], [78.3, 1703.0], [78.4, 1703.0], [78.5, 1703.0], [78.6, 1703.0], [78.7, 1703.0], [78.8, 1703.0], [78.9, 1703.0], [79.0, 1703.0], [79.1, 1704.0], [79.2, 1704.0], [79.3, 1704.0], [79.4, 1704.0], [79.5, 1704.0], [79.6, 1704.0], [79.7, 1704.0], [79.8, 1704.0], [79.9, 1705.0], [80.0, 1705.0], [80.1, 1705.0], [80.2, 1705.0], [80.3, 1708.0], [80.4, 1708.0], [80.5, 1708.0], [80.6, 1708.0], [80.7, 1708.0], [80.8, 1708.0], [80.9, 1708.0], [81.0, 1708.0], [81.1, 1709.0], [81.2, 1709.0], [81.3, 1709.0], [81.4, 1709.0], [81.5, 1709.0], [81.6, 1709.0], [81.7, 1709.0], [81.8, 1709.0], [81.9, 1709.0], [82.0, 1709.0], [82.1, 1709.0], [82.2, 1709.0], [82.3, 1710.0], [82.4, 1710.0], [82.5, 1710.0], [82.6, 1710.0], [82.7, 1710.0], [82.8, 1710.0], [82.9, 1710.0], [83.0, 1710.0], [83.1, 1710.0], [83.2, 1710.0], [83.3, 1710.0], [83.4, 1710.0], [83.5, 1711.0], [83.6, 1711.0], [83.7, 1711.0], [83.8, 1711.0], [83.9, 1711.0], [84.0, 1711.0], [84.1, 1718.0], [84.2, 1718.0], [84.3, 1719.0], [84.4, 1719.0], [84.5, 1720.0], [84.6, 1720.0], [84.7, 1721.0], [84.8, 1721.0], [84.9, 1726.0], [85.0, 1726.0], [85.1, 1759.0], [85.2, 1759.0], [85.3, 1767.0], [85.4, 1767.0], [85.5, 1769.0], [85.6, 1769.0], [85.7, 1771.0], [85.8, 1771.0], [85.9, 1771.0], [86.0, 1771.0], [86.1, 1785.0], [86.2, 1785.0], [86.3, 1786.0], [86.4, 1786.0], [86.5, 1787.0], [86.6, 1787.0], [86.7, 1799.0], [86.8, 1799.0], [86.9, 1800.0], [87.0, 1800.0], [87.1, 1803.0], [87.2, 1803.0], [87.3, 1805.0], [87.4, 1805.0], [87.5, 1817.0], [87.6, 1817.0], [87.7, 1818.0], [87.8, 1818.0], [87.9, 1820.0], [88.0, 1820.0], [88.1, 1820.0], [88.2, 1820.0], [88.3, 1821.0], [88.4, 1821.0], [88.5, 1854.0], [88.6, 1854.0], [88.7, 1864.0], [88.8, 1864.0], [88.9, 1865.0], [89.0, 1865.0], [89.1, 1867.0], [89.2, 1867.0], [89.3, 1871.0], [89.4, 1871.0], [89.5, 1872.0], [89.6, 1872.0], [89.7, 1873.0], [89.8, 1873.0], [89.9, 1888.0], [90.0, 1888.0], [90.1, 1888.0], [90.2, 1888.0], [90.3, 1889.0], [90.4, 1889.0], [90.5, 1889.0], [90.6, 1889.0], [90.7, 1891.0], [90.8, 1891.0], [90.9, 1895.0], [91.0, 1895.0], [91.1, 1896.0], [91.2, 1896.0], [91.3, 1901.0], [91.4, 1901.0], [91.5, 1902.0], [91.6, 1902.0], [91.7, 1902.0], [91.8, 1902.0], [91.9, 1905.0], [92.0, 1905.0], [92.1, 1907.0], [92.2, 1907.0], [92.3, 1931.0], [92.4, 1931.0], [92.5, 1933.0], [92.6, 1933.0], [92.7, 1956.0], [92.8, 1956.0], [92.9, 1985.0], [93.0, 1985.0], [93.1, 1994.0], [93.2, 1994.0], [93.3, 1997.0], [93.4, 1997.0], [93.5, 1997.0], [93.6, 1997.0], [93.7, 2024.0], [93.8, 2024.0], [93.9, 2025.0], [94.0, 2025.0], [94.1, 2025.0], [94.2, 2025.0], [94.3, 2026.0], [94.4, 2026.0], [94.5, 2027.0], [94.6, 2027.0], [94.7, 2027.0], [94.8, 2027.0], [94.9, 2028.0], [95.0, 2028.0], [95.1, 2028.0], [95.2, 2028.0], [95.3, 2028.0], [95.4, 2028.0], [95.5, 2028.0], [95.6, 2028.0], [95.7, 2062.0], [95.8, 2062.0], [95.9, 2067.0], [96.0, 2067.0], [96.1, 2092.0], [96.2, 2092.0], [96.3, 2093.0], [96.4, 2093.0], [96.5, 2094.0], [96.6, 2094.0], [96.7, 2097.0], [96.8, 2097.0], [96.9, 2218.0], [97.0, 2218.0], [97.1, 2219.0], [97.2, 2219.0], [97.3, 2220.0], [97.4, 2220.0], [97.5, 2752.0], [97.6, 2752.0], [97.7, 2753.0], [97.8, 2753.0], [97.9, 2755.0], [98.0, 2755.0], [98.1, 2773.0], [98.2, 2773.0], [98.3, 2775.0], [98.4, 2775.0], [98.5, 2775.0], [98.6, 2775.0], [98.7, 2776.0], [98.8, 2776.0], [98.9, 2777.0], [99.0, 2777.0], [99.1, 2782.0], [99.2, 2782.0], [99.3, 2784.0], [99.4, 2784.0], [99.5, 2784.0], [99.6, 2784.0], [99.7, 2786.0], [99.8, 2786.0], [99.9, 2786.0], [100.0, 2786.0]], "isOverall": false, "label": "Search Users", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 100.0, "maxY": 61.0, "series": [{"data": [[2200.0, 3.0], [600.0, 15.0], [700.0, 14.0], [2700.0, 13.0], [200.0, 19.0], [800.0, 61.0], [900.0, 34.0], [1000.0, 37.0], [1100.0, 8.0], [300.0, 2.0], [1200.0, 2.0], [1300.0, 12.0], [1400.0, 41.0], [1500.0, 50.0], [1600.0, 38.0], [400.0, 16.0], [100.0, 1.0], [1700.0, 43.0], [1800.0, 22.0], [1900.0, 12.0], [2000.0, 16.0], [500.0, 41.0]], "isOverall": false, "label": "Search Users", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 2700.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 38.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 265.0, "series": [{"data": [[0.0, 38.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 265.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 197.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 95.2, "minX": 1.7507925E12, "maxY": 95.2, "series": [{"data": [[1.7507925E12, 95.2]], "isOverall": false, "label": "Search Test", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7507925E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 202.6875, "minX": 16.0, "maxY": 1339.0530303030298, "series": [{"data": [[16.0, 202.6875], [88.0, 965.9772727272726], [100.0, 1339.0530303030298]], "isOverall": false, "label": "Search Users", "isController": false}, {"data": [[95.2, 1237.0279999999984]], "isOverall": false, "label": "Search Users-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 1547.1, "minX": 1.7507925E12, "maxY": 45737.4, "series": [{"data": [[1.7507925E12, 45737.4]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.7507925E12, 1547.1]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7507925E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 1237.0279999999984, "minX": 1.7507925E12, "maxY": 1237.0279999999984, "series": [{"data": [[1.7507925E12, 1237.0279999999984]], "isOverall": false, "label": "Search Users", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7507925E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 1169.3120000000001, "minX": 1.7507925E12, "maxY": 1169.3120000000001, "series": [{"data": [[1.7507925E12, 1169.3120000000001]], "isOverall": false, "label": "Search Users", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7507925E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 210.3779999999996, "minX": 1.7507925E12, "maxY": 210.3779999999996, "series": [{"data": [[1.7507925E12, 210.3779999999996]], "isOverall": false, "label": "Search Users", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7507925E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 181.0, "minX": 1.7507925E12, "maxY": 2786.0, "series": [{"data": [[1.7507925E12, 2786.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.7507925E12, 1888.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.7507925E12, 2781.95]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.7507925E12, 2028.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.7507925E12, 181.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.7507925E12, 1299.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7507925E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 203.0, "minX": 16.0, "maxY": 1820.0, "series": [{"data": [[16.0, 203.0], [79.0, 879.0], [89.0, 1820.0], [88.0, 916.0], [100.0, 1479.0], [28.0, 1703.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 100.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 197.0, "minX": 16.0, "maxY": 1819.0, "series": [{"data": [[16.0, 197.0], [79.0, 754.0], [89.0, 1819.0], [88.0, 893.0], [100.0, 1339.5], [28.0, 1703.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 100.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 8.333333333333334, "minX": 1.7507925E12, "maxY": 8.333333333333334, "series": [{"data": [[1.7507925E12, 8.333333333333334]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7507925E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 8.333333333333334, "minX": 1.7507925E12, "maxY": 8.333333333333334, "series": [{"data": [[1.7507925E12, 8.333333333333334]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7507925E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 8.333333333333334, "minX": 1.7507925E12, "maxY": 8.333333333333334, "series": [{"data": [[1.7507925E12, 8.333333333333334]], "isOverall": false, "label": "Search Users-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7507925E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 8.333333333333334, "minX": 1.7507925E12, "maxY": 8.333333333333334, "series": [{"data": [[1.7507925E12, 8.333333333333334]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7507925E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

