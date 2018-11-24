<template>
  <div>
    <Headers></Headers>
    <div class="mydiv">
    <!--<span style="margin-top: 10px">-->
      <!--<span>首页</span>-->
      <!--<span>/</span>-->
      <!--<span >山东省</span>-->
      <!--<span>/</span>-->
      <!--<span >济南市</span>-->
      <!--<span>/</span>-->
      <!--&lt;!&ndash;TODO 加上可点击的link&ndash;&gt;-->
      <!--<span>历下区</span>-->
    <!--</span>-->
    </div>
    <div class="mydiv">
    <el-table
      :data="domainTable"
      v-loading="loading"
      style="margin: 0px auto;">
      <el-table-column
        type="index"
        label="排名">
      </el-table-column>
      <el-table-column
        prop="cn_name"
        label="单位名"
        width="180">
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
    </el-table>
    <footer>
      ©️上海交通大学网络信息中心
    </footer>
    </div>
  </div>
</template>

<script>
import Headers from '@/components/Headers';

export default {
  components: { Headers },
  name: 'SubUnitView',
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
      if (a.total_count > b.total_count) {
        return -1;
      }
      return 1;
    },
    toHash(hash) {
      window.location.hash = hash;
    },
    init() {
      this.axios.get(`/p/${this.$route.params.unit_code}/sub`).then((resp) => {
        this.domainTable = resp.data.sublist.sort(this.compare);
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

<style>
  table {
    margin-left: auto;
    margin-right: auto;
  }
  .mydiv {
    width: 100%;
  }
</style>
