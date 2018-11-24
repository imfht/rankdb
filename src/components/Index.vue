<template>
  <div>
    <Headers></Headers>
    <el-header>
            <h1>趋势一览</h1>
    </el-header>
    <!--<el-col>-->
      <!--<ve-gauge :data="percentData" ref="halo1" :title="percentTitle"></ve-gauge>-->
    <!--</el-col>-->
    <el-col>
    <ve-histogram :data="prov_data" ref="halo2" :title="provTitle">
    </ve-histogram>
      <!--<small>行政区统计</small>-->
    </el-col>
    <hr style="color: aliceblue">
    <el-col :span="24">
    <ve-line :data="chartData" :title="wholeTitle" ref="halo3"></ve-line>
      </el-col>
    <footer>
      ©️上海交通大学网络信息中心
    </footer>
  </div>
</template>
<script>
import VeLine from 'v-charts/lib/line.common';
import TabNav from 'element-ui/packages/tabs/src/tab-nav';
import Headers from '@/components/Headers';

export default {
  components: { TabNav, VeLine, Headers },
  name: 'Index',
  mounted() {
    // console.log('ref is', this.$refs.halo1);
    this.$refs.halo1.echarts.resize();
    this.$refs.halo2.echarts.resize();
    this.$refs.halo3.echarts.resize();
  },
  created() {
    this.my_init();
  },
  data() {
    this.percentTitle = {
      text: '全教育系统网站IPv6占比',
      left: 'center',
      bottom: 20,
    };
    this.provTitle = {
      text: '各行政区IPv6网站占比（前十名）',
      left: 'center',
      bottom: 20,
    };
    this.wholeTitle = {
      text: '全国IPv6网站数量曲线图',
      left: 'center',
      bottom: 20,
    };
    this.total_rate = 10;
    return {
      total_rate: 0,
      percentData: {
        columns: ['type', 'a', 'b', 'value'],
        rows: [
          { type: '占比', value: 100, a: this.total_rate, b: 2 },
        ],
      },
      activeName: '123',
      ruleForm: {},
      domainTable: [
        { domain: 'wawawa', id: '1', name: '上海市', all_count: 5000, ipv6_count: 4800, ipv6_rate: '80%' },
      ],
      chartData: {
        columns: ['日期', 'IPv6站点数量', 'IPv4站点数量'],
        rows: [
          { 日期: '11月1日', IPv6站点数量: 12223, IPv4站点数量: 123 },
          { 日期: '11月2日', IPv6站点数量: 6123, IPv4站点数量: 1223 },
          { 日期: '11月3日', IPv6站点数量: 5299, IPv4站点数量: 2223 },
          { 日期: '11月4日', IPv6站点数量: 4123, IPv4站点数量: 1323 },
          { 日期: '11月5日', IPv6站点数量: 3123, IPv4站点数量: 5643 },
          { 日期: '11月6日', IPv6站点数量: 1123, IPv4站点数量: 9009 },
        ],
      },
      prov_data: {
        columns: ['省份/单位', 'IPv6占比'],
        rows: [
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      // console.log('submit!');
    },
    compare(a, b) {
      if (a.rate < b.rate) { return 1; }
      if (a.rate > b.rate) { return -1; }
      return 0;
    },
    buildChartData(chartList) {
      const rtnValue = [];
      let x;
      chartList.sort(this.compare);
      /* eslint-disable */
      for (x in chartList) {
        console.log(chartList[x]);
        rtnValue.push({ '省份/单位': chartList[x].prov, IPv6占比: chartList[x].rate * 100 });
      }
      return rtnValue;
    },
    my_init() {
      this.axios.get('/p/total').then((resp) => {
        this.total_rate = resp.data.latest_total['0'].rate * 100;
        this.percentData = {
          columns: ['type', 'a', 'b', 'value'],
          rows: [
            { type: '占比', value: 100, a: this.total_rate, b: 2 },
          ],
        };
      });
      this.axios.get('/p/latest').then((resp) => {
        const rows = this.buildChartData(resp.data.domaindict);
        this.prov_data = { columns: ['省份/单位', 'IPv6占比'], rows };
        console.log(this.prov_data);
        // this.prov_data = this.buildChartData(resp.data.domaindict);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
