<template>
  <div>
    <Headers></Headers>
    <div class="mydiv">
      <pre>{{data}}</pre>
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
  name: 'About',
  deactivated() {
  },
  created() {
    this.init();
  },
  data() {
    return {
      data:"欢迎来到本站点，balabala~~~~!"
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
      return 0;
    },
    toHash(hash) {
      window.location.hash = hash;
    },
    init() {
      this.axios.get('/p/about')
        .then((resp) => {
          this.data = resp.data['data'];
        },
        )
        .catch((error) => {
          this.loading = false;
          // eslint-disable-next-line
            console.log(error);
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
