import VueFlatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/plugins/monthSelect/style.css";
import flatpickr from "flatpickr";
import { Vietnamese } from "flatpickr/dist/l10n/vn.js";
flatpickr.localize(Vietnamese);

export default {
  install(Vue) {
    Vue.use(VueFlatPicker);
  },
};
