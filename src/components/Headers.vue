<template>
    <div style="background: aliceblue; min-height:60px" >
      <nav style=" padding-top: 20px">
        <router-link to="/" style="margin-right: 20px">
        <a style="font-size: large;"> 分区排名</a>
      </router-link>
        |
      <router-link to="/index" style="margin-right: 20px;margin-left: 20px">
        <a style="font-size: large;"> 历史趋势</a>
      </router-link>
        |
        <router-link to="/query" style="margin-left: 20px">
        <a style="font-size: large;"> 资源检索</a>
      </router-link>
        </router-link>
        |
        <router-link to="/about" style="margin-left: 20px">
        <a style="font-size: large;"> 关于本站</a>
      </router-link>
      </nav>
    </div>
</template>

<script>
export default {
  name: 'Headers',
};
</script>

<style scoped>

</style>
