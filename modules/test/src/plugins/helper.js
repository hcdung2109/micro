const helper = {
  decodeHtml: (text) =>
    new DOMParser().parseFromString(text, "text/html").documentElement
      .textContent,
};
export default {
  install: (app, options) => {
    // inject a globally available $translate() method
    app.config.globalProperties.$helper = helper;
  },
};
export { helper };
