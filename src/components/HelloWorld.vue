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
        <div>
          <el-header>
            <h1>全国教育网站IPv6普及状况一览</h1>
          </el-header>
          <el-table
            :data="domainTable"
            border
            style="width: 100%;margin: 20px">
            <el-table-column
              prop="id"
              label="排名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="省份/单位"
              width="180">
            </el-table-column>
            <el-table-column
              prop="all_count"
              label="站点总数量">
            </el-table-column>
            <el-table-column
              prop="ipv6_count"
              label="IPv6站点数量">
            </el-table-column>
            <el-table-column
              prop="ipv6_rate"
              label="IPv6站点占比">
            </el-table-column>
            <el-table-column
              label="操作">
                <template slot-scope="scope">
                  <el-button>查看详情</el-button>
                </template>
            </el-table-column>
          </el-table>
        </div>
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
  name: 'HelloWorld',
  deactivated() {
  },
  data() {
    return {
      activeName: '123',
      ruleForm: {},
      domainTable: [
        { domain: 'wawawa', id: '1', name: '上海市', all_count: 5000, ipv6_count: 4800, ipv6_rate: '80%' },
        { domain: 'wawawa', id: '1', name: '河南', all_count: 5000, ipv6_count: 4800, ipv6_rate: '80%' },
        { domain: 'wawawa', id: '1', name: '河北', all_count: 5000, ipv6_count: 4800, ipv6_rate: '80%' },
        { domain: 'wawawa', id: '1', name: '山东', all_count: 5000, ipv6_count: 4800, ipv6_rate: '80%' },
        { domain: 'wawawa', id: '1', name: '广东', all_count: 5000, ipv6_count: 4800, ipv6_rate: '80%' },
      ],
      chartData: {
        columns: ['日期', 'IPv6站点数量'],
        rows: [
          { 日期: '11月1日', IPv6站点数量: 123 },
          { 日期: '11月2日', IPv6站点数量: 1223 },
          { 日期: '11月3日', IPv6站点数量: 2123 },
          { 日期: '11月4日', IPv6站点数量: 4123 },
          { 日期: '11月5日', IPv6站点数量: 3123 },
          { 日期: '11月6日', IPv6站点数量: 7123 },
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
