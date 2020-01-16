import Loadable from 'react-loadable';
var createBrowserHistory=require("history").createBrowserHistory;
// import NotFound from '@/pages/Exception/404';
import React from 'react';

const login = Loadable({loader: () => import('@/pages/login'), loading: () => <div>loading</div>});

export const history = createBrowserHistory();

export const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/login',
    layout:login,
    component:login
  },
  // {
  //   path:'/home',
  //   redirect:'/home/dashboard',
  //   children:[{
  //     path:'/dashboard',
  //     layout:BasicLayout,
  //     component:Home
  //   }]
  // },
  // {
  //   path:'*',
  //   component:NotFound
  // }
]