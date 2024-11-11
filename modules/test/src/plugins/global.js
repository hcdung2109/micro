import Vue from "vue";

Vue.component("card", require("../components/card").default);
Vue.component("Progressbar", require("../components/Progressbar").default);
Vue.component("tab-nav", require("../components/tab/tab-nav").default);
Vue.component(
  "tab-nav-items",
  require("../components/tab/tab-nav-items").default
);
Vue.component("tab-content", require("../components/tab/tab-content").default);
Vue.component(
  "tab-content-item",
  require("../components/tab/tab-content-item").default
);
Vue.component("ModeSwitch", require("../components/ModeSwitch").default);
Vue.component("Select2", require("../components/Select2").default);
Vue.component(
  "VueSelectPicker",
  require("../components/VueSelectpicker").default
);
Vue.component("tableList", require("../components/tablelist").default);
