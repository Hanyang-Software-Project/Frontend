/*!

 =========================================================
 * Vue zigg Dashboard - v1.0.1
 =========================================================

 * Product Page: http://www.creative-tim.com/product/zigg-dashboard
 * Copyright 2023 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/zigg-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from "vue";
import App from "./App";
import router from "./router/index";

import ziggDashboard from "./plugins/ziggDashboard";
import "vue-notifyjs/themes/default.css";
import "./assets/css/loginSignin.css";


router.beforeEach(async (to, from, next) => {
  if(to.meta.requiresDeviceCookie && !Vue.getCookie('recordDeviceId')){
    next({name: 'devices'})
    close()
    return;
  }
  if(!to.meta.requiresAuth){
    next()
    return
  }
  const token = localStorage.getItem('authToken');
  if(!token){
    next({name: 'loginPage'});
    return
  }

  try{
    const jsonRes = await Vue.reqFetch(
      'GET',
      'http://3.24.110.71:8080/secure-endpoint',
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    );

    if(jsonRes.message !== 'OK'){
      localStorage.setItem('authToken', '');
      localStorage.setItem('userId', '');
      localStorage.setItem('userRole', '');
      next({name: 'loginPage'});
    }
    else{
      localStorage.setItem('userId', jsonRes.uid);
      localStorage.setItem('userRole', jsonRes.role);
      next()
    }
  } catch (e){
    console.log(e)
    localStorage.setItem('authToken', '');
    localStorage.setItem('userId', '');
    localStorage.setItem('userRole', '');
  }
});

Vue.use(ziggDashboard);

/* eslint-disable no-new */
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
