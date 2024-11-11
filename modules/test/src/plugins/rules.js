import { toNumber } from "lodash";
import moment from "moment";

const rules = {
  required: (val) =>
    (val !== undefined && val !== null && val !== "") || "Không được để trống",
  requiredDate: (val) =>
    moment(val, "DD/MM/YYYY").isValid() || "Không được bỏ trống",
  isNumber: (val) => !isNaN(toNumber(val)) || "Không đúng định dạng",
  isDateMoreThan: (date) => (val) => {
    if (date == null || date === "") return true;
    if (val == null || val === "") return true;
    return (
      moment(val, "DD/MM/YYYY").diff(moment(date, "DD/MM/YYYY"), "days") >= 0 ||
      `Ngày chọn phải lớn hơn hoặc bằng ngày ${date}`
    );
  },
  isDateLessThan: (date) => (val) => {
    if (date == null || date === "") return true;
    if (val == null || val === "") return true;
    return (
      moment(val, "DD/MM/YYYY").diff(moment(date, "DD/MM/YYYY"), "days") <= 0 ||
      `Ngày chọn phải nhỏ hơn hoặc bằng ngày ${date}`
    );
  },

  minValue: (min) => (val) =>
    (val !== undefined && val !== null && val !== "" && val >= min) ||
    "Không được để trống",
};
export default {
  install: (app, options) => {
    // inject a globally available $translate() method
    app.config.globalProperties.$rules = rules;
  },
};
export { rules };
