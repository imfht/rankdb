import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Index from '@/components/Index';
import Query from '@/components/Query';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/index',
      name: '历史趋势',
      component: Index,
    },
    {
      path: '/query',
      name: '资源检索',
      component: Query,
    },
  ],
});
