<template>
  <div>
    <Headers></Headers>
    <div class="mydiv">
      <el-header>
        <h1>安徽省IPv6网站一览</h1>
      </el-header>
      <div class="block">
        <span class="demonstration">时光机：</span>
        <el-date-picker
          v-model="value2"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions1">
        </el-date-picker>
      </div>
      <!--<el-dropdown>-->
      <!--<el-button type="primary" class="float_right">-->
      <!--历史记录<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
      <!--</el-button>-->
      <!--<el-dropdown-menu slot="dropdown">-->
      <!--<el-dropdown-item>第40周</el-dropdown-item>-->
      <!--<el-dropdown-item>第41周</el-dropdown-item>-->
      <!--<el-dropdown-item>第32周</el-dropdown-item>-->
      <!--<el-dropdown-item>第30周</el-dropdown-item>-->
      <!--<el-dropdown-item>第12周</el-dropdown-item>-->
      <!--</el-dropdown-menu>-->
      <!--</el-dropdown>-->
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
      <el-row :gutter="24" style="margin: 0px auto;">
        <el-col :xs="24" :xl="{span: 12, offset: 6}">
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
              label="学校">
            </el-table-column>
            <!--<el-table-column-->
            <!--prop="total_count"-->
            <!--label="站点总数量"-->
            <!--sortable-->
            <!--width="180">-->
            <!--</el-table-column>-->
            <el-table-column
              prop="ipv6_count"
              label="v6站点数"
              sortable>
            </el-table-column>
            <el-table-column
              prop="rate"
              label="v6普及率"
              sortable>
              <template slot-scope="scope">
                <span>{{scope.row.rate * 100 | rounding}}%</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
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
        value2: '',
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            },
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            },
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            },
          }],
        },
        activeName: '123',
        ruleForm: {},
        loading: true,
        domainTable: [],
      };
    },
    methods: {
      compare(a, b) {
        if (a.rate < b.rate) {
          return 1;
        }
        if (a.rate > b.rate) {
          return -1;
        }
        if (a.total_count > b.total_count) {
          return -1;
        }
        return 1;
      },
      toHash(hash) {
        window.location.hash = hash;
      },
      init() {
        this.axios.get(`/p/${this.$route.params.unit_code}/sub`)
          .then((resp) => {
              const data = resp.data.sublist.sort(this.compare);
              let i;
              for (i = 0; i < data.length; i++) {
                data[i].ipv6_count = parseInt(data[i].ipv6_count);
              }
              this.domainTable = data;
              this.loading = false;
            },
          )
          .catch((error) => {
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
  h1, h2 {
    font-weight: normal;
  }

  table {
    margin-left: auto;
    margin-right: auto;
  }

  .mydiv {
    width: 100%;
  }

  .el-dropdown {
    float: right;
  }
</style>
