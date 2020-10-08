import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import "./helpers/validationRules";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

router.beforeEach((to, from, next) => {
  // route guard
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const loggedIn = store.state.isLoggedIn;

  if (requiresAuth && !loggedIn) {
    next({ name: "Login" });
  } else {
    next();
  }
});

const instance = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

store.toast = function(variant, message) {
  instance.$bvToast.toast(message, {
    autoHideDelay: 5000,
    variant: variant
  });
};
