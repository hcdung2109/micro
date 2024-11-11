import token from "./token";
import moment from "moment/dist/moment";
var AuthPlugin = {
  data: {
    MENU_KEY: "VNPT-Menu",
    CLIENT_KEY: "VNPT-Client",
  },
  authenticate: function (stringToken) {
    this.setToken(stringToken);
  },
  isAuthenticated: function () {
    return token.getTokenFromStorage() != null;
  },
  destroy: function () {
    token.destroy();
    localStorage.clear();
    // sessionStorage.clear();
  },
  setToken: function (stringToken) {
    token.setToken(stringToken);
  },
  getToken: function () {
    return token.getToken();
  },
  getClaims: function () {
    return token.getClaims();
  },
  getProperty: function (name) {
    return token.getProperty(name);
  },
  getMaTinh: function () {
    return token.getMaTinh();
  },
  getPhanVungID: function () {
    return token.getPhanVungID();
  },
  getNgayCapNhat: function () {
    // tạm thời
    //return moment().subtract(3,'d').format('DD/MM/YYYY');
    return moment().format("DD/MM/YYYY");
  },
  getUserName: function () {
    return token.getUserName();
  },
  getUserNameCCBS: function () {
    return token.getUserNameCCBS();
  },
  getFullName: function () {
    return token.getFullName();
  },
  getNhanVienID: function () {
    return token.getNhanVienID();
  },
  getMaNhanVien: function () {
    return token.getMaNhanVien();
  },
  getDonViID: function () {
    return token.getDonViID();
  },
  getDonViDuLieuID: function () {
    return token.getDonViDuLieuID();
  },
  getIdDonViCCBS: function () {
    return token.getIdDonViCCBS();
  },
  getNguoiDungID: function () {
    return token.getNguoiDungID();
  },
  getMaCCBS: function () {
    return token.getMaCCBS();
  },
  getIP: function () {
    return token.getIP();
  },
  getCssSch: function () {
    return token.getCssSch();
  },
  getMachine: function () {
    return token.getMachine();
  },
  getThuocTinhTheoNguoiDung: function () {
    return token.getThuocTinhTheoNguoiDung();
  },
  getThongTinNguoiDung: function () {
    return token.getThongTinNguoiDung();
  },
  getMenuFromStorage: function () {
    if (localStorage.hasOwnProperty(this.data.MENU_KEY))
      return JSON.parse(localStorage.getItem(this.data.MENU_KEY));
    else return null;
  },
  saveMenuToStorage: function (menuString) {
    try {
      localStorage.removeItem(this.data.MENU_KEY);
      localStorage.setItem(this.data.MENU_KEY, JSON.stringify(menuString));
      return true;
    } catch (error) {
      return false;
    }
  },
  // saveMenuToStorage: function (menuString) {
  //   try {
  //     localStorage.removeItem(this.data.MENU_KEY)
  //     let m = []
  //     let modules = this.getModules(menuString)
  //     modules.forEach((module) => {
  //       let r = this.getMenuSorted(module, null, menuString)
  //       for (let i = 0; i < r.length; i++) {
  //         m.push(r[i])
  //       }
  //     })
  //     localStorage.setItem(this.data.MENU_KEY, JSON.stringify(m))
  //     return true
  //   } catch (error) {
  //     return false
  //   }
  // },
  getModules: function (listItems) {
    let rs = [];
    let items = listItems
      .filter((f) => {
        return f.p_id == null;
      })
      .sort((a, b) => {
        if (a.stt < b.stt) return -1;
        else return 1;
      });
    for (let i = 0; i < items.length; i++) {
      const module = items[i].modul;
      if (!rs.includes(module)) rs.push(module);
    }
    return rs;
  },
  getMenuSorted: function (module, parentItem, listItems) {
    let rs = [];
    let items = listItems
      .filter((f) => {
        if (parentItem == null) return f.modul == module && f.p_id == null;
        else return f.p_id == parentItem.id;
      })
      .sort((a, b) => {
        if (a.stt < b.stt) return -1;
        else return 1;
      });
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      rs.push(item);
      let childs = this.getMenuSorted(module, item, listItems);
      for (let j = 0; j < childs.length; j++) {
        const child = childs[j];
        rs.push(child);
      }
    }
    return rs;
  },
  saveClientInfoToStorage: function (clientInfo) {
    try {
      localStorage.removeItem(this.data.CLIENT_KEY);
      localStorage.setItem(this.data.CLIENT_KEY, JSON.stringify(clientInfo));
      return true;
    } catch (error) {
      return false;
    }
  },
  getClientInfoFromStorage: function () {
    if (localStorage.hasOwnProperty(this.data.CLIENT_KEY))
      return JSON.parse(localStorage.getItem(this.data.CLIENT_KEY));
    else return null;
  },
  getClientInfoProperty: function (name) {
    var obj = this.getClientInfoFromStorage();
    if (obj !== null) {
      return obj[name];
    } else {
      return null;
    }
  },
};

export default {
  install: function (app) {
    app.config.globalProperties.$auth = AuthPlugin;
  },
};

export { AuthPlugin };
