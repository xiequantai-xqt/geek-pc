import {
  Breadcrumb,
  Button,
  Card,
  DatePicker,
  Form,
  Radio,
  Select,
  Table,
} from "antd";
import { getArticleListAPI } from "api/article";
import { getChannelsAPI } from "api/channels";
import NotFound from "assets/error.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Article() {
  const [channelList, setChannelList] = useState([]);
  const [articleInfo, setArticleInfo] = useState([]);
  const getChannelList = async () => {
    const res = await getChannelsAPI();
    setChannelList(res.data.channels);
  };
  const getArticleList = async () => {
    const res = await getArticleListAPI();
    setArticleInfo(res.data);
  };
  useEffect(() => {
    getChannelList();
    getArticleList();
  }, []);
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      render: (val) => {
        if (!val.images.length) {
          return <img src={NotFound} alt="" width={100} height={60} />;
        }
        return <img src={val.images[0]} alt="" width={100} height={60} />;
      },
    },
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "状态",
      dataIndex: "status",
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      dataIndex: "",
    },
  ];
  return (
    <div className="root">
      <Card
        title={
          <Breadcrumb separator="/">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>文章列表</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form initialValues={{ status: -1, channel_id: 0 }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择频道" style={{ width: 200 }}>
              {channelList.map((item) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期">
            <DatePicker.RangePicker />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <p>根据筛选条件共查询到{articleInfo.total_count}条结果：</p>
      <Table dataSource={articleInfo.results} columns={columns} rowKey="id" />
    </div>
  );
}
