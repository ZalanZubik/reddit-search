import Vue from 'vue';
import Router from 'vue-router';
import Results from './components/Results';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home'
    },
    {
      path: '/search/:sort/:time/:limit/:term',
      name: 'results',
      component: Results
    }
  ]
});