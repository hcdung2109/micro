import { DialogUtility } from "@syncfusion/ej2-vue-popups";
// Use this as a plugin to register instance and injected toasts
export default function provideAppConfirm(app, options) {
  app.config.globalProperties.$confirm = (title, content) => {
    return new Promise((resolve, _) => {
      let dialogObj = DialogUtility.confirm({
        title: title,
        content: `<div style="padding: 20px !important; font-size: 14px !important">${content}</div>`,
        position: { X: "center", Y: "center" },
        okButton: {
          text: "Đồng ý",
          click: () => {
            dialogObj.hide();
            resolve(1);
          },
        },
        cancelButton: {
          text: "Hủy",
          click: () => {
            dialogObj.hide();
            resolve(0);
          },
        },
      });
    });
  };
  app.config.globalProperties.msgBoxConfirm = (
    title,
    content,
    okButton,
    cancelButton
  ) => {
    return new Promise((resolve, _) => {
      let dialogObj = DialogUtility.confirm({
        title: title,
        content: `<div style="padding: 20px !important; font-size: 14px !important">${content}</div>`,
        position: { X: "center", Y: "top" },
        showCloseIcon: true,
        closeOnEscape: true,
        okButton: {
          icon: "e-icons e-check",
          text: okButton ? okButton : "Đồng ý",
          click: () => {
            dialogObj.hide();
            resolve(1);
          },
        },
        cancelButton: {
          icon: "e-icons e-close",
          text: cancelButton ? cancelButton : "Hủy",
          click: () => {
            dialogObj.hide();
            resolve(0);
          },
        },
      });
    });
  };
}
