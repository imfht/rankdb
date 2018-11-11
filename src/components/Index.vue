<template>
  <div>
    <div style="background: aliceblue; min-height:60px" >
      <nav style=" padding-top: 20px">
        <router-link to="/" style="margin-right: 20px">
        <a style="font-size: large;"> 省份排名</a>
      </router-link>
        |
      <router-link to="/index" style="margin-right: 20px;margin-left: 20px">
        <a style="font-size: large;"> 历史趋势</a>
      </router-link>
        |
        <router-link to="/query" style="margin-left: 20px">
        <a style="font-size: large;"> 资源检索</a>
      </router-link>
      </nav>
    </div>
    <el-header>
            <h1>全国IPv4/IPv6站点趋势一览</h1>
    </el-header>
    <el-col :span="12">
      <ve-gauge :data="percentData" ref="halo1" :title="percentTitle"></ve-gauge>
      <!--<small style="text-align: center">全教育网IPv6占比</small>-->
    </el-col>
    <el-col :span="12">
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

export default {
  components: { TabNav, VeLine },
  name: 'Index',
  mounted() {
    // console.log('ref is', this.$refs.halo1);
    this.$refs.halo1.echarts.resize();
    this.$refs.halo2.echarts.resize();
    this.$refs.halo3.echarts.resize();
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
    return {
      activeName: '123',
      ruleForm: {},
      domainTable: [
        { domain: 'wawawa', id: '1', name: '上海市', all_count: 5000, ipv6_count: 4800, ipv6_rate: '80%' },
      ],
      percentData: {
        columns: ['type', 'a', 'b', 'value'],
        rows: [
          { type: '占比', value: 100, a: 81, b: 2 },
        ],
      },
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
          { '省份/单位': '上海市', IPv6占比: 92 },
          { '省份/单位': '北京市', IPv6占比: 82 },
          { '省份/单位': '河北省', IPv6占比: 72 },
          { '省份/单位': '河南省', IPv6占比: 62 },
          { '省份/单位': '山东省', IPv6占比: 60 },
          { '省份/单位': '广东省', IPv6占比: 49 },
          { '省份/单位': '四川省', IPv6占比: 46 },
          { '省份/单位': '浙江省', IPv6占比: 45 },
          { '省份/单位': '湖南省', IPv6占比: 42 },
          { '省份/单位': '安徽省', IPv6占比: 20 },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      // console.log('submit!');
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
