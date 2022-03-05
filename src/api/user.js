import request from "../utils/request";

export const loginAPI = (mobile, code) => {
  return request({
    method: "POST",
    url: "/v1_0/authorizations",
    data: {
      mobile,
      code,
    },
  });
};
