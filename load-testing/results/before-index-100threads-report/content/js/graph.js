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
        data: {"result": {"minY": 405.0, "minX": 0.0, "maxY": 9506.0, "series": [{"data": [[0.0, 405.0], [0.1, 405.0], [0.2, 604.0], [0.3, 604.0], [0.4, 695.0], [0.5, 695.0], [0.6, 695.0], [0.7, 703.0], [0.8, 721.0], [0.9, 721.0], [1.0, 914.0], [1.1, 914.0], [1.2, 915.0], [1.3, 915.0], [1.4, 1009.0], [1.5, 1009.0], [1.6, 1016.0], [1.7, 1016.0], [1.8, 1104.0], [1.9, 1104.0], [2.0, 1114.0], [2.1, 1114.0], [2.2, 1196.0], [2.3, 1196.0], [2.4, 1238.0], [2.5, 1238.0], [2.6, 1253.0], [2.7, 1253.0], [2.8, 1253.0], [2.9, 1265.0], [3.0, 1265.0], [3.1, 1284.0], [3.2, 1284.0], [3.3, 1285.0], [3.4, 1285.0], [3.5, 1288.0], [3.6, 1288.0], [3.7, 1373.0], [3.8, 1373.0], [3.9, 1377.0], [4.0, 1377.0], [4.1, 1378.0], [4.2, 1378.0], [4.3, 1380.0], [4.4, 1380.0], [4.5, 1381.0], [4.6, 1381.0], [4.7, 1387.0], [4.8, 1387.0], [4.9, 1391.0], [5.0, 1391.0], [5.1, 1397.0], [5.2, 1397.0], [5.3, 1481.0], [5.4, 1481.0], [5.5, 1504.0], [5.6, 1504.0], [5.7, 1582.0], [5.8, 1582.0], [5.9, 1681.0], [6.0, 1681.0], [6.1, 1772.0], [6.2, 1772.0], [6.3, 1772.0], [6.4, 1772.0], [6.5, 1782.0], [6.6, 1782.0], [6.7, 1807.0], [6.8, 1807.0], [6.9, 1900.0], [7.0, 1900.0], [7.1, 2092.0], [7.2, 2092.0], [7.3, 2179.0], [7.4, 2179.0], [7.5, 2189.0], [7.6, 2189.0], [7.7, 2387.0], [7.8, 2387.0], [7.9, 2391.0], [8.0, 2391.0], [8.1, 2484.0], [8.2, 2484.0], [8.3, 2489.0], [8.4, 2489.0], [8.5, 2491.0], [8.6, 2491.0], [8.7, 2595.0], [8.8, 2601.0], [8.9, 2601.0], [9.0, 2695.0], [9.1, 2695.0], [9.2, 2701.0], [9.3, 2701.0], [9.4, 2711.0], [9.5, 2711.0], [9.6, 2800.0], [9.7, 2800.0], [9.8, 2803.0], [9.9, 2803.0], [10.0, 2884.0], [10.1, 2884.0], [10.2, 2896.0], [10.3, 2896.0], [10.4, 2976.0], [10.5, 2976.0], [10.6, 2990.0], [10.7, 2990.0], [10.8, 2999.0], [10.9, 2999.0], [11.0, 3011.0], [11.1, 3011.0], [11.2, 3082.0], [11.3, 3082.0], [11.4, 3087.0], [11.5, 3087.0], [11.6, 3094.0], [11.7, 3094.0], [11.8, 3095.0], [11.9, 3095.0], [12.0, 3100.0], [12.1, 3100.0], [12.2, 3101.0], [12.3, 3101.0], [12.4, 3102.0], [12.5, 3102.0], [12.6, 3103.0], [12.7, 3103.0], [12.8, 3107.0], [12.9, 3107.0], [13.0, 3113.0], [13.1, 3113.0], [13.2, 3114.0], [13.3, 3114.0], [13.4, 3127.0], [13.5, 3127.0], [13.6, 3151.0], [13.7, 3151.0], [13.8, 3170.0], [13.9, 3170.0], [14.0, 3181.0], [14.1, 3181.0], [14.2, 3192.0], [14.3, 3192.0], [14.4, 3202.0], [14.5, 3202.0], [14.6, 3205.0], [14.7, 3205.0], [14.8, 3207.0], [14.9, 3207.0], [15.0, 3207.0], [15.1, 3207.0], [15.2, 3282.0], [15.3, 3282.0], [15.4, 3292.0], [15.5, 3292.0], [15.6, 3293.0], [15.7, 3293.0], [15.8, 3295.0], [15.9, 3295.0], [16.0, 3295.0], [16.1, 3295.0], [16.2, 3298.0], [16.3, 3298.0], [16.4, 3304.0], [16.5, 3304.0], [16.6, 3365.0], [16.7, 3365.0], [16.8, 3383.0], [16.9, 3383.0], [17.0, 3387.0], [17.1, 3387.0], [17.2, 3390.0], [17.3, 3390.0], [17.4, 3392.0], [17.5, 3392.0], [17.6, 3395.0], [17.7, 3395.0], [17.8, 3396.0], [17.9, 3396.0], [18.0, 3397.0], [18.1, 3397.0], [18.2, 3399.0], [18.3, 3399.0], [18.4, 3447.0], [18.5, 3447.0], [18.6, 3467.0], [18.7, 3467.0], [18.8, 3481.0], [18.9, 3481.0], [19.0, 3486.0], [19.1, 3486.0], [19.2, 3489.0], [19.3, 3489.0], [19.4, 3495.0], [19.5, 3495.0], [19.6, 3499.0], [19.7, 3499.0], [19.8, 3499.0], [19.9, 3499.0], [20.0, 3503.0], [20.1, 3503.0], [20.2, 3509.0], [20.3, 3509.0], [20.4, 3515.0], [20.5, 3515.0], [20.6, 3586.0], [20.7, 3586.0], [20.8, 3589.0], [20.9, 3589.0], [21.0, 3593.0], [21.1, 3593.0], [21.2, 3594.0], [21.3, 3594.0], [21.4, 3595.0], [21.5, 3595.0], [21.6, 3596.0], [21.7, 3596.0], [21.8, 3597.0], [21.9, 3597.0], [22.0, 3597.0], [22.1, 3597.0], [22.2, 3598.0], [22.3, 3598.0], [22.4, 3598.0], [22.5, 3598.0], [22.6, 3602.0], [22.7, 3602.0], [22.8, 3606.0], [22.9, 3606.0], [23.0, 3607.0], [23.1, 3607.0], [23.2, 3618.0], [23.3, 3618.0], [23.4, 3689.0], [23.5, 3689.0], [23.6, 3691.0], [23.7, 3691.0], [23.8, 3692.0], [23.9, 3692.0], [24.0, 3696.0], [24.1, 3696.0], [24.2, 3696.0], [24.3, 3696.0], [24.4, 3698.0], [24.5, 3698.0], [24.6, 3698.0], [24.7, 3698.0], [24.8, 3698.0], [24.9, 3698.0], [25.0, 3703.0], [25.1, 3703.0], [25.2, 3705.0], [25.3, 3705.0], [25.4, 3709.0], [25.5, 3709.0], [25.6, 3711.0], [25.7, 3711.0], [25.8, 3747.0], [25.9, 3747.0], [26.0, 3769.0], [26.1, 3769.0], [26.2, 3788.0], [26.3, 3788.0], [26.4, 3789.0], [26.5, 3789.0], [26.6, 3790.0], [26.7, 3790.0], [26.8, 3793.0], [26.9, 3793.0], [27.0, 3795.0], [27.1, 3795.0], [27.2, 3796.0], [27.3, 3796.0], [27.4, 3797.0], [27.5, 3797.0], [27.6, 3798.0], [27.7, 3798.0], [27.8, 3798.0], [27.9, 3798.0], [28.0, 3799.0], [28.1, 3799.0], [28.2, 3800.0], [28.3, 3800.0], [28.4, 3802.0], [28.5, 3802.0], [28.6, 3809.0], [28.7, 3809.0], [28.8, 3811.0], [28.9, 3811.0], [29.0, 3814.0], [29.1, 3814.0], [29.2, 3824.0], [29.3, 3824.0], [29.4, 3845.0], [29.5, 3845.0], [29.6, 3860.0], [29.7, 3860.0], [29.8, 3867.0], [29.9, 3867.0], [30.0, 3878.0], [30.1, 3878.0], [30.2, 3886.0], [30.3, 3886.0], [30.4, 3887.0], [30.5, 3887.0], [30.6, 3888.0], [30.7, 3888.0], [30.8, 3888.0], [30.9, 3888.0], [31.0, 3889.0], [31.1, 3889.0], [31.2, 3889.0], [31.3, 3889.0], [31.4, 3899.0], [31.5, 3899.0], [31.6, 3899.0], [31.7, 3899.0], [31.8, 3899.0], [31.9, 3899.0], [32.0, 3900.0], [32.1, 3900.0], [32.2, 3904.0], [32.3, 3904.0], [32.4, 3905.0], [32.5, 3905.0], [32.6, 3905.0], [32.7, 3905.0], [32.8, 3910.0], [32.9, 3910.0], [33.0, 3913.0], [33.1, 3913.0], [33.2, 3917.0], [33.3, 3917.0], [33.4, 3948.0], [33.5, 3948.0], [33.6, 3979.0], [33.7, 3979.0], [33.8, 3986.0], [33.9, 3986.0], [34.0, 3987.0], [34.1, 3987.0], [34.2, 3990.0], [34.3, 3990.0], [34.4, 3991.0], [34.5, 3991.0], [34.6, 3993.0], [34.7, 3993.0], [34.8, 3993.0], [34.9, 3993.0], [35.0, 3998.0], [35.1, 3998.0], [35.2, 3999.0], [35.3, 3999.0], [35.4, 4001.0], [35.5, 4001.0], [35.6, 4002.0], [35.7, 4002.0], [35.8, 4002.0], [35.9, 4002.0], [36.0, 4003.0], [36.1, 4003.0], [36.2, 4004.0], [36.3, 4004.0], [36.4, 4010.0], [36.5, 4010.0], [36.6, 4011.0], [36.7, 4011.0], [36.8, 4015.0], [36.9, 4015.0], [37.0, 4015.0], [37.1, 4015.0], [37.2, 4016.0], [37.3, 4016.0], [37.4, 4035.0], [37.5, 4035.0], [37.6, 4041.0], [37.7, 4041.0], [37.8, 4043.0], [37.9, 4043.0], [38.0, 4073.0], [38.1, 4073.0], [38.2, 4075.0], [38.3, 4075.0], [38.4, 4086.0], [38.5, 4086.0], [38.6, 4087.0], [38.7, 4087.0], [38.8, 4091.0], [38.9, 4091.0], [39.0, 4091.0], [39.1, 4091.0], [39.2, 4091.0], [39.3, 4091.0], [39.4, 4092.0], [39.5, 4092.0], [39.6, 4092.0], [39.7, 4092.0], [39.8, 4094.0], [39.9, 4094.0], [40.0, 4099.0], [40.1, 4099.0], [40.2, 4101.0], [40.3, 4101.0], [40.4, 4101.0], [40.5, 4108.0], [40.6, 4108.0], [40.7, 4139.0], [40.8, 4139.0], [40.9, 4146.0], [41.0, 4146.0], [41.1, 4151.0], [41.2, 4151.0], [41.3, 4174.0], [41.4, 4174.0], [41.5, 4183.0], [41.6, 4183.0], [41.7, 4184.0], [41.8, 4184.0], [41.9, 4188.0], [42.0, 4188.0], [42.1, 4193.0], [42.2, 4193.0], [42.3, 4194.0], [42.4, 4194.0], [42.5, 4197.0], [42.6, 4197.0], [42.7, 4198.0], [42.8, 4198.0], [42.9, 4198.0], [43.0, 4198.0], [43.1, 4199.0], [43.2, 4199.0], [43.3, 4200.0], [43.4, 4200.0], [43.5, 4206.0], [43.6, 4206.0], [43.7, 4209.0], [43.8, 4209.0], [43.9, 4214.0], [44.0, 4214.0], [44.1, 4245.0], [44.2, 4245.0], [44.3, 4260.0], [44.4, 4260.0], [44.5, 4261.0], [44.6, 4261.0], [44.7, 4280.0], [44.8, 4280.0], [44.9, 4286.0], [45.0, 4286.0], [45.1, 4286.0], [45.2, 4286.0], [45.3, 4287.0], [45.4, 4287.0], [45.5, 4287.0], [45.6, 4287.0], [45.7, 4290.0], [45.8, 4290.0], [45.9, 4295.0], [46.0, 4295.0], [46.1, 4295.0], [46.2, 4295.0], [46.3, 4296.0], [46.4, 4296.0], [46.5, 4296.0], [46.6, 4296.0], [46.7, 4297.0], [46.8, 4297.0], [46.9, 4297.0], [47.0, 4297.0], [47.1, 4300.0], [47.2, 4300.0], [47.3, 4300.0], [47.4, 4300.0], [47.5, 4310.0], [47.6, 4310.0], [47.7, 4312.0], [47.8, 4312.0], [47.9, 4313.0], [48.0, 4313.0], [48.1, 4344.0], [48.2, 4344.0], [48.3, 4379.0], [48.4, 4379.0], [48.5, 4390.0], [48.6, 4390.0], [48.7, 4394.0], [48.8, 4394.0], [48.9, 4402.0], [49.0, 4402.0], [49.1, 4403.0], [49.2, 4403.0], [49.3, 4408.0], [49.4, 4408.0], [49.5, 4411.0], [49.6, 4411.0], [49.7, 4438.0], [49.8, 4438.0], [49.9, 4448.0], [50.0, 4448.0], [50.1, 4472.0], [50.2, 4472.0], [50.3, 4476.0], [50.4, 4476.0], [50.5, 4484.0], [50.6, 4484.0], [50.7, 4489.0], [50.8, 4489.0], [50.9, 4490.0], [51.0, 4490.0], [51.1, 4491.0], [51.2, 4491.0], [51.3, 4491.0], [51.4, 4491.0], [51.5, 4492.0], [51.6, 4492.0], [51.7, 4493.0], [51.8, 4493.0], [51.9, 4494.0], [52.0, 4494.0], [52.1, 4495.0], [52.2, 4495.0], [52.3, 4496.0], [52.4, 4496.0], [52.5, 4497.0], [52.6, 4497.0], [52.7, 4498.0], [52.8, 4498.0], [52.9, 4501.0], [53.0, 4501.0], [53.1, 4501.0], [53.2, 4501.0], [53.3, 4503.0], [53.4, 4503.0], [53.5, 4504.0], [53.6, 4504.0], [53.7, 4506.0], [53.8, 4506.0], [53.9, 4507.0], [54.0, 4507.0], [54.1, 4507.0], [54.2, 4507.0], [54.3, 4512.0], [54.4, 4512.0], [54.5, 4545.0], [54.6, 4545.0], [54.7, 4551.0], [54.8, 4551.0], [54.9, 4579.0], [55.0, 4579.0], [55.1, 4587.0], [55.2, 4587.0], [55.3, 4588.0], [55.4, 4588.0], [55.5, 4589.0], [55.6, 4589.0], [55.7, 4590.0], [55.8, 4590.0], [55.9, 4591.0], [56.0, 4591.0], [56.1, 4599.0], [56.2, 4599.0], [56.3, 4603.0], [56.4, 4603.0], [56.5, 4604.0], [56.6, 4604.0], [56.7, 4604.0], [56.8, 4604.0], [56.9, 4604.0], [57.0, 4604.0], [57.1, 4607.0], [57.2, 4607.0], [57.3, 4628.0], [57.4, 4628.0], [57.5, 4676.0], [57.6, 4676.0], [57.7, 4687.0], [57.8, 4687.0], [57.9, 4689.0], [58.0, 4689.0], [58.1, 4694.0], [58.2, 4694.0], [58.3, 4694.0], [58.4, 4694.0], [58.5, 4697.0], [58.6, 4697.0], [58.7, 4697.0], [58.8, 4697.0], [58.9, 4697.0], [59.0, 4697.0], [59.1, 4700.0], [59.2, 4700.0], [59.3, 4701.0], [59.4, 4701.0], [59.5, 4702.0], [59.6, 4702.0], [59.7, 4702.0], [59.8, 4702.0], [59.9, 4706.0], [60.0, 4706.0], [60.1, 4744.0], [60.2, 4744.0], [60.3, 4748.0], [60.4, 4748.0], [60.5, 4768.0], [60.6, 4768.0], [60.7, 4777.0], [60.8, 4777.0], [60.9, 4785.0], [61.0, 4785.0], [61.1, 4786.0], [61.2, 4786.0], [61.3, 4788.0], [61.4, 4788.0], [61.5, 4789.0], [61.6, 4789.0], [61.7, 4789.0], [61.8, 4789.0], [61.9, 4789.0], [62.0, 4789.0], [62.1, 4797.0], [62.2, 4797.0], [62.3, 4804.0], [62.4, 4804.0], [62.5, 4814.0], [62.6, 4814.0], [62.7, 4815.0], [62.8, 4815.0], [62.9, 4863.0], [63.0, 4863.0], [63.1, 4884.0], [63.2, 4884.0], [63.3, 4886.0], [63.4, 4886.0], [63.5, 4887.0], [63.6, 4887.0], [63.7, 4891.0], [63.8, 4891.0], [63.9, 4891.0], [64.0, 4891.0], [64.1, 4893.0], [64.2, 4893.0], [64.3, 4895.0], [64.4, 4895.0], [64.5, 4896.0], [64.6, 4896.0], [64.7, 4897.0], [64.8, 4897.0], [64.9, 4898.0], [65.0, 4898.0], [65.1, 4899.0], [65.2, 4899.0], [65.3, 4903.0], [65.4, 4903.0], [65.5, 4909.0], [65.6, 4909.0], [65.7, 4941.0], [65.8, 4941.0], [65.9, 4963.0], [66.0, 4963.0], [66.1, 4979.0], [66.2, 4979.0], [66.3, 4980.0], [66.4, 4980.0], [66.5, 4982.0], [66.6, 4982.0], [66.7, 4983.0], [66.8, 4983.0], [66.9, 4986.0], [67.0, 4986.0], [67.1, 4987.0], [67.2, 4987.0], [67.3, 4988.0], [67.4, 4988.0], [67.5, 4994.0], [67.6, 4994.0], [67.7, 4996.0], [67.8, 4996.0], [67.9, 4998.0], [68.0, 4998.0], [68.1, 4999.0], [68.2, 4999.0], [68.3, 5002.0], [68.4, 5002.0], [68.5, 5006.0], [68.6, 5006.0], [68.7, 5008.0], [68.8, 5008.0], [68.9, 5030.0], [69.0, 5030.0], [69.1, 5043.0], [69.2, 5043.0], [69.3, 5087.0], [69.4, 5087.0], [69.5, 5092.0], [69.6, 5092.0], [69.7, 5094.0], [69.8, 5094.0], [69.9, 5099.0], [70.0, 5099.0], [70.1, 5101.0], [70.2, 5101.0], [70.3, 5102.0], [70.4, 5102.0], [70.5, 5103.0], [70.6, 5103.0], [70.7, 5105.0], [70.8, 5105.0], [70.9, 5114.0], [71.0, 5114.0], [71.1, 5120.0], [71.2, 5120.0], [71.3, 5181.0], [71.4, 5181.0], [71.5, 5183.0], [71.6, 5183.0], [71.7, 5183.0], [71.8, 5183.0], [71.9, 5190.0], [72.0, 5190.0], [72.1, 5190.0], [72.2, 5190.0], [72.3, 5193.0], [72.4, 5193.0], [72.5, 5199.0], [72.6, 5199.0], [72.7, 5200.0], [72.8, 5200.0], [72.9, 5201.0], [73.0, 5201.0], [73.1, 5201.0], [73.2, 5201.0], [73.3, 5206.0], [73.4, 5206.0], [73.5, 5212.0], [73.6, 5212.0], [73.7, 5214.0], [73.8, 5214.0], [73.9, 5216.0], [74.0, 5216.0], [74.1, 5219.0], [74.2, 5219.0], [74.3, 5240.0], [74.4, 5240.0], [74.5, 5281.0], [74.6, 5281.0], [74.7, 5286.0], [74.8, 5286.0], [74.9, 5288.0], [75.0, 5288.0], [75.1, 5293.0], [75.2, 5293.0], [75.3, 5297.0], [75.4, 5297.0], [75.5, 5298.0], [75.6, 5298.0], [75.7, 5298.0], [75.8, 5298.0], [75.9, 5305.0], [76.0, 5305.0], [76.1, 5307.0], [76.2, 5307.0], [76.3, 5344.0], [76.4, 5344.0], [76.5, 5396.0], [76.6, 5396.0], [76.7, 5401.0], [76.8, 5401.0], [76.9, 5403.0], [77.0, 5403.0], [77.1, 5406.0], [77.2, 5406.0], [77.3, 5410.0], [77.4, 5410.0], [77.5, 5489.0], [77.6, 5489.0], [77.7, 5493.0], [77.8, 5493.0], [77.9, 5497.0], [78.0, 5497.0], [78.1, 5497.0], [78.2, 5497.0], [78.3, 5498.0], [78.4, 5498.0], [78.5, 5501.0], [78.6, 5501.0], [78.7, 5501.0], [78.8, 5501.0], [78.9, 5561.0], [79.0, 5561.0], [79.1, 5584.0], [79.2, 5584.0], [79.3, 5585.0], [79.4, 5585.0], [79.5, 5587.0], [79.6, 5587.0], [79.7, 5588.0], [79.8, 5588.0], [79.9, 5590.0], [80.0, 5590.0], [80.1, 5596.0], [80.2, 5596.0], [80.3, 5605.0], [80.4, 5605.0], [80.5, 5608.0], [80.6, 5608.0], [80.7, 5645.0], [80.8, 5645.0], [80.9, 5666.0], [81.0, 5666.0], [81.1, 5681.0], [81.2, 5681.0], [81.3, 5683.0], [81.4, 5683.0], [81.5, 5691.0], [81.6, 5691.0], [81.7, 5694.0], [81.8, 5694.0], [81.9, 5697.0], [82.0, 5697.0], [82.1, 5707.0], [82.2, 5707.0], [82.3, 5707.0], [82.4, 5707.0], [82.5, 5789.0], [82.6, 5789.0], [82.7, 5790.0], [82.8, 5790.0], [82.9, 5791.0], [83.0, 5791.0], [83.1, 5792.0], [83.2, 5792.0], [83.3, 5793.0], [83.4, 5793.0], [83.5, 5795.0], [83.6, 5795.0], [83.7, 5796.0], [83.8, 5796.0], [83.9, 5801.0], [84.0, 5801.0], [84.1, 5888.0], [84.2, 5888.0], [84.3, 5890.0], [84.4, 5890.0], [84.5, 5891.0], [84.6, 5891.0], [84.7, 5899.0], [84.8, 5899.0], [84.9, 5906.0], [85.0, 5906.0], [85.1, 5910.0], [85.2, 5910.0], [85.3, 5915.0], [85.4, 5915.0], [85.5, 5999.0], [85.6, 5999.0], [85.7, 6007.0], [85.8, 6007.0], [85.9, 6018.0], [86.0, 6018.0], [86.1, 6060.0], [86.2, 6060.0], [86.3, 6079.0], [86.4, 6079.0], [86.5, 6083.0], [86.6, 6083.0], [86.7, 6098.0], [86.8, 6098.0], [86.9, 6101.0], [87.0, 6101.0], [87.1, 6101.0], [87.2, 6101.0], [87.3, 6101.0], [87.4, 6101.0], [87.5, 6103.0], [87.6, 6103.0], [87.7, 6114.0], [87.8, 6114.0], [87.9, 6156.0], [88.0, 6156.0], [88.1, 6189.0], [88.2, 6189.0], [88.3, 6200.0], [88.4, 6200.0], [88.5, 6201.0], [88.6, 6201.0], [88.7, 6201.0], [88.8, 6201.0], [88.9, 6206.0], [89.0, 6206.0], [89.1, 6293.0], [89.2, 6293.0], [89.3, 6296.0], [89.4, 6296.0], [89.5, 6297.0], [89.6, 6297.0], [89.7, 6360.0], [89.8, 6360.0], [89.9, 6383.0], [90.0, 6383.0], [90.1, 6388.0], [90.2, 6388.0], [90.3, 6389.0], [90.4, 6389.0], [90.5, 6400.0], [90.6, 6400.0], [90.7, 6458.0], [90.8, 6458.0], [90.9, 6473.0], [91.0, 6473.0], [91.1, 6500.0], [91.2, 6500.0], [91.3, 6503.0], [91.4, 6503.0], [91.5, 6505.0], [91.6, 6505.0], [91.7, 6531.0], [91.8, 6531.0], [91.9, 6543.0], [92.0, 6543.0], [92.1, 6605.0], [92.2, 6605.0], [92.3, 6703.0], [92.4, 6703.0], [92.5, 6782.0], [92.6, 6782.0], [92.7, 6790.0], [92.8, 6790.0], [92.9, 6984.0], [93.0, 6984.0], [93.1, 6992.0], [93.2, 6992.0], [93.3, 6995.0], [93.4, 6995.0], [93.5, 6999.0], [93.6, 6999.0], [93.7, 7062.0], [93.8, 7062.0], [93.9, 7089.0], [94.0, 7089.0], [94.1, 7089.0], [94.2, 7089.0], [94.3, 7103.0], [94.4, 7103.0], [94.5, 7197.0], [94.6, 7197.0], [94.7, 7204.0], [94.8, 7204.0], [94.9, 7274.0], [95.0, 7274.0], [95.1, 7296.0], [95.2, 7296.0], [95.3, 7297.0], [95.4, 7297.0], [95.5, 7302.0], [95.6, 7302.0], [95.7, 7314.0], [95.8, 7314.0], [95.9, 7393.0], [96.0, 7393.0], [96.1, 7395.0], [96.2, 7395.0], [96.3, 7406.0], [96.4, 7406.0], [96.5, 7493.0], [96.6, 7493.0], [96.7, 7497.0], [96.8, 7497.0], [96.9, 7498.0], [97.0, 7498.0], [97.1, 7605.0], [97.2, 7605.0], [97.3, 7608.0], [97.4, 7608.0], [97.5, 7702.0], [97.6, 7702.0], [97.7, 7787.0], [97.8, 7787.0], [97.9, 7814.0], [98.0, 7814.0], [98.1, 7993.0], [98.2, 7993.0], [98.3, 7998.0], [98.4, 7998.0], [98.5, 8001.0], [98.6, 8001.0], [98.7, 8111.0], [98.8, 8111.0], [98.9, 8143.0], [99.0, 8143.0], [99.1, 8195.0], [99.2, 8195.0], [99.3, 8485.0], [99.4, 8485.0], [99.5, 8598.0], [99.6, 8598.0], [99.7, 9097.0], [99.8, 9097.0], [99.9, 9506.0], [100.0, 9506.0]], "isOverall": false, "label": "Search Users", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 1.0, "minX": 400.0, "maxY": 24.0, "series": [{"data": [[600.0, 2.0], [700.0, 2.0], [900.0, 2.0], [1000.0, 2.0], [1100.0, 3.0], [1200.0, 6.0], [1300.0, 8.0], [1400.0, 1.0], [1500.0, 2.0], [1600.0, 1.0], [1700.0, 3.0], [1800.0, 1.0], [1900.0, 1.0], [2000.0, 1.0], [2100.0, 2.0], [2300.0, 2.0], [2400.0, 3.0], [2500.0, 1.0], [2600.0, 2.0], [2800.0, 4.0], [2700.0, 2.0], [2900.0, 3.0], [3000.0, 5.0], [3100.0, 12.0], [3300.0, 10.0], [3200.0, 10.0], [3400.0, 8.0], [3500.0, 13.0], [3700.0, 16.0], [3600.0, 12.0], [3800.0, 19.0], [3900.0, 17.0], [4000.0, 24.0], [4100.0, 15.0], [4200.0, 19.0], [4300.0, 9.0], [4400.0, 20.0], [4500.0, 17.0], [4600.0, 14.0], [4700.0, 16.0], [4800.0, 15.0], [4900.0, 15.0], [5000.0, 9.0], [5100.0, 13.0], [5200.0, 16.0], [5300.0, 4.0], [5400.0, 9.0], [5500.0, 9.0], [5600.0, 9.0], [5700.0, 9.0], [5800.0, 5.0], [6000.0, 6.0], [6100.0, 7.0], [5900.0, 4.0], [6200.0, 7.0], [6300.0, 4.0], [6400.0, 3.0], [6500.0, 5.0], [6600.0, 1.0], [6700.0, 3.0], [6900.0, 4.0], [7000.0, 3.0], [7100.0, 2.0], [7200.0, 4.0], [7400.0, 4.0], [7300.0, 4.0], [7600.0, 2.0], [7700.0, 2.0], [7900.0, 2.0], [7800.0, 1.0], [8100.0, 3.0], [8000.0, 1.0], [8400.0, 1.0], [8500.0, 1.0], [9000.0, 1.0], [9500.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Search Users", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 9500.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 1.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 473.0, "series": [{"data": [[0.0, 1.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 26.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 473.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 82.58196721311481, "minX": 1.75079232E12, "maxY": 100.0, "series": [{"data": [[1.75079238E12, 82.58196721311481], [1.75079232E12, 100.0]], "isOverall": false, "label": "Search Test", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.75079238E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 405.0, "minX": 1.0, "maxY": 7497.0, "series": [{"data": [[3.0, 2389.0], [4.0, 1397.0], [5.0, 3979.0], [6.0, 4579.0], [7.0, 3515.0], [8.0, 721.0], [10.0, 3700.5], [11.0, 2701.0], [13.0, 3056.5], [14.0, 5910.0], [15.0, 6503.0], [16.0, 6297.0], [18.0, 4146.5], [19.0, 1807.0], [20.0, 3594.0], [21.0, 1104.0], [22.0, 7103.0], [24.0, 3898.5], [25.0, 2695.0], [26.0, 5114.0], [27.0, 5206.0], [28.0, 3207.0], [29.0, 7297.0], [30.0, 3011.0], [31.0, 5305.0], [33.0, 5498.0], [32.0, 405.0], [35.0, 695.0], [34.0, 4723.0], [37.0, 4200.0], [36.0, 4296.0], [39.0, 4087.0], [38.0, 3790.0], [41.0, 2601.0], [40.0, 4590.0], [43.0, 7497.0], [42.0, 3095.0], [44.0, 2595.0], [47.0, 4015.0], [46.0, 4552.666666666667], [49.0, 5059.5], [48.0, 5246.5], [51.0, 3698.0], [50.0, 4209.0], [53.0, 5105.0], [52.0, 4891.0], [55.0, 4909.0], [54.0, 6357.5], [57.0, 6114.0], [56.0, 5216.0], [59.0, 4390.0], [58.0, 4152.0], [61.0, 4092.0], [60.0, 5633.666666666667], [62.0, 3102.0], [67.0, 5603.5], [66.0, 4002.0], [65.0, 5242.0], [64.0, 6352.5], [71.0, 4480.75], [68.0, 5793.0], [75.0, 3809.0], [74.0, 6098.0], [73.0, 5915.0], [72.0, 4964.0], [78.0, 5054.0], [77.0, 4999.666666666667], [76.0, 5408.375], [83.0, 4507.0], [82.0, 4534.333333333333], [81.0, 7395.0], [80.0, 4467.333333333333], [87.0, 4974.666666666667], [86.0, 4684.8], [85.0, 3991.0], [84.0, 4177.0], [91.0, 3861.6666666666665], [90.0, 4397.333333333333], [89.0, 4650.0], [88.0, 4703.6], [95.0, 4561.933333333333], [94.0, 4784.333333333333], [93.0, 5445.0], [92.0, 3979.6666666666665], [99.0, 4898.9375], [98.0, 5224.714285714286], [97.0, 5396.333333333333], [96.0, 4839.6], [100.0, 4378.48096885813], [1.0, 2092.0]], "isOverall": false, "label": "Search Users", "isController": false}, {"data": [[87.2499999999999, 4490.596000000002]], "isOverall": false, "label": "Search Users-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 414.6666666666667, "minX": 1.75079232E12, "maxY": 33685.833333333336, "series": [{"data": [[1.75079238E12, 33685.833333333336], [1.75079232E12, 12051.566666666668]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.75079238E12, 1132.4333333333334], [1.75079232E12, 414.6666666666667]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.75079238E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 4128.380597014927, "minX": 1.75079232E12, "maxY": 4623.210382513666, "series": [{"data": [[1.75079238E12, 4623.210382513666], [1.75079232E12, 4128.380597014927]], "isOverall": false, "label": "Search Users", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.75079238E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 4127.634328358209, "minX": 1.75079232E12, "maxY": 4623.002732240433, "series": [{"data": [[1.75079238E12, 4623.002732240433], [1.75079232E12, 4127.634328358209]], "isOverall": false, "label": "Search Users", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.75079238E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 4.4644808743169415, "minX": 1.75079232E12, "maxY": 564.5373134328356, "series": [{"data": [[1.75079238E12, 4.4644808743169415], [1.75079232E12, 564.5373134328356]], "isOverall": false, "label": "Search Users", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.75079238E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 405.0, "minX": 1.75079232E12, "maxY": 9506.0, "series": [{"data": [[1.75079238E12, 9506.0], [1.75079232E12, 7787.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.75079238E12, 6430.9000000000015], [1.75079232E12, 6371.5]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.75079238E12, 8522.289999999999], [1.75079232E12, 7684.100000000001]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.75079238E12, 7394.3], [1.75079232E12, 6602.75]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.75079238E12, 405.0], [1.75079232E12, 604.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.75079238E12, 4490.5], [1.75079232E12, 4266.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.75079238E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 914.5, "minX": 2.0, "maxY": 5497.0, "series": [{"data": [[2.0, 914.5], [32.0, 4749.0], [35.0, 3594.0], [13.0, 4488.5], [14.0, 5364.5], [4.0, 2733.5], [16.0, 3542.0], [17.0, 4489.0], [18.0, 4999.0], [19.0, 1380.0], [20.0, 4492.0], [21.0, 4646.5], [22.0, 4935.5], [24.0, 4204.5], [27.0, 5497.0], [30.0, 4587.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 35.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 901.5, "minX": 2.0, "maxY": 5497.0, "series": [{"data": [[2.0, 901.5], [32.0, 4749.0], [35.0, 3594.0], [13.0, 4488.5], [14.0, 5364.0], [4.0, 2733.0], [16.0, 3542.0], [17.0, 4489.0], [18.0, 4999.0], [19.0, 1380.0], [20.0, 4492.0], [21.0, 4646.5], [22.0, 4935.5], [24.0, 4204.5], [27.0, 5497.0], [30.0, 4587.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 35.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 3.9, "minX": 1.75079232E12, "maxY": 4.433333333333334, "series": [{"data": [[1.75079238E12, 4.433333333333334], [1.75079232E12, 3.9]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.75079238E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 2.2333333333333334, "minX": 1.75079232E12, "maxY": 6.1, "series": [{"data": [[1.75079238E12, 6.1], [1.75079232E12, 2.2333333333333334]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.75079238E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 2.2333333333333334, "minX": 1.75079232E12, "maxY": 6.1, "series": [{"data": [[1.75079238E12, 6.1], [1.75079232E12, 2.2333333333333334]], "isOverall": false, "label": "Search Users-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.75079238E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 2.2333333333333334, "minX": 1.75079232E12, "maxY": 6.1, "series": [{"data": [[1.75079238E12, 6.1], [1.75079232E12, 2.2333333333333334]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.75079238E12, "title": "Total Transactions Per Second"}},
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

