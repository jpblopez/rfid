import Vue from "vue";
import VueSocketIO from "vue-socket.io";

import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://localhost:3000"
  })
);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
