import request from "utils/request";
export function getChannelsAPI() {
  return request({
    url: "/v1_0/channels",
  });
}
