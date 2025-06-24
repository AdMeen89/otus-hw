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
        data: {"result": {"minY": 22.0, "minX": 0.0, "maxY": 899.0, "series": [{"data": [[0.0, 22.0], [0.1, 22.0], [0.2, 22.0], [0.3, 22.0], [0.4, 22.0], [0.5, 22.0], [0.6, 22.0], [0.7, 22.0], [0.8, 22.0], [0.9, 22.0], [1.0, 23.0], [1.1, 23.0], [1.2, 23.0], [1.3, 23.0], [1.4, 23.0], [1.5, 23.0], [1.6, 23.0], [1.7, 23.0], [1.8, 23.0], [1.9, 23.0], [2.0, 26.0], [2.1, 26.0], [2.2, 26.0], [2.3, 26.0], [2.4, 26.0], [2.5, 26.0], [2.6, 26.0], [2.7, 26.0], [2.8, 26.0], [2.9, 26.0], [3.0, 43.0], [3.1, 43.0], [3.2, 43.0], [3.3, 43.0], [3.4, 43.0], [3.5, 43.0], [3.6, 43.0], [3.7, 43.0], [3.8, 43.0], [3.9, 43.0], [4.0, 56.0], [4.1, 56.0], [4.2, 56.0], [4.3, 56.0], [4.4, 56.0], [4.5, 56.0], [4.6, 56.0], [4.7, 56.0], [4.8, 56.0], [4.9, 56.0], [5.0, 59.0], [5.1, 59.0], [5.2, 59.0], [5.3, 59.0], [5.4, 59.0], [5.5, 59.0], [5.6, 59.0], [5.7, 59.0], [5.8, 59.0], [5.9, 59.0], [6.0, 89.0], [6.1, 89.0], [6.2, 89.0], [6.3, 89.0], [6.4, 89.0], [6.5, 89.0], [6.6, 89.0], [6.7, 89.0], [6.8, 89.0], [6.9, 89.0], [7.0, 90.0], [7.1, 90.0], [7.2, 90.0], [7.3, 90.0], [7.4, 90.0], [7.5, 90.0], [7.6, 90.0], [7.7, 90.0], [7.8, 90.0], [7.9, 90.0], [8.0, 99.0], [8.1, 99.0], [8.2, 99.0], [8.3, 99.0], [8.4, 99.0], [8.5, 99.0], [8.6, 99.0], [8.7, 99.0], [8.8, 99.0], [8.9, 99.0], [9.0, 100.0], [9.1, 100.0], [9.2, 100.0], [9.3, 100.0], [9.4, 100.0], [9.5, 100.0], [9.6, 100.0], [9.7, 100.0], [9.8, 100.0], [9.9, 100.0], [10.0, 110.0], [10.1, 110.0], [10.2, 110.0], [10.3, 110.0], [10.4, 110.0], [10.5, 110.0], [10.6, 110.0], [10.7, 110.0], [10.8, 110.0], [10.9, 110.0], [11.0, 111.0], [11.1, 111.0], [11.2, 111.0], [11.3, 111.0], [11.4, 111.0], [11.5, 111.0], [11.6, 111.0], [11.7, 111.0], [11.8, 111.0], [11.9, 111.0], [12.0, 153.0], [12.1, 153.0], [12.2, 153.0], [12.3, 153.0], [12.4, 153.0], [12.5, 153.0], [12.6, 153.0], [12.7, 153.0], [12.8, 153.0], [12.9, 153.0], [13.0, 159.0], [13.1, 159.0], [13.2, 159.0], [13.3, 159.0], [13.4, 159.0], [13.5, 159.0], [13.6, 159.0], [13.7, 159.0], [13.8, 159.0], [13.9, 159.0], [14.0, 161.0], [14.1, 161.0], [14.2, 161.0], [14.3, 161.0], [14.4, 161.0], [14.5, 161.0], [14.6, 161.0], [14.7, 161.0], [14.8, 161.0], [14.9, 161.0], [15.0, 164.0], [15.1, 164.0], [15.2, 164.0], [15.3, 164.0], [15.4, 164.0], [15.5, 164.0], [15.6, 164.0], [15.7, 164.0], [15.8, 164.0], [15.9, 164.0], [16.0, 182.0], [16.1, 182.0], [16.2, 182.0], [16.3, 182.0], [16.4, 182.0], [16.5, 182.0], [16.6, 182.0], [16.7, 182.0], [16.8, 182.0], [16.9, 182.0], [17.0, 184.0], [17.1, 184.0], [17.2, 184.0], [17.3, 184.0], [17.4, 184.0], [17.5, 184.0], [17.6, 184.0], [17.7, 184.0], [17.8, 184.0], [17.9, 184.0], [18.0, 185.0], [18.1, 185.0], [18.2, 185.0], [18.3, 185.0], [18.4, 185.0], [18.5, 185.0], [18.6, 185.0], [18.7, 185.0], [18.8, 185.0], [18.9, 185.0], [19.0, 195.0], [19.1, 195.0], [19.2, 195.0], [19.3, 195.0], [19.4, 195.0], [19.5, 195.0], [19.6, 195.0], [19.7, 195.0], [19.8, 195.0], [19.9, 195.0], [20.0, 197.0], [20.1, 197.0], [20.2, 197.0], [20.3, 197.0], [20.4, 197.0], [20.5, 197.0], [20.6, 197.0], [20.7, 197.0], [20.8, 197.0], [20.9, 197.0], [21.0, 199.0], [21.1, 199.0], [21.2, 199.0], [21.3, 199.0], [21.4, 199.0], [21.5, 199.0], [21.6, 199.0], [21.7, 199.0], [21.8, 199.0], [21.9, 199.0], [22.0, 202.0], [22.1, 202.0], [22.2, 202.0], [22.3, 202.0], [22.4, 202.0], [22.5, 202.0], [22.6, 202.0], [22.7, 202.0], [22.8, 202.0], [22.9, 202.0], [23.0, 206.0], [23.1, 206.0], [23.2, 206.0], [23.3, 206.0], [23.4, 206.0], [23.5, 206.0], [23.6, 206.0], [23.7, 206.0], [23.8, 206.0], [23.9, 206.0], [24.0, 218.0], [24.1, 218.0], [24.2, 218.0], [24.3, 218.0], [24.4, 218.0], [24.5, 218.0], [24.6, 218.0], [24.7, 218.0], [24.8, 218.0], [24.9, 218.0], [25.0, 259.0], [25.1, 259.0], [25.2, 259.0], [25.3, 259.0], [25.4, 259.0], [25.5, 259.0], [25.6, 259.0], [25.7, 259.0], [25.8, 259.0], [25.9, 259.0], [26.0, 268.0], [26.1, 268.0], [26.2, 268.0], [26.3, 268.0], [26.4, 268.0], [26.5, 268.0], [26.6, 268.0], [26.7, 268.0], [26.8, 268.0], [26.9, 268.0], [27.0, 281.0], [27.1, 281.0], [27.2, 281.0], [27.3, 281.0], [27.4, 281.0], [27.5, 281.0], [27.6, 281.0], [27.7, 281.0], [27.8, 281.0], [27.9, 281.0], [28.0, 288.0], [28.1, 288.0], [28.2, 288.0], [28.3, 288.0], [28.4, 288.0], [28.5, 288.0], [28.6, 288.0], [28.7, 288.0], [28.8, 288.0], [28.9, 288.0], [29.0, 292.0], [29.1, 292.0], [29.2, 292.0], [29.3, 292.0], [29.4, 292.0], [29.5, 292.0], [29.6, 292.0], [29.7, 292.0], [29.8, 292.0], [29.9, 292.0], [30.0, 292.0], [30.1, 292.0], [30.2, 292.0], [30.3, 292.0], [30.4, 292.0], [30.5, 292.0], [30.6, 292.0], [30.7, 292.0], [30.8, 292.0], [30.9, 292.0], [31.0, 292.0], [31.1, 292.0], [31.2, 292.0], [31.3, 292.0], [31.4, 292.0], [31.5, 292.0], [31.6, 292.0], [31.7, 292.0], [31.8, 292.0], [31.9, 292.0], [32.0, 292.0], [32.1, 292.0], [32.2, 292.0], [32.3, 292.0], [32.4, 292.0], [32.5, 292.0], [32.6, 292.0], [32.7, 292.0], [32.8, 292.0], [32.9, 292.0], [33.0, 295.0], [33.1, 295.0], [33.2, 295.0], [33.3, 295.0], [33.4, 295.0], [33.5, 295.0], [33.6, 295.0], [33.7, 295.0], [33.8, 295.0], [33.9, 295.0], [34.0, 300.0], [34.1, 300.0], [34.2, 300.0], [34.3, 300.0], [34.4, 300.0], [34.5, 300.0], [34.6, 300.0], [34.7, 300.0], [34.8, 300.0], [34.9, 300.0], [35.0, 302.0], [35.1, 302.0], [35.2, 302.0], [35.3, 302.0], [35.4, 302.0], [35.5, 302.0], [35.6, 302.0], [35.7, 302.0], [35.8, 302.0], [35.9, 302.0], [36.0, 307.0], [36.1, 307.0], [36.2, 307.0], [36.3, 307.0], [36.4, 307.0], [36.5, 307.0], [36.6, 307.0], [36.7, 307.0], [36.8, 307.0], [36.9, 307.0], [37.0, 309.0], [37.1, 309.0], [37.2, 309.0], [37.3, 309.0], [37.4, 309.0], [37.5, 309.0], [37.6, 309.0], [37.7, 309.0], [37.8, 309.0], [37.9, 309.0], [38.0, 309.0], [38.1, 309.0], [38.2, 309.0], [38.3, 309.0], [38.4, 309.0], [38.5, 309.0], [38.6, 309.0], [38.7, 309.0], [38.8, 309.0], [38.9, 309.0], [39.0, 310.0], [39.1, 310.0], [39.2, 310.0], [39.3, 310.0], [39.4, 310.0], [39.5, 310.0], [39.6, 310.0], [39.7, 310.0], [39.8, 310.0], [39.9, 310.0], [40.0, 311.0], [40.1, 311.0], [40.2, 311.0], [40.3, 311.0], [40.4, 311.0], [40.5, 311.0], [40.6, 311.0], [40.7, 311.0], [40.8, 311.0], [40.9, 311.0], [41.0, 311.0], [41.1, 311.0], [41.2, 311.0], [41.3, 311.0], [41.4, 311.0], [41.5, 311.0], [41.6, 311.0], [41.7, 311.0], [41.8, 311.0], [41.9, 311.0], [42.0, 316.0], [42.1, 316.0], [42.2, 316.0], [42.3, 316.0], [42.4, 316.0], [42.5, 316.0], [42.6, 316.0], [42.7, 316.0], [42.8, 316.0], [42.9, 316.0], [43.0, 319.0], [43.1, 319.0], [43.2, 319.0], [43.3, 319.0], [43.4, 319.0], [43.5, 319.0], [43.6, 319.0], [43.7, 319.0], [43.8, 319.0], [43.9, 319.0], [44.0, 362.0], [44.1, 362.0], [44.2, 362.0], [44.3, 362.0], [44.4, 362.0], [44.5, 362.0], [44.6, 362.0], [44.7, 362.0], [44.8, 362.0], [44.9, 362.0], [45.0, 374.0], [45.1, 374.0], [45.2, 374.0], [45.3, 374.0], [45.4, 374.0], [45.5, 374.0], [45.6, 374.0], [45.7, 374.0], [45.8, 374.0], [45.9, 374.0], [46.0, 375.0], [46.1, 375.0], [46.2, 375.0], [46.3, 375.0], [46.4, 375.0], [46.5, 375.0], [46.6, 375.0], [46.7, 375.0], [46.8, 375.0], [46.9, 375.0], [47.0, 381.0], [47.1, 381.0], [47.2, 381.0], [47.3, 381.0], [47.4, 381.0], [47.5, 381.0], [47.6, 381.0], [47.7, 381.0], [47.8, 381.0], [47.9, 381.0], [48.0, 386.0], [48.1, 386.0], [48.2, 386.0], [48.3, 386.0], [48.4, 386.0], [48.5, 386.0], [48.6, 386.0], [48.7, 386.0], [48.8, 386.0], [48.9, 386.0], [49.0, 387.0], [49.1, 387.0], [49.2, 387.0], [49.3, 387.0], [49.4, 387.0], [49.5, 387.0], [49.6, 387.0], [49.7, 387.0], [49.8, 387.0], [49.9, 387.0], [50.0, 392.0], [50.1, 392.0], [50.2, 392.0], [50.3, 392.0], [50.4, 392.0], [50.5, 392.0], [50.6, 392.0], [50.7, 392.0], [50.8, 392.0], [50.9, 392.0], [51.0, 395.0], [51.1, 395.0], [51.2, 395.0], [51.3, 395.0], [51.4, 395.0], [51.5, 395.0], [51.6, 395.0], [51.7, 395.0], [51.8, 395.0], [51.9, 395.0], [52.0, 395.0], [52.1, 395.0], [52.2, 395.0], [52.3, 395.0], [52.4, 395.0], [52.5, 395.0], [52.6, 395.0], [52.7, 395.0], [52.8, 395.0], [52.9, 395.0], [53.0, 395.0], [53.1, 395.0], [53.2, 395.0], [53.3, 395.0], [53.4, 395.0], [53.5, 395.0], [53.6, 395.0], [53.7, 395.0], [53.8, 395.0], [53.9, 395.0], [54.0, 396.0], [54.1, 396.0], [54.2, 396.0], [54.3, 396.0], [54.4, 396.0], [54.5, 396.0], [54.6, 396.0], [54.7, 396.0], [54.8, 396.0], [54.9, 396.0], [55.0, 398.0], [55.1, 398.0], [55.2, 398.0], [55.3, 398.0], [55.4, 398.0], [55.5, 398.0], [55.6, 398.0], [55.7, 398.0], [55.8, 398.0], [55.9, 398.0], [56.0, 399.0], [56.1, 399.0], [56.2, 399.0], [56.3, 399.0], [56.4, 399.0], [56.5, 399.0], [56.6, 399.0], [56.7, 399.0], [56.8, 399.0], [56.9, 399.0], [57.0, 401.0], [57.1, 401.0], [57.2, 401.0], [57.3, 401.0], [57.4, 401.0], [57.5, 401.0], [57.6, 401.0], [57.7, 401.0], [57.8, 401.0], [57.9, 401.0], [58.0, 414.0], [58.1, 414.0], [58.2, 414.0], [58.3, 414.0], [58.4, 414.0], [58.5, 414.0], [58.6, 414.0], [58.7, 414.0], [58.8, 414.0], [58.9, 414.0], [59.0, 461.0], [59.1, 461.0], [59.2, 461.0], [59.3, 461.0], [59.4, 461.0], [59.5, 461.0], [59.6, 461.0], [59.7, 461.0], [59.8, 461.0], [59.9, 461.0], [60.0, 475.0], [60.1, 475.0], [60.2, 475.0], [60.3, 475.0], [60.4, 475.0], [60.5, 475.0], [60.6, 475.0], [60.7, 475.0], [60.8, 475.0], [60.9, 475.0], [61.0, 475.0], [61.1, 475.0], [61.2, 475.0], [61.3, 475.0], [61.4, 475.0], [61.5, 475.0], [61.6, 475.0], [61.7, 475.0], [61.8, 475.0], [61.9, 475.0], [62.0, 486.0], [62.1, 486.0], [62.2, 486.0], [62.3, 486.0], [62.4, 486.0], [62.5, 486.0], [62.6, 486.0], [62.7, 486.0], [62.8, 486.0], [62.9, 486.0], [63.0, 488.0], [63.1, 488.0], [63.2, 488.0], [63.3, 488.0], [63.4, 488.0], [63.5, 488.0], [63.6, 488.0], [63.7, 488.0], [63.8, 488.0], [63.9, 488.0], [64.0, 490.0], [64.1, 490.0], [64.2, 490.0], [64.3, 490.0], [64.4, 490.0], [64.5, 490.0], [64.6, 490.0], [64.7, 490.0], [64.8, 490.0], [64.9, 490.0], [65.0, 495.0], [65.1, 495.0], [65.2, 495.0], [65.3, 495.0], [65.4, 495.0], [65.5, 495.0], [65.6, 495.0], [65.7, 495.0], [65.8, 495.0], [65.9, 495.0], [66.0, 495.0], [66.1, 495.0], [66.2, 495.0], [66.3, 495.0], [66.4, 495.0], [66.5, 495.0], [66.6, 495.0], [66.7, 495.0], [66.8, 495.0], [66.9, 495.0], [67.0, 496.0], [67.1, 496.0], [67.2, 496.0], [67.3, 496.0], [67.4, 496.0], [67.5, 496.0], [67.6, 496.0], [67.7, 496.0], [67.8, 496.0], [67.9, 496.0], [68.0, 500.0], [68.1, 500.0], [68.2, 500.0], [68.3, 500.0], [68.4, 500.0], [68.5, 500.0], [68.6, 500.0], [68.7, 500.0], [68.8, 500.0], [68.9, 500.0], [69.0, 501.0], [69.1, 501.0], [69.2, 501.0], [69.3, 501.0], [69.4, 501.0], [69.5, 501.0], [69.6, 501.0], [69.7, 501.0], [69.8, 501.0], [69.9, 501.0], [70.0, 504.0], [70.1, 504.0], [70.2, 504.0], [70.3, 504.0], [70.4, 504.0], [70.5, 504.0], [70.6, 504.0], [70.7, 504.0], [70.8, 504.0], [70.9, 504.0], [71.0, 510.0], [71.1, 510.0], [71.2, 510.0], [71.3, 510.0], [71.4, 510.0], [71.5, 510.0], [71.6, 510.0], [71.7, 510.0], [71.8, 510.0], [71.9, 510.0], [72.0, 511.0], [72.1, 511.0], [72.2, 511.0], [72.3, 511.0], [72.4, 511.0], [72.5, 511.0], [72.6, 511.0], [72.7, 511.0], [72.8, 511.0], [72.9, 511.0], [73.0, 515.0], [73.1, 515.0], [73.2, 515.0], [73.3, 515.0], [73.4, 515.0], [73.5, 515.0], [73.6, 515.0], [73.7, 515.0], [73.8, 515.0], [73.9, 515.0], [74.0, 516.0], [74.1, 516.0], [74.2, 516.0], [74.3, 516.0], [74.4, 516.0], [74.5, 516.0], [74.6, 516.0], [74.7, 516.0], [74.8, 516.0], [74.9, 516.0], [75.0, 580.0], [75.1, 580.0], [75.2, 580.0], [75.3, 580.0], [75.4, 580.0], [75.5, 580.0], [75.6, 580.0], [75.7, 580.0], [75.8, 580.0], [75.9, 580.0], [76.0, 600.0], [76.1, 600.0], [76.2, 600.0], [76.3, 600.0], [76.4, 600.0], [76.5, 600.0], [76.6, 600.0], [76.7, 600.0], [76.8, 600.0], [76.9, 600.0], [77.0, 601.0], [77.1, 601.0], [77.2, 601.0], [77.3, 601.0], [77.4, 601.0], [77.5, 601.0], [77.6, 601.0], [77.7, 601.0], [77.8, 601.0], [77.9, 601.0], [78.0, 606.0], [78.1, 606.0], [78.2, 606.0], [78.3, 606.0], [78.4, 606.0], [78.5, 606.0], [78.6, 606.0], [78.7, 606.0], [78.8, 606.0], [78.9, 606.0], [79.0, 610.0], [79.1, 610.0], [79.2, 610.0], [79.3, 610.0], [79.4, 610.0], [79.5, 610.0], [79.6, 610.0], [79.7, 610.0], [79.8, 610.0], [79.9, 610.0], [80.0, 617.0], [80.1, 617.0], [80.2, 617.0], [80.3, 617.0], [80.4, 617.0], [80.5, 617.0], [80.6, 617.0], [80.7, 617.0], [80.8, 617.0], [80.9, 617.0], [81.0, 687.0], [81.1, 687.0], [81.2, 687.0], [81.3, 687.0], [81.4, 687.0], [81.5, 687.0], [81.6, 687.0], [81.7, 687.0], [81.8, 687.0], [81.9, 687.0], [82.0, 691.0], [82.1, 691.0], [82.2, 691.0], [82.3, 691.0], [82.4, 691.0], [82.5, 691.0], [82.6, 691.0], [82.7, 691.0], [82.8, 691.0], [82.9, 691.0], [83.0, 693.0], [83.1, 693.0], [83.2, 693.0], [83.3, 693.0], [83.4, 693.0], [83.5, 693.0], [83.6, 693.0], [83.7, 693.0], [83.8, 693.0], [83.9, 693.0], [84.0, 695.0], [84.1, 695.0], [84.2, 695.0], [84.3, 695.0], [84.4, 695.0], [84.5, 695.0], [84.6, 695.0], [84.7, 695.0], [84.8, 695.0], [84.9, 695.0], [85.0, 695.0], [85.1, 695.0], [85.2, 695.0], [85.3, 695.0], [85.4, 695.0], [85.5, 695.0], [85.6, 695.0], [85.7, 695.0], [85.8, 695.0], [85.9, 695.0], [86.0, 698.0], [86.1, 698.0], [86.2, 698.0], [86.3, 698.0], [86.4, 698.0], [86.5, 698.0], [86.6, 698.0], [86.7, 698.0], [86.8, 698.0], [86.9, 698.0], [87.0, 700.0], [87.1, 700.0], [87.2, 700.0], [87.3, 700.0], [87.4, 700.0], [87.5, 700.0], [87.6, 700.0], [87.7, 700.0], [87.8, 700.0], [87.9, 700.0], [88.0, 704.0], [88.1, 704.0], [88.2, 704.0], [88.3, 704.0], [88.4, 704.0], [88.5, 704.0], [88.6, 704.0], [88.7, 704.0], [88.8, 704.0], [88.9, 704.0], [89.0, 707.0], [89.1, 707.0], [89.2, 707.0], [89.3, 707.0], [89.4, 707.0], [89.5, 707.0], [89.6, 707.0], [89.7, 707.0], [89.8, 707.0], [89.9, 707.0], [90.0, 707.0], [90.1, 707.0], [90.2, 707.0], [90.3, 707.0], [90.4, 707.0], [90.5, 707.0], [90.6, 707.0], [90.7, 707.0], [90.8, 707.0], [90.9, 707.0], [91.0, 708.0], [91.1, 708.0], [91.2, 708.0], [91.3, 708.0], [91.4, 708.0], [91.5, 708.0], [91.6, 708.0], [91.7, 708.0], [91.8, 708.0], [91.9, 708.0], [92.0, 711.0], [92.1, 711.0], [92.2, 711.0], [92.3, 711.0], [92.4, 711.0], [92.5, 711.0], [92.6, 711.0], [92.7, 711.0], [92.8, 711.0], [92.9, 711.0], [93.0, 785.0], [93.1, 785.0], [93.2, 785.0], [93.3, 785.0], [93.4, 785.0], [93.5, 785.0], [93.6, 785.0], [93.7, 785.0], [93.8, 785.0], [93.9, 785.0], [94.0, 786.0], [94.1, 786.0], [94.2, 786.0], [94.3, 786.0], [94.4, 786.0], [94.5, 786.0], [94.6, 786.0], [94.7, 786.0], [94.8, 786.0], [94.9, 786.0], [95.0, 792.0], [95.1, 792.0], [95.2, 792.0], [95.3, 792.0], [95.4, 792.0], [95.5, 792.0], [95.6, 792.0], [95.7, 792.0], [95.8, 792.0], [95.9, 792.0], [96.0, 798.0], [96.1, 798.0], [96.2, 798.0], [96.3, 798.0], [96.4, 798.0], [96.5, 798.0], [96.6, 798.0], [96.7, 798.0], [96.8, 798.0], [96.9, 798.0], [97.0, 884.0], [97.1, 884.0], [97.2, 884.0], [97.3, 884.0], [97.4, 884.0], [97.5, 884.0], [97.6, 884.0], [97.7, 884.0], [97.8, 884.0], [97.9, 884.0], [98.0, 884.0], [98.1, 884.0], [98.2, 884.0], [98.3, 884.0], [98.4, 884.0], [98.5, 884.0], [98.6, 884.0], [98.7, 884.0], [98.8, 884.0], [98.9, 884.0], [99.0, 899.0], [99.1, 899.0], [99.2, 899.0], [99.3, 899.0], [99.4, 899.0], [99.5, 899.0], [99.6, 899.0], [99.7, 899.0], [99.8, 899.0], [99.9, 899.0]], "isOverall": false, "label": "Search Users", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 3.0, "minX": 0.0, "maxY": 23.0, "series": [{"data": [[0.0, 9.0], [300.0, 23.0], [600.0, 11.0], [700.0, 10.0], [100.0, 13.0], [200.0, 12.0], [400.0, 11.0], [800.0, 3.0], [500.0, 8.0]], "isOverall": false, "label": "Search Users", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 800.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 31.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 69.0, "series": [{"data": [[0.0, 69.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 31.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 1.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 7.590000000000001, "minX": 1.7507925E12, "maxY": 7.590000000000001, "series": [{"data": [[1.7507925E12, 7.590000000000001]], "isOverall": false, "label": "Search Test", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7507925E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 59.66666666666667, "minX": 1.0, "maxY": 533.1071428571428, "series": [{"data": [[1.0, 59.66666666666667], [2.0, 68.4], [4.0, 273.0], [8.0, 418.88095238095235], [9.0, 405.83333333333337], [5.0, 358.6666666666667], [10.0, 533.1071428571428], [3.0, 226.66666666666666], [6.0, 407.33333333333337], [7.0, 336.5]], "isOverall": false, "label": "Search Users", "isController": false}, {"data": [[7.590000000000001, 404.91999999999996]], "isOverall": false, "label": "Search Users-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 310.31666666666666, "minX": 1.7507925E12, "maxY": 9364.6, "series": [{"data": [[1.7507925E12, 9364.6]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.7507925E12, 310.31666666666666]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7507925E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 404.91999999999996, "minX": 1.7507925E12, "maxY": 404.91999999999996, "series": [{"data": [[1.7507925E12, 404.91999999999996]], "isOverall": false, "label": "Search Users", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7507925E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 404.68999999999994, "minX": 1.7507925E12, "maxY": 404.68999999999994, "series": [{"data": [[1.7507925E12, 404.68999999999994]], "isOverall": false, "label": "Search Users", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7507925E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.30000000000000016, "minX": 1.7507925E12, "maxY": 0.30000000000000016, "series": [{"data": [[1.7507925E12, 0.30000000000000016]], "isOverall": false, "label": "Search Users", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7507925E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 22.0, "minX": 1.7507925E12, "maxY": 899.0, "series": [{"data": [[1.7507925E12, 899.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.7507925E12, 707.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.7507925E12, 898.8499999999999]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.7507925E12, 791.6999999999999]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.7507925E12, 22.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.7507925E12, 389.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7507925E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 43.0, "minX": 1.0, "maxY": 495.0, "series": [{"data": [[1.0, 43.0], [17.0, 495.0], [19.0, 486.0], [22.0, 184.5], [3.0, 110.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 22.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 43.0, "minX": 1.0, "maxY": 495.0, "series": [{"data": [[1.0, 43.0], [17.0, 495.0], [19.0, 486.0], [22.0, 184.5], [3.0, 110.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 22.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 1.6666666666666667, "minX": 1.7507925E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.7507925E12, 1.6666666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7507925E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 1.6666666666666667, "minX": 1.7507925E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.7507925E12, 1.6666666666666667]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7507925E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 1.6666666666666667, "minX": 1.7507925E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.7507925E12, 1.6666666666666667]], "isOverall": false, "label": "Search Users-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7507925E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 1.6666666666666667, "minX": 1.7507925E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.7507925E12, 1.6666666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7507925E12, "title": "Total Transactions Per Second"}},
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

