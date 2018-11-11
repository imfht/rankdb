<template>
  <div>
    <div style="background: aliceblue; min-height:60px">
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
            <h1>IPv6网络资源检索</h1>
    </el-header>
    <div>
      <el-form :inline="true" :model="SearchForm" style="width: 100%">
        <el-form-item>
          <el-input v-model="SearchForm.keyword" style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-model="SearchForm.keyword">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <footer>
      ©️上海交通大学网络信息中心
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Query',
  data() {
    this.SearchForm = {};
    return {};
  },
};
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
