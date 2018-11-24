<template>
  <div>
    <Headers></Headers>
        <div class="mydiv">
          <el-header>
            <h1>教育行业IPv6网站一览</h1>
          </el-header>
          <el-table
            :data="domainTable"
            v-loading="loading"
            style="margin: 0px auto;">
            <el-table-column
              type="index"
              label="排名">
            </el-table-column>
            <el-table-column
              prop="prov"
              label="省份/单位"
              width="180">
              <template slot-scope="scope">
                <el-button type="text" @click="toHash('/subunit/' + scope.row.unitcode)">{{ scope.row.prov }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="total_count"
              label="站点总数量"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="ipv6_count"
              label="IPv6站点数量"
              sortable
            width="180">
            </el-table-column>
            <el-table-column
              prop="rate"
              label="IPv6站点占比"
              sortable
              width="180">
              <template slot-scope="scope">
                <span>{{scope.row.rate * 100 | rounding}}%</span>
                </template>
            </el-table-column>
            <!--<el-table-column-->
              <!--label="操作" width="180">-->
                <!--<template slot-scope="scope">-->
                  <!--<el-button>查看详情</el-button>-->
                <!--</template>-->
            <!--</el-table-column>-->
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
import Headers from '@/components/Headers';

export default {
  components: { Headers, TabNav, VeLine },
  name: 'HelloWorld',
  deactivated() {
  },
  created() {
    this.init();
  },
  data() {
    return {
      activeName: '123',
      ruleForm: {},
      loading: true,
      domainTable: [
      ],
    };
  },
  methods: {
    compare(a, b) {
      if (a.rate < b.rate) { return 1; }
      if (a.rate > b.rate) { return -1; }
      return 0;
    },
    toHash(hash) {
      window.location.hash = hash;
    },
    init() {
      this.axios.get('/p/latest').then((resp) => {
        this.domainTable = resp.data.domaindict.sort(this.compare);
        this.loading = false;
      },
      ).catch((error) => {
        this.loading = false;
        // eslint-disable-next-line
        console.log(error);
        this.$message({
          message: '加载失败，请稍后重试',
          center: true,
        });
      });
    },
    onSubmit() {
      // console.log('submit!');
    },
  },
  filters: {
    rounding(value) {
      return value.toFixed(2);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  h1, h2 {
    font-weight: normal;
  }
  .mydiv {
    width: 100%;
  }
  table {
    margin-left: auto;
    margin-right: auto;
  }
</style>
