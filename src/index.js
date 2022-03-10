import { ConfigProvider } from "antd";
import "antd/dist/antd.css";
import locale from "antd/lib/locale/zh_CN";
import "moment/locale/zh-cn";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <ConfigProvider locale={locale}>
    <App />
  </ConfigProvider>,
  document.getElementById("root")
);
