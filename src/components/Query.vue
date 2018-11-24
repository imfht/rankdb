<template>
  <div>
<Headers></Headers>
    <el-header>
            <h1>IPv6网络资源检索</h1>
    </el-header>
    <div>
      <el-form :inline="true" :model="SearchForm" style="width: 100%">
        <el-form-item>
          <el-input v-model="msg" style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="pagination-container">
      <el-pagination
        :current-page="query.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="10"
        :total="total"
        v-loading="loading"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    <el-table border fit highlight-current-row style="width: 100%" :data="hits">
      <el-table-column align="center" label="id" type="index" width="80">
      </el-table-column>
      <el-table-column label="标题" width="400px">
        <template slot-scope="scope">
          <span>
            <a target="_blank" :href="scope.row._source['url']">{{scope.row._source['html']['title']}}</a>
          </span>
          <br>
          <span>
            <a target="_blank" :href="scope.row._source['url']">{{scope.row._source.url}}</a>
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="IPv6地址" width="250">
        <template slot-scope="scope">
          <span>
            <el-tag>{{scope.row._source.ip}}</el-tag>
            </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="匹配内容">
        <template slot-scope="scope">
          {{scope.row.highlight['html.parsed_text'][0]}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="抓取时间">
        <template slot-scope="scope">
          {{scope.row._source['timestamp'] | timestampFilter}}
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        :current-page="query.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="10"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    </div>
    <footer>
      ©️上海交通大学网络信息中心
    </footer>
  </div>
</template>

<script>
import Headers from '@/components/Headers';

Date.prototype.format = function (fmt) {
  const o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
    }
  }
  return fmt;
};
export default {
  name: 'Query',
  components: { Headers },
  data() {
    this.SearchForm = {};
    return {
      loading: false,
      hits: [],
      num: 1,
      msg: '',
      total: 0,
      query: {
        page: 1,
        newest: false,
        limit: 10,
      },
    };
  },
  methods: {
    fetch() {
      this.loading = true;
      this.axios.get(`/api/search?q=${this.msg}&page=${this.query.page}&limit=${this.query.limit}&newest=${this.query.newest}&num=${this.num}`)
        .then((response) => {
          this.hits = response.data.hits.hits;
          this.total = response.data.hits.total;
          this.loading = false;
        },
        ).catch((error) => {
          this.loading = false;
          this.$alert(error.response.data.message, 'oops,出错了', {
            confirmButtonText: '确定',
          });
        });
    },
    onSubmit() {
      this.query.page = 1;
      this.fetch();
    },
    handleSizeChange(val) {
      this.query.limit = val;
      this.fetch();
    },
    handleCurrentChange(val) {
      this.query.page = val;
      this.fetch();
    },
  },
  filters: {
    timestampFilter(timestamp) {
      const d = new Date(0);
      d.setUTCSeconds(timestamp);
      return d.format('yyyy年MM月dd日');
    },
  },
};

</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
