import request from "@/utils/request";

export const reqLogin = async (loginForm) => {
  const res = await request({
    method: "POST",
    // url: "http://ihrm-java.itheima.net/api/sys/login",
    url: "/sys/login",
    data: loginForm,
  });
  // console.log(res);
  return res;
};
