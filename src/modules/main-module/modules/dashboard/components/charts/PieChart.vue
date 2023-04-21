<template>
  <div :id="id" style="width: 100%; height: 55vh"></div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "PieChart",
  props: { pieData: Object, id: String },
  data: function () {
    return {};
  },
  watch: {
    pieData() {
      var chartDom = document.getElementById(this.id);
      var myChart = echarts.init(chartDom);
      myChart.setOption(this.option);
    },
  },
  mounted() {
    if (Object.keys(this.pieData).length !== 0) {
      var chartDom = document.getElementById(this.id);
      var myChart = echarts.init(chartDom);
      myChart.setOption(this.option);
    }
  },
  computed: {
    data() {
      const data = this.pieData.data;
      const backgroundColor = this.pieData.colors;
      return data
        .map((el, i) => {
          const obj = { itemStyle: {} };
          obj.value = el;
          obj.name = this.pieData.labels[i];
          obj.itemStyle.color = backgroundColor[i];
          return obj;
        })
        .sort(function (a, b) {
          return a.value - b.value;
        });
    },
    option() {
      return {
        title: {
          text: this.pieData.title,
          left: "center",
          top: 10,
          textStyle: {
            color: "#000",
          },
        },
        tooltip: {
          trigger: "item",
        },
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1],
          },
        },
        series: [
          {
            name: this.pieData.title,
            type: "pie",
            radius: "75%",
            center: ["50%", "50%"],
            data: this.data,
            roseType: "radius",
            labelLine: {
              smooth: 0.2,
              length: 10,
              length2: 20,
            },
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function () {
              return Math.random() * 200;
            },
          },
        ],
      };
    },
  },
};
</script>
