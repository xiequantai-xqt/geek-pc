import {
  CopyOutlined,
  EditOutlined,
  LoginOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, message, Popconfirm } from "antd";
import imgSrc from "assets/logo.png";
import Article from "pages/Article";
import Home from "pages/Home";
import Publish from "pages/Publish";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import styles from "./index.module.scss";

const { Header, Sider } = Layout;

export default function MyLayout(props) {
  const onConfirm = () => {
    // 点击了确定
    localStorage.removeItem("geek_pc_token");
    // 跳转到登录页
    props.history.push("/login");
    // 提示消息
    message.success("退出成功");
  };
  return (
    <Layout className={styles.layout}>
      <Header className="header">
        <div className="logo">
          <img
            src={imgSrc}
            alt=""
            width={100}
            height={50}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="profile">
          <Popconfirm
            title="你确定要退出本系统么？"
            okText="确定"
            cancelText="取消"
            onConfirm={onConfirm}
          >
            <span>黑马先锋</span>
            <Button
              type="text"
              color="#fff"
              style={{ color: "#fff" }}
              icon={<LoginOutlined />}
            >
              退出
            </Button>
          </Popconfirm>
        </div>
      </Header>
      <Layout style={{ height: "calc( 100vh - 64px )" }}>
        <Sider width={200} className="site-layout-background">
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["/home"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="/home" icon={<PieChartOutlined />}>
              <Link to="/home">数据概览</Link>
            </Menu.Item>
            <Menu.Item key="/list" icon={<CopyOutlined />}>
              <Link to="/article">内容管理</Link>
            </Menu.Item>
            <Menu.Item key="/publish" icon={<EditOutlined />}>
              <Link to="/publish">发布文章</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Switch>
            <Redirect from="/" to="/home" exact></Redirect>
            <Route path="/home" component={Home}></Route>
            <Route path="/article" component={Article}></Route>
            <Route path="/publish" component={Publish} />
          </Switch>
        </Layout>
      </Layout>
    </Layout>
  );
}
