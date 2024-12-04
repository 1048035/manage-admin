<template>
  <div>
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="chart" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">用户总数</div>
            <count-to
              :start-val="0"
              :end-val="modelIndexTotal.userCount"
              :duration="2600"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="chart" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">今日注册</div>
            <count-to
              :start-val="0"
              :end-val="modelIndexTotal.userRegisterCount"
              :duration="3000"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
      <!--
          <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="chart" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">提现总额</div>
            <count-to
              :start-val="0"
              :end-val="modelIndexTotal.withdrawScore"
              :duration="3200"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col> -->

  
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="chart" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">可用余额总额</div>
            <count-to
              :start-val="0"
              :end-val="modelIndexTotal.totalMoney"
              :duration="3600"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
      
  
      <!-- <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="chart" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">销售总额</div>
            <count-to
              :start-val="0"
              :end-val="modelIndexTotal.sellScore"
              :duration="3600"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col> -->
    </el-row>



  


    <!-- <div class="filter-container" style="text-align: right">
      <div class="filter-item" style="margin-bottom: 0">
        <el-date-picker
          v-model="query.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          :value-format="valueFormat"
          @change="handleTimeChange"
        />
      </div>
    </div> -->
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>
    
  </div>
</template>

<script>
import {
  sysIndexTotal,sysRegisterTotal
} from "@/api/fhindex/index";
import CountTo from "vue-count-to";
import BarChart from "./index/BarChart";
import LineChart from './index/LineChart'
export default {
  components: {
    CountTo,
    BarChart,
    LineChart
  },
  name: "Index",
  data() {
    return {
      modelIndexTotal:[],
      // 版本号
      version: "4.0.0",

      barChartData: {
        xDatas: ["04月20日", "04月21日"],
        yDatas: [18, 10],
      },
      lineChartData: {
        xDatas: [],
        yDatas: [],
      },
      valueFormat: "yyyyMMdd",
      query: {
        time: [],
        startTime: "",
        endTime: "",
        statPeriod: 3, // 1.分 2.时 3.日 4.月
      },
    };
  },
    created() {
    this.getIndexTotal()
    this.getRegisterStatisticsList()
  },
  methods: {
    getIndexTotal(){
       sysIndexTotal().then((response) => {
        console.log(response.data);
        this.modelIndexTotal=response.data
      });
    },
    getRegisterStatisticsList(){
      sysRegisterTotal().then((response) => {
              console.log(response.data);
              for(let i=response.data.length-1;i>=0;i--){
                this.lineChartData.xDatas.push(response.data[i].time)
                this.lineChartData.yDatas.push(response.data[i].count)
              }
              // this.modelIndexTotal=response.data
            });
    },
    goTarget(href) {
      window.open(href, "_blank");
    },
    /**
     * 日期选择
     */
    handleTimeChange(value) {
      this.query.startTime = "";
      this.query.endTime = "";
      if (value && value.length) {
        this.query.startTime = value[0];
        this.query.endTime = value[1];
      }
      // this.getUserOnlineCount()
      this.getRegisterStatisticsList()
    },
  },
};
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    /*&:hover {*/
    /*  .card-panel-icon-wrapper {*/
    /*    color: #fff;*/
    /*  }*/

    /*  .icon-people {*/
    /*    background: #40c9c6;*/
    /*  }*/

    /*  .icon-message {*/
    /*    background: #36a3f7;*/
    /*  }*/

    /*  .icon-money {*/
    /*    background: #f4516c;*/
    /*  }*/

    /*  .icon-shopping {*/
    /*    background: #34bfa3*/
    /*  }*/
    /*}*/
    .icon-table {
      color: blue;
    }
    .icon-tool {
      color: #ff9988;
    }
    .icon-dict {
      color: blueviolet;
    }
    .icon-edit {
      color: #bbb;
    }
    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>

