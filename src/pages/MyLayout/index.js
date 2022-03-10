import {
  CopyOutlined,
  EditOutlined,
  LoginOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import imgSrc from "assets/logo.png";
import styles from "./index.module.scss";

const { Header, Sider, Content } = Layout;

export default function MyLayout() {
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
          <span>黑马先锋</span>
          <Button
            type="text"
            color="#fff"
            style={{ color: "#fff" }}
            icon={<LoginOutlined />}
          >
            退出
          </Button>
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
            {/* 1. MenuItem改造key为路径名称 */}
            <Menu.Item key="/home" icon={<PieChartOutlined />}>
              数据概览
            </Menu.Item>
            <Menu.Item key="/list" icon={<CopyOutlined />}>
              内容管理
            </Menu.Item>
            <Menu.Item key="/publish" icon={<EditOutlined />}>
              发布文章
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          {/* <Switch>
              <Redirect from="/" to="/home" exact></Redirect>
              <Route path="/home" component={Home}></Route>
              
            </Switch> */}
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
