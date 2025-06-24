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
        data: {"result": {"minY": 43.0, "minX": 0.0, "maxY": 1006.0, "series": [{"data": [[0.0, 43.0], [0.1, 43.0], [0.2, 43.0], [0.3, 43.0], [0.4, 43.0], [0.5, 43.0], [0.6, 43.0], [0.7, 43.0], [0.8, 43.0], [0.9, 43.0], [1.0, 47.0], [1.1, 47.0], [1.2, 47.0], [1.3, 47.0], [1.4, 47.0], [1.5, 47.0], [1.6, 47.0], [1.7, 47.0], [1.8, 47.0], [1.9, 47.0], [2.0, 60.0], [2.1, 60.0], [2.2, 60.0], [2.3, 60.0], [2.4, 60.0], [2.5, 60.0], [2.6, 60.0], [2.7, 60.0], [2.8, 60.0], [2.9, 60.0], [3.0, 98.0], [3.1, 98.0], [3.2, 98.0], [3.3, 98.0], [3.4, 98.0], [3.5, 98.0], [3.6, 98.0], [3.7, 98.0], [3.8, 98.0], [3.9, 98.0], [4.0, 101.0], [4.1, 101.0], [4.2, 101.0], [4.3, 101.0], [4.4, 101.0], [4.5, 101.0], [4.6, 101.0], [4.7, 101.0], [4.8, 101.0], [4.9, 101.0], [5.0, 109.0], [5.1, 109.0], [5.2, 109.0], [5.3, 109.0], [5.4, 109.0], [5.5, 109.0], [5.6, 109.0], [5.7, 109.0], [5.8, 109.0], [5.9, 109.0], [6.0, 110.0], [6.1, 110.0], [6.2, 110.0], [6.3, 110.0], [6.4, 110.0], [6.5, 110.0], [6.6, 110.0], [6.7, 110.0], [6.8, 110.0], [6.9, 110.0], [7.0, 110.0], [7.1, 110.0], [7.2, 110.0], [7.3, 110.0], [7.4, 110.0], [7.5, 110.0], [7.6, 110.0], [7.7, 110.0], [7.8, 110.0], [7.9, 110.0], [8.0, 111.0], [8.1, 111.0], [8.2, 111.0], [8.3, 111.0], [8.4, 111.0], [8.5, 111.0], [8.6, 111.0], [8.7, 111.0], [8.8, 111.0], [8.9, 111.0], [9.0, 113.0], [9.1, 113.0], [9.2, 113.0], [9.3, 113.0], [9.4, 113.0], [9.5, 113.0], [9.6, 113.0], [9.7, 113.0], [9.8, 113.0], [9.9, 113.0], [10.0, 148.0], [10.1, 148.0], [10.2, 148.0], [10.3, 148.0], [10.4, 148.0], [10.5, 148.0], [10.6, 148.0], [10.7, 148.0], [10.8, 148.0], [10.9, 148.0], [11.0, 173.0], [11.1, 173.0], [11.2, 173.0], [11.3, 173.0], [11.4, 173.0], [11.5, 173.0], [11.6, 173.0], [11.7, 173.0], [11.8, 173.0], [11.9, 173.0], [12.0, 177.0], [12.1, 177.0], [12.2, 177.0], [12.3, 177.0], [12.4, 177.0], [12.5, 177.0], [12.6, 177.0], [12.7, 177.0], [12.8, 177.0], [12.9, 177.0], [13.0, 181.0], [13.1, 181.0], [13.2, 181.0], [13.3, 181.0], [13.4, 181.0], [13.5, 181.0], [13.6, 181.0], [13.7, 181.0], [13.8, 181.0], [13.9, 181.0], [14.0, 182.0], [14.1, 182.0], [14.2, 182.0], [14.3, 182.0], [14.4, 182.0], [14.5, 182.0], [14.6, 182.0], [14.7, 182.0], [14.8, 182.0], [14.9, 182.0], [15.0, 182.0], [15.1, 182.0], [15.2, 182.0], [15.3, 182.0], [15.4, 182.0], [15.5, 182.0], [15.6, 182.0], [15.7, 182.0], [15.8, 182.0], [15.9, 182.0], [16.0, 186.0], [16.1, 186.0], [16.2, 186.0], [16.3, 186.0], [16.4, 186.0], [16.5, 186.0], [16.6, 186.0], [16.7, 186.0], [16.8, 186.0], [16.9, 186.0], [17.0, 190.0], [17.1, 190.0], [17.2, 190.0], [17.3, 190.0], [17.4, 190.0], [17.5, 190.0], [17.6, 190.0], [17.7, 190.0], [17.8, 190.0], [17.9, 190.0], [18.0, 194.0], [18.1, 194.0], [18.2, 194.0], [18.3, 194.0], [18.4, 194.0], [18.5, 194.0], [18.6, 194.0], [18.7, 194.0], [18.8, 194.0], [18.9, 194.0], [19.0, 195.0], [19.1, 195.0], [19.2, 195.0], [19.3, 195.0], [19.4, 195.0], [19.5, 195.0], [19.6, 195.0], [19.7, 195.0], [19.8, 195.0], [19.9, 195.0], [20.0, 200.0], [20.1, 200.0], [20.2, 200.0], [20.3, 200.0], [20.4, 200.0], [20.5, 200.0], [20.6, 200.0], [20.7, 200.0], [20.8, 200.0], [20.9, 200.0], [21.0, 204.0], [21.1, 204.0], [21.2, 204.0], [21.3, 204.0], [21.4, 204.0], [21.5, 204.0], [21.6, 204.0], [21.7, 204.0], [21.8, 204.0], [21.9, 204.0], [22.0, 270.0], [22.1, 270.0], [22.2, 270.0], [22.3, 270.0], [22.4, 270.0], [22.5, 270.0], [22.6, 270.0], [22.7, 270.0], [22.8, 270.0], [22.9, 270.0], [23.0, 275.0], [23.1, 275.0], [23.2, 275.0], [23.3, 275.0], [23.4, 275.0], [23.5, 275.0], [23.6, 275.0], [23.7, 275.0], [23.8, 275.0], [23.9, 275.0], [24.0, 277.0], [24.1, 277.0], [24.2, 277.0], [24.3, 277.0], [24.4, 277.0], [24.5, 277.0], [24.6, 277.0], [24.7, 277.0], [24.8, 277.0], [24.9, 277.0], [25.0, 277.0], [25.1, 277.0], [25.2, 277.0], [25.3, 277.0], [25.4, 277.0], [25.5, 277.0], [25.6, 277.0], [25.7, 277.0], [25.8, 277.0], [25.9, 277.0], [26.0, 280.0], [26.1, 280.0], [26.2, 280.0], [26.3, 280.0], [26.4, 280.0], [26.5, 280.0], [26.6, 280.0], [26.7, 280.0], [26.8, 280.0], [26.9, 280.0], [27.0, 282.0], [27.1, 282.0], [27.2, 282.0], [27.3, 282.0], [27.4, 282.0], [27.5, 282.0], [27.6, 282.0], [27.7, 282.0], [27.8, 282.0], [27.9, 282.0], [28.0, 292.0], [28.1, 292.0], [28.2, 292.0], [28.3, 292.0], [28.4, 292.0], [28.5, 292.0], [28.6, 292.0], [28.7, 292.0], [28.8, 292.0], [28.9, 292.0], [29.0, 293.0], [29.1, 293.0], [29.2, 293.0], [29.3, 293.0], [29.4, 293.0], [29.5, 293.0], [29.6, 293.0], [29.7, 293.0], [29.8, 293.0], [29.9, 293.0], [30.0, 296.0], [30.1, 296.0], [30.2, 296.0], [30.3, 296.0], [30.4, 296.0], [30.5, 296.0], [30.6, 296.0], [30.7, 296.0], [30.8, 296.0], [30.9, 296.0], [31.0, 297.0], [31.1, 297.0], [31.2, 297.0], [31.3, 297.0], [31.4, 297.0], [31.5, 297.0], [31.6, 297.0], [31.7, 297.0], [31.8, 297.0], [31.9, 297.0], [32.0, 297.0], [32.1, 297.0], [32.2, 297.0], [32.3, 297.0], [32.4, 297.0], [32.5, 297.0], [32.6, 297.0], [32.7, 297.0], [32.8, 297.0], [32.9, 297.0], [33.0, 298.0], [33.1, 298.0], [33.2, 298.0], [33.3, 298.0], [33.4, 298.0], [33.5, 298.0], [33.6, 298.0], [33.7, 298.0], [33.8, 298.0], [33.9, 298.0], [34.0, 300.0], [34.1, 300.0], [34.2, 300.0], [34.3, 300.0], [34.4, 300.0], [34.5, 300.0], [34.6, 300.0], [34.7, 300.0], [34.8, 300.0], [34.9, 300.0], [35.0, 302.0], [35.1, 302.0], [35.2, 302.0], [35.3, 302.0], [35.4, 302.0], [35.5, 302.0], [35.6, 302.0], [35.7, 302.0], [35.8, 302.0], [35.9, 302.0], [36.0, 306.0], [36.1, 306.0], [36.2, 306.0], [36.3, 306.0], [36.4, 306.0], [36.5, 306.0], [36.6, 306.0], [36.7, 306.0], [36.8, 306.0], [36.9, 306.0], [37.0, 306.0], [37.1, 306.0], [37.2, 306.0], [37.3, 306.0], [37.4, 306.0], [37.5, 306.0], [37.6, 306.0], [37.7, 306.0], [37.8, 306.0], [37.9, 306.0], [38.0, 308.0], [38.1, 308.0], [38.2, 308.0], [38.3, 308.0], [38.4, 308.0], [38.5, 308.0], [38.6, 308.0], [38.7, 308.0], [38.8, 308.0], [38.9, 308.0], [39.0, 309.0], [39.1, 309.0], [39.2, 309.0], [39.3, 309.0], [39.4, 309.0], [39.5, 309.0], [39.6, 309.0], [39.7, 309.0], [39.8, 309.0], [39.9, 309.0], [40.0, 310.0], [40.1, 310.0], [40.2, 310.0], [40.3, 310.0], [40.4, 310.0], [40.5, 310.0], [40.6, 310.0], [40.7, 310.0], [40.8, 310.0], [40.9, 310.0], [41.0, 312.0], [41.1, 312.0], [41.2, 312.0], [41.3, 312.0], [41.4, 312.0], [41.5, 312.0], [41.6, 312.0], [41.7, 312.0], [41.8, 312.0], [41.9, 312.0], [42.0, 319.0], [42.1, 319.0], [42.2, 319.0], [42.3, 319.0], [42.4, 319.0], [42.5, 319.0], [42.6, 319.0], [42.7, 319.0], [42.8, 319.0], [42.9, 319.0], [43.0, 327.0], [43.1, 327.0], [43.2, 327.0], [43.3, 327.0], [43.4, 327.0], [43.5, 327.0], [43.6, 327.0], [43.7, 327.0], [43.8, 327.0], [43.9, 327.0], [44.0, 373.0], [44.1, 373.0], [44.2, 373.0], [44.3, 373.0], [44.4, 373.0], [44.5, 373.0], [44.6, 373.0], [44.7, 373.0], [44.8, 373.0], [44.9, 373.0], [45.0, 377.0], [45.1, 377.0], [45.2, 377.0], [45.3, 377.0], [45.4, 377.0], [45.5, 377.0], [45.6, 377.0], [45.7, 377.0], [45.8, 377.0], [45.9, 377.0], [46.0, 380.0], [46.1, 380.0], [46.2, 380.0], [46.3, 380.0], [46.4, 380.0], [46.5, 380.0], [46.6, 380.0], [46.7, 380.0], [46.8, 380.0], [46.9, 380.0], [47.0, 387.0], [47.1, 387.0], [47.2, 387.0], [47.3, 387.0], [47.4, 387.0], [47.5, 387.0], [47.6, 387.0], [47.7, 387.0], [47.8, 387.0], [47.9, 387.0], [48.0, 388.0], [48.1, 388.0], [48.2, 388.0], [48.3, 388.0], [48.4, 388.0], [48.5, 388.0], [48.6, 388.0], [48.7, 388.0], [48.8, 388.0], [48.9, 388.0], [49.0, 390.0], [49.1, 390.0], [49.2, 390.0], [49.3, 390.0], [49.4, 390.0], [49.5, 390.0], [49.6, 390.0], [49.7, 390.0], [49.8, 390.0], [49.9, 390.0], [50.0, 390.0], [50.1, 390.0], [50.2, 390.0], [50.3, 390.0], [50.4, 390.0], [50.5, 390.0], [50.6, 390.0], [50.7, 390.0], [50.8, 390.0], [50.9, 390.0], [51.0, 395.0], [51.1, 395.0], [51.2, 395.0], [51.3, 395.0], [51.4, 395.0], [51.5, 395.0], [51.6, 395.0], [51.7, 395.0], [51.8, 395.0], [51.9, 395.0], [52.0, 396.0], [52.1, 396.0], [52.2, 396.0], [52.3, 396.0], [52.4, 396.0], [52.5, 396.0], [52.6, 396.0], [52.7, 396.0], [52.8, 396.0], [52.9, 396.0], [53.0, 396.0], [53.1, 396.0], [53.2, 396.0], [53.3, 396.0], [53.4, 396.0], [53.5, 396.0], [53.6, 396.0], [53.7, 396.0], [53.8, 396.0], [53.9, 396.0], [54.0, 401.0], [54.1, 401.0], [54.2, 401.0], [54.3, 401.0], [54.4, 401.0], [54.5, 401.0], [54.6, 401.0], [54.7, 401.0], [54.8, 401.0], [54.9, 401.0], [55.0, 402.0], [55.1, 402.0], [55.2, 402.0], [55.3, 402.0], [55.4, 402.0], [55.5, 402.0], [55.6, 402.0], [55.7, 402.0], [55.8, 402.0], [55.9, 402.0], [56.0, 407.0], [56.1, 407.0], [56.2, 407.0], [56.3, 407.0], [56.4, 407.0], [56.5, 407.0], [56.6, 407.0], [56.7, 407.0], [56.8, 407.0], [56.9, 407.0], [57.0, 409.0], [57.1, 409.0], [57.2, 409.0], [57.3, 409.0], [57.4, 409.0], [57.5, 409.0], [57.6, 409.0], [57.7, 409.0], [57.8, 409.0], [57.9, 409.0], [58.0, 409.0], [58.1, 409.0], [58.2, 409.0], [58.3, 409.0], [58.4, 409.0], [58.5, 409.0], [58.6, 409.0], [58.7, 409.0], [58.8, 409.0], [58.9, 409.0], [59.0, 411.0], [59.1, 411.0], [59.2, 411.0], [59.3, 411.0], [59.4, 411.0], [59.5, 411.0], [59.6, 411.0], [59.7, 411.0], [59.8, 411.0], [59.9, 411.0], [60.0, 412.0], [60.1, 412.0], [60.2, 412.0], [60.3, 412.0], [60.4, 412.0], [60.5, 412.0], [60.6, 412.0], [60.7, 412.0], [60.8, 412.0], [60.9, 412.0], [61.0, 483.0], [61.1, 483.0], [61.2, 483.0], [61.3, 483.0], [61.4, 483.0], [61.5, 483.0], [61.6, 483.0], [61.7, 483.0], [61.8, 483.0], [61.9, 483.0], [62.0, 497.0], [62.1, 497.0], [62.2, 497.0], [62.3, 497.0], [62.4, 497.0], [62.5, 497.0], [62.6, 497.0], [62.7, 497.0], [62.8, 497.0], [62.9, 497.0], [63.0, 501.0], [63.1, 501.0], [63.2, 501.0], [63.3, 501.0], [63.4, 501.0], [63.5, 501.0], [63.6, 501.0], [63.7, 501.0], [63.8, 501.0], [63.9, 501.0], [64.0, 580.0], [64.1, 580.0], [64.2, 580.0], [64.3, 580.0], [64.4, 580.0], [64.5, 580.0], [64.6, 580.0], [64.7, 580.0], [64.8, 580.0], [64.9, 580.0], [65.0, 589.0], [65.1, 589.0], [65.2, 589.0], [65.3, 589.0], [65.4, 589.0], [65.5, 589.0], [65.6, 589.0], [65.7, 589.0], [65.8, 589.0], [65.9, 589.0], [66.0, 592.0], [66.1, 592.0], [66.2, 592.0], [66.3, 592.0], [66.4, 592.0], [66.5, 592.0], [66.6, 592.0], [66.7, 592.0], [66.8, 592.0], [66.9, 592.0], [67.0, 612.0], [67.1, 612.0], [67.2, 612.0], [67.3, 612.0], [67.4, 612.0], [67.5, 612.0], [67.6, 612.0], [67.7, 612.0], [67.8, 612.0], [67.9, 612.0], [68.0, 680.0], [68.1, 680.0], [68.2, 680.0], [68.3, 680.0], [68.4, 680.0], [68.5, 680.0], [68.6, 680.0], [68.7, 680.0], [68.8, 680.0], [68.9, 680.0], [69.0, 689.0], [69.1, 689.0], [69.2, 689.0], [69.3, 689.0], [69.4, 689.0], [69.5, 689.0], [69.6, 689.0], [69.7, 689.0], [69.8, 689.0], [69.9, 689.0], [70.0, 698.0], [70.1, 698.0], [70.2, 698.0], [70.3, 698.0], [70.4, 698.0], [70.5, 698.0], [70.6, 698.0], [70.7, 698.0], [70.8, 698.0], [70.9, 698.0], [71.0, 705.0], [71.1, 705.0], [71.2, 705.0], [71.3, 705.0], [71.4, 705.0], [71.5, 705.0], [71.6, 705.0], [71.7, 705.0], [71.8, 705.0], [71.9, 705.0], [72.0, 779.0], [72.1, 779.0], [72.2, 779.0], [72.3, 779.0], [72.4, 779.0], [72.5, 779.0], [72.6, 779.0], [72.7, 779.0], [72.8, 779.0], [72.9, 779.0], [73.0, 790.0], [73.1, 790.0], [73.2, 790.0], [73.3, 790.0], [73.4, 790.0], [73.5, 790.0], [73.6, 790.0], [73.7, 790.0], [73.8, 790.0], [73.9, 790.0], [74.0, 791.0], [74.1, 791.0], [74.2, 791.0], [74.3, 791.0], [74.4, 791.0], [74.5, 791.0], [74.6, 791.0], [74.7, 791.0], [74.8, 791.0], [74.9, 791.0], [75.0, 794.0], [75.1, 794.0], [75.2, 794.0], [75.3, 794.0], [75.4, 794.0], [75.5, 794.0], [75.6, 794.0], [75.7, 794.0], [75.8, 794.0], [75.9, 794.0], [76.0, 798.0], [76.1, 798.0], [76.2, 798.0], [76.3, 798.0], [76.4, 798.0], [76.5, 798.0], [76.6, 798.0], [76.7, 798.0], [76.8, 798.0], [76.9, 798.0], [77.0, 798.0], [77.1, 798.0], [77.2, 798.0], [77.3, 798.0], [77.4, 798.0], [77.5, 798.0], [77.6, 798.0], [77.7, 798.0], [77.8, 798.0], [77.9, 798.0], [78.0, 801.0], [78.1, 801.0], [78.2, 801.0], [78.3, 801.0], [78.4, 801.0], [78.5, 801.0], [78.6, 801.0], [78.7, 801.0], [78.8, 801.0], [78.9, 801.0], [79.0, 802.0], [79.1, 802.0], [79.2, 802.0], [79.3, 802.0], [79.4, 802.0], [79.5, 802.0], [79.6, 802.0], [79.7, 802.0], [79.8, 802.0], [79.9, 802.0], [80.0, 806.0], [80.1, 806.0], [80.2, 806.0], [80.3, 806.0], [80.4, 806.0], [80.5, 806.0], [80.6, 806.0], [80.7, 806.0], [80.8, 806.0], [80.9, 806.0], [81.0, 809.0], [81.1, 809.0], [81.2, 809.0], [81.3, 809.0], [81.4, 809.0], [81.5, 809.0], [81.6, 809.0], [81.7, 809.0], [81.8, 809.0], [81.9, 809.0], [82.0, 812.0], [82.1, 812.0], [82.2, 812.0], [82.3, 812.0], [82.4, 812.0], [82.5, 812.0], [82.6, 812.0], [82.7, 812.0], [82.8, 812.0], [82.9, 812.0], [83.0, 889.0], [83.1, 889.0], [83.2, 889.0], [83.3, 889.0], [83.4, 889.0], [83.5, 889.0], [83.6, 889.0], [83.7, 889.0], [83.8, 889.0], [83.9, 889.0], [84.0, 890.0], [84.1, 890.0], [84.2, 890.0], [84.3, 890.0], [84.4, 890.0], [84.5, 890.0], [84.6, 890.0], [84.7, 890.0], [84.8, 890.0], [84.9, 890.0], [85.0, 897.0], [85.1, 897.0], [85.2, 897.0], [85.3, 897.0], [85.4, 897.0], [85.5, 897.0], [85.6, 897.0], [85.7, 897.0], [85.8, 897.0], [85.9, 897.0], [86.0, 897.0], [86.1, 897.0], [86.2, 897.0], [86.3, 897.0], [86.4, 897.0], [86.5, 897.0], [86.6, 897.0], [86.7, 897.0], [86.8, 897.0], [86.9, 897.0], [87.0, 900.0], [87.1, 900.0], [87.2, 900.0], [87.3, 900.0], [87.4, 900.0], [87.5, 900.0], [87.6, 900.0], [87.7, 900.0], [87.8, 900.0], [87.9, 900.0], [88.0, 901.0], [88.1, 901.0], [88.2, 901.0], [88.3, 901.0], [88.4, 901.0], [88.5, 901.0], [88.6, 901.0], [88.7, 901.0], [88.8, 901.0], [88.9, 901.0], [89.0, 901.0], [89.1, 901.0], [89.2, 901.0], [89.3, 901.0], [89.4, 901.0], [89.5, 901.0], [89.6, 901.0], [89.7, 901.0], [89.8, 901.0], [89.9, 901.0], [90.0, 902.0], [90.1, 902.0], [90.2, 902.0], [90.3, 902.0], [90.4, 902.0], [90.5, 902.0], [90.6, 902.0], [90.7, 902.0], [90.8, 902.0], [90.9, 902.0], [91.0, 906.0], [91.1, 906.0], [91.2, 906.0], [91.3, 906.0], [91.4, 906.0], [91.5, 906.0], [91.6, 906.0], [91.7, 906.0], [91.8, 906.0], [91.9, 906.0], [92.0, 908.0], [92.1, 908.0], [92.2, 908.0], [92.3, 908.0], [92.4, 908.0], [92.5, 908.0], [92.6, 908.0], [92.7, 908.0], [92.8, 908.0], [92.9, 908.0], [93.0, 987.0], [93.1, 987.0], [93.2, 987.0], [93.3, 987.0], [93.4, 987.0], [93.5, 987.0], [93.6, 987.0], [93.7, 987.0], [93.8, 987.0], [93.9, 987.0], [94.0, 987.0], [94.1, 987.0], [94.2, 987.0], [94.3, 987.0], [94.4, 987.0], [94.5, 987.0], [94.6, 987.0], [94.7, 987.0], [94.8, 987.0], [94.9, 987.0], [95.0, 991.0], [95.1, 991.0], [95.2, 991.0], [95.3, 991.0], [95.4, 991.0], [95.5, 991.0], [95.6, 991.0], [95.7, 991.0], [95.8, 991.0], [95.9, 991.0], [96.0, 991.0], [96.1, 991.0], [96.2, 991.0], [96.3, 991.0], [96.4, 991.0], [96.5, 991.0], [96.6, 991.0], [96.7, 991.0], [96.8, 991.0], [96.9, 991.0], [97.0, 996.0], [97.1, 996.0], [97.2, 996.0], [97.3, 996.0], [97.4, 996.0], [97.5, 996.0], [97.6, 996.0], [97.7, 996.0], [97.8, 996.0], [97.9, 996.0], [98.0, 1004.0], [98.1, 1004.0], [98.2, 1004.0], [98.3, 1004.0], [98.4, 1004.0], [98.5, 1004.0], [98.6, 1004.0], [98.7, 1004.0], [98.8, 1004.0], [98.9, 1004.0], [99.0, 1006.0], [99.1, 1006.0], [99.2, 1006.0], [99.3, 1006.0], [99.4, 1006.0], [99.5, 1006.0], [99.6, 1006.0], [99.7, 1006.0], [99.8, 1006.0], [99.9, 1006.0]], "isOverall": false, "label": "Search Users", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 2.0, "minX": 0.0, "maxY": 20.0, "series": [{"data": [[0.0, 4.0], [300.0, 20.0], [600.0, 4.0], [700.0, 7.0], [100.0, 16.0], [200.0, 14.0], [800.0, 9.0], [400.0, 9.0], [900.0, 11.0], [500.0, 4.0], [1000.0, 2.0]], "isOverall": false, "label": "Search Users", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 1000.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 37.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 63.0, "series": [{"data": [[0.0, 63.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 37.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 1.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 7.9799999999999995, "minX": 1.75079232E12, "maxY": 7.9799999999999995, "series": [{"data": [[1.75079232E12, 7.9799999999999995]], "isOverall": false, "label": "Search Test", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.75079232E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 62.0, "minX": 1.0, "maxY": 611.6206896551723, "series": [{"data": [[2.0, 62.0], [4.0, 177.5], [8.0, 388.3333333333333], [1.0, 113.0], [9.0, 600.6666666666666], [5.0, 213.0], [10.0, 611.6206896551723], [3.0, 163.5], [6.0, 376.6153846153846], [7.0, 425.0]], "isOverall": false, "label": "Search Users", "isController": false}, {"data": [[7.9799999999999995, 477.29]], "isOverall": false, "label": "Search Users-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 310.31666666666666, "minX": 1.75079232E12, "maxY": 9364.6, "series": [{"data": [[1.75079232E12, 9364.6]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.75079232E12, 310.31666666666666]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.75079232E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 477.29, "minX": 1.75079232E12, "maxY": 477.29, "series": [{"data": [[1.75079232E12, 477.29]], "isOverall": false, "label": "Search Users", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.75079232E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 477.10000000000025, "minX": 1.75079232E12, "maxY": 477.10000000000025, "series": [{"data": [[1.75079232E12, 477.10000000000025]], "isOverall": false, "label": "Search Users", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.75079232E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.2899999999999998, "minX": 1.75079232E12, "maxY": 0.2899999999999998, "series": [{"data": [[1.75079232E12, 0.2899999999999998]], "isOverall": false, "label": "Search Users", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.75079232E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 43.0, "minX": 1.75079232E12, "maxY": 1006.0, "series": [{"data": [[1.75079232E12, 1006.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.75079232E12, 901.9]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.75079232E12, 1005.98]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.75079232E12, 990.8]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.75079232E12, 43.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.75079232E12, 390.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.75079232E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 239.5, "minX": 14.0, "maxY": 689.0, "series": [{"data": [[18.0, 476.5], [19.0, 689.0], [20.0, 239.5], [14.0, 289.5], [15.0, 589.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 20.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 239.5, "minX": 14.0, "maxY": 688.0, "series": [{"data": [[18.0, 476.0], [19.0, 688.0], [20.0, 239.5], [14.0, 289.5], [15.0, 588.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 20.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 1.6666666666666667, "minX": 1.75079232E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.75079232E12, 1.6666666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.75079232E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 1.6666666666666667, "minX": 1.75079232E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.75079232E12, 1.6666666666666667]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.75079232E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 1.6666666666666667, "minX": 1.75079232E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.75079232E12, 1.6666666666666667]], "isOverall": false, "label": "Search Users-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.75079232E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 1.6666666666666667, "minX": 1.75079232E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.75079232E12, 1.6666666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.75079232E12, "title": "Total Transactions Per Second"}},
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

