import request from "@/utils/request";

export const reqLogin = (loginForm) => {
  return request({
    method: "POST",
    // url: "http://ihrm-java.itheima.net/api/sys/login",
    url: "/sys/login",
    data: loginForm,
  });
};

export const reqGetProfile = () => {
  return request({
    method: "POST",
    url: "/sys/profile",
  });
};
