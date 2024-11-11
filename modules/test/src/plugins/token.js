import jwtdecode from "jwt-decode";
import requestContext from "@/utils/RequestContext";
export default {
  data: {
    TOKEN_KEY: "VNPT-Token",
  },
  setToken: function (token) {
    try {
      localStorage.setItem(this.data.TOKEN_KEY, JSON.stringify(token));
      return true;
    } catch (error) {
      return false;
    }
  },
  getTokenFromStorage() {
    return JSON.parse(localStorage.getItem(this.data.TOKEN_KEY));
  },
  getAuthorization: function () {
    let tt = this.getTokenType();
    let tv = this.getToken();
    if (!(tt == null || tv == null)) {
      return tt.charAt(0).toUpperCase() + tt.slice(1) + " " + tv;
    }
    return null;
  },
  getToken: function () {
    try {
      let t = this.getTokenFromStorage();
      return t.access_token;
    } catch (error) {
      return null;
    }
  },
  getTokenType: function () {
    try {
      let t = this.getTokenFromStorage();
      return t.token_type;
    } catch (error) {
      return null;
    }
  },
  getTokenExpired: function () {
    try {
      let t = this.getTokenFromStorage();
      return t.expires_in;
    } catch (error) {
      return null;
    }
  },
  getClaims: function () {
    try {
      var token = this.getToken();
      if (token !== null && token !== "") {
        return jwtdecode(token);
      } else {
        return null;
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  getProperty: function (name) {
    var obj = this.getClaims();
    if (obj !== null) {
      return obj[name];
    } else {
      return null;
    }
  },
  getPhanVungID: function () {
    try {
      var obj = this.getProperty("id_tinhthanh");
      if (obj !== null) {
        return obj;
      } else {
        return -1;
      }
    } catch (error) {
      return -1;
    }
  },
  getUserName: function () {
    try {
      var obj = this.getProperty("user_name");
      if (obj !== null) {
        return obj;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },
  getFullName: function () {
    try {
      var obj = this.getProperty("full_name");
      if (obj !== null) {
        return obj;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },
  getUserNameCCBS: function () {
    try {
      var obj = this.getProperty("ma_nhanvien_ccbs");
      if (obj !== null) {
        return obj;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },
  getNhanVienID: function () {
    try {
      var obj = this.getProperty("id_nhanvien_dhsx");
      if (obj !== null) {
        return obj;
      } else {
        return -1;
      }
    } catch (error) {
      return -1;
    }
  },
  getMaNhanVien: function () {
    try {
      var obj = this.getProperty("ma_nv");
      if (obj !== null) {
        return obj;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },
  getDonViID: function () {
    try {
      var obj = this.getProperty("id_donvi");
      if (obj !== null) {
        return obj;
      } else {
        return -1;
      }
    } catch (error) {
      return -1;
    }
  },
  getCssSch: function () {
    try {
      var obj = this.getProperty("css_sch");
      if (obj !== null) {
        return obj;
      } else {
        return -1;
      }
    } catch (error) {
      return -1;
    }
  },
  getDonViDuLieuID: function () {
    try {
      var obj = this.getProperty("donvi_dl_id");
      if (obj !== null) {
        return obj;
      } else {
        return -1;
      }
    } catch (error) {
      return -1;
    }
  },
  getNguoiDungID: function () {
    try {
      var obj = this.getProperty("nguoidung_id");
      if (obj !== null) {
        return obj;
      } else {
        return -1;
      }
    } catch (error) {
      return -1;
    }
  },
  getIdDonViCCBS: function () {
    try {
      var obj = this.getProperty("id_donvi_ccbs");
      if (obj !== null) {
        return obj;
      } else {
        return -1;
      }
    } catch (error) {
      return -1;
    }
  },
  getMaTinh: function () {
    try {
      var obj = this.getProperty("ma_tinh");
      if (obj !== null) {
        return obj;
      } else {
        return null; // -1
      }
    } catch (error) {
      return null; // -1
    }
  },
  getMaCCBS: function () {
    try {
      var obj = this.getProperty("ma_nhanvien_ccbs");
      if (obj !== null) {
        return obj;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },
  getIP: async function () {
    try {
      if (sessionStorage) {
        var ttip = sessionStorage.getItem("ttip");
        if (ttip && ttip.length > 0) ttip = JSON.parse(ttip);
        if (ttip && ttip.ipCn) return ttip.ipCn;
        else {
          var rs = await requestContext.get("/ccbs-quantri/user/thongtin", {});
          if (rs.data) {
            ttip = rs.data;
            if (ttip && ttip.ipCn) {
              sessionStorage.setItem("ttip", JSON.stringify(ttip));
              return ttip.ipCn;
            }
          }
        }
      }
      return "127.0.0.1";
    } catch (ex) {
      return "127.0.0.1";
    }
  },
  getThongTinNguoiDung: async function () {
    try {
      var ttnd = sessionStorage ? sessionStorage.getItem("ttnd") : null;
      if (ttnd && ttnd.length > 0) return JSON.parse(ttnd);
      else {
        var rs = await requestContext.post(
          "/quantri/user/thongtin_nguoidung2",
          {}
        );
        if (rs.data) {
          ttnd = rs.data;
          if (ttnd) {
            if (sessionStorage)
              sessionStorage.setItem("ttnd", JSON.stringify(ttnd));
            return ttnd;
          }
        }
      }
    } catch (ex) {
      console.error("getThongTinNguoiDung", ex);
      return {};
    }
  },
  getMachine: async function () {
    try {
      if (sessionStorage) {
        var ttip = sessionStorage.getItem("ttip");
        if (ttip && ttip.length > 0) ttip = JSON.parse(ttip);
        if (ttip && ttip.mayCn) return ttip.mayCn;
        else {
          var rs = await requestContext.get("/ccbs-quantri/user/thongtin", {});
          if (rs.data) {
            ttip = rs.data;
            if (ttip && ttip.mayCn) {
              sessionStorage.setItem("ttip", JSON.stringify(ttip));
              return ttip.mayCn;
            }
          }
        }
      }
      return "localhost";
    } catch (ex) {
      return "localhost";
    }
  },
  getThuocTinhTheoNguoiDung: async function () {
    try {
      if (localStorage) {
        var k_tt_nd = localStorage.getItem("k_tt_nd");
        if (k_tt_nd && k_tt_nd.length > 0) k_tt_nd = JSON.parse(k_tt_nd);
        if (k_tt_nd) return k_tt_nd;
        else {
          var rs = await requestContext.post(
            "/ccbs-erp/qtht/layds_thuoctinh_theo_nguoidung",
            {}
          );
          if (rs.data && rs.data.data) {
            k_tt_nd = rs.data.data;
            if (k_tt_nd) {
              localStorage.setItem("k_tt_nd", JSON.stringify(k_tt_nd));
              return k_tt_nd;
            }
          }
        }
      }
      return null;
    } catch (ex) {
      return null;
    }
  },
  destroy: function () {
    try {
      localStorage.removeItem(this.data.TOKEN_KEY);
      localStorage.removeItem("k_tt_nd");
      sessionStorage.removeItem("ttip");
      sessionStorage.removeItem("ttnd");
      return true;
    } catch (error) {
      return false;
    }
  },
};
