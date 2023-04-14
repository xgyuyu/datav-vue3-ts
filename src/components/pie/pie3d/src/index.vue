<template>
  <div id="pie3d" class="datav-wrapper"></div>
</template>

<script lang='ts' setup>
import { computed, toRef, onMounted, watch } from 'vue'
import highcharts from "highcharts";
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { Pie3d } from './pie3d'

const props = defineProps<{
  com: Pie3d
}>()

const apiStore = useApiStore()
useDataCenter(props.com)

const config = toRef(props.com, 'config')
const attr = toRef(props.com, 'attr')

const dv_data = computed(() => {
  return apiStore.dataMap[props.com.id]?.source ?? {}
})


// 初始化
const init = (dataList) => {
  console.log('dataList=====', dataList);
  let quantity = 0; // 总数
  dataList.forEach((item) => {
    quantity += item.y;
  });
  dataList.forEach((item) => {
    item.bfb = parseInt((item.y / quantity) * 100);
    item.h = item.bfb * 1.5 >= 70 ? 70 : item.bfb * 1.5
  });
  // 修改3d饼图绘制过程
  let each = highcharts.each,
      round = Math.round,
      cos = Math.cos,
      sin = Math.sin,
      deg2rad = 180;
  highcharts.wrap(highcharts.seriesTypes.pie.prototype, "translate", function (proceed) {
    proceed.apply(this, [].slice.call(arguments, 1));
    // Do not do this if the chart is not 3D
    if (!this.chart.is3d()) {
      return;
    }
    var series = this,
        chart = series.chart,
        options = chart.options,
        seriesOptions = series.options,
        depth = seriesOptions.depth || 0,
        options3d = options.chart.options3d,
        alpha = options3d.alpha,
        beta = options3d.beta,
        z = seriesOptions.stacking
            ? (seriesOptions.stack || 0) * depth
            : series._i * depth;
    z += depth / 2;
    if (seriesOptions.grouping !== false) {
      z = 0;
    }
    each(series.data, function (point) {
      var shapeArgs = point.shapeArgs,
          angle;
      point.shapeType = "arc3d";
      var ran = point.options.h;
      shapeArgs.z = z;
      shapeArgs.depth = depth * 0.75 + ran;
      shapeArgs.alpha = alpha;
      shapeArgs.beta = beta;
      shapeArgs.center = series.center;
      shapeArgs.ran = ran;
      angle = (shapeArgs.end + shapeArgs.start) / 2;
      point.slicedTranslation = {
        translateX: round(
            cos(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)
        ),
        translateY: round(
            sin(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)
        ),
      };
    });
  });
  (function (H) {
    H.wrap(highcharts.SVGRenderer.prototype, "arc3dPath", function (proceed) {
      var ret = proceed.apply(this, [].slice.call(arguments, 1));
      ret.zTop = (ret.zOut + 0.5) / 100;
      return ret;
    });
  })(highcharts);
  const { plotOptions, colorList } = config.value
  highcharts.chart('pie3d', {
    chart: {
      animation: false,
      backgroundColor: "none",
      type: "pie", //饼图
      margin: [0, 0, 0, 0],
      height: attr.value.h,
      width: attr.value.w,
      options3d: {
        enabled: true, //使用3d功能
        alpha: plotOptions.alpha, //延y轴向内的倾斜角度
        beta: 0,
      },
      events: {
        load: function () {
          var each = highcharts.each,
              points = this.series[0].points;
          each(points, function (p, i) {
            p.graphic.attr({
              translateY: -p.shapeArgs.ran,
            });
            p.graphic.side1.attr({
              translateY: -p.shapeArgs.ran,
            });
            p.graphic.side2.attr({
              translateY: -p.shapeArgs.ran,
            });
          });
        },
      },
    },
    legend: {
      enabled: true, // 关闭图例
      align: "right", //水平方向位置
      verticalAlign: "top", //垂直方向位置
      layout: "vertical",
      itemStyle: {
        color: "#f4f4f6",
      },
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    plotOptions: {
      pie: {
        allowPointSelect: false, // 禁用点击
        cursor: "pointer",
        depth: plotOptions.depth,
        showInLegend: true,
        size: `${plotOptions.size}%`, // 外圈直径大小
        innerSize: plotOptions.innerSize, // 内圈直径大小
        center: [`${plotOptions.center[0]}%`, `${plotOptions.center[1]}%`],
        colors: colorList,
      },
    },
    credits: {
      enabled: false, // 禁用版权信息
    },
    series: [
      {
        type: "pie",
        name: "Browser share",
        data: dataList,
      },
    ],
  })
}

// DOM 渲染之后进行初始化
onMounted(() => {
  try {
    init(config.value.dataList)
  } catch (error) {
    console.log(error)
  }
})

// 修改了数据源
watch(
    () => dv_data.value,
    (newData: any) => {
      if (newData.length) {
        init(newData)
      }
    },
    {
      deep: false
    }
)

// 修改了配置
watch(
    () => config.value.plotOptions,
    (newData: any) => {
      init(dv_data.value.length ? dv_data.value : config.value.dataList)
    },
    {
      deep: true
    }
)
// 修改了配置
watch(
    () => config.value.colorList,
    (newData: any) => {
      init(dv_data.value.length ? dv_data.value : config.value.dataList)
    },
    {
      deep: true
    }
)
// 改变大小
watch(
    () => [attr.value.w, attr.value.h],
    ()=>{
      init(dv_data.value.length ? dv_data.value : config.value.dataList)
    },
    {
      deep: true
    }
)
</script>
