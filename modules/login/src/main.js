import { h, createApp } from "vue";
import singleSpaVue from "single-spa-vue";

import App from "./App.vue";
import router from "./router";

/*const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App, {
        // single-spa props are available on the "this" object. Forward them to your component as needed.
        // https://single-spa.js.org/docs/building-applications#lifecycle-props
        // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
        /!*
        name: this.name,
        mountParcel: this.mountParcel,
        singleSpa: this.singleSpa,
        *!/
      });
    },
  },
});*/

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render: () => h(App),
    router, // Add router to the Single-SPA lifecycle
  },
  handleInstance(app) {
    app.use(router);
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
