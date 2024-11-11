const loading = {
  show() {
    $(".overlay-common").addClass("show");
  },
  hide() {
    $(".overlay-common").removeClass("show");
  },
};
export default {
  install: (app, options) => {
    // inject a globally available $translate() method
    app.config.globalProperties.$loading = loading;
  },
};
export { loading };
