import request from "utils/request";
// 获取文章列表
export const getArticleListAPI = (params) => {
  return request({
    url: "/v1_0/mp/articles",
    params,
  });
};
// 删除文章
export const delArticleAPI = (id) => {
  return request({
    url: `/v1_0/mp/articles/${id}`,
    method: "DELETE",
  });
};
