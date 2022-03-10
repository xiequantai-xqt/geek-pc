import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Card,
  DatePicker,
  Form,
  Radio,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { getArticleListAPI } from "api/article";
import { getChannelsAPI } from "api/channels";
import NotFound from "assets/error.png";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Article() {
  const [channelList, setChannelList] = useState([]);
  const [articleInfo, setArticleInfo] = useState([]);
  const articleStatus = [
    { id: -1, name: "全部", color: "magenta" },
    { id: 0, name: "草稿", color: "orange" },
    { id: 1, name: "待审核", color: "red" },
    { id: 2, name: "审核通过", color: "green" },
    { id: 3, name: "审核失败", color: "cyan" },
  ];
  const articleRef = useRef({});
  const getChannelList = async () => {
    const res = await getChannelsAPI();
    setChannelList(res.data.channels);
  };
  const getArticleList = async (articleInfoParam) => {
    const res = await getArticleListAPI(articleInfoParam);
    setArticleInfo(res.data);
  };
  useEffect(() => {
    getChannelList();
    getArticleList(articleRef.current);
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
      render: (val) => {
        const currentItem = articleStatus.find((v) => val === v.id);
        return <Tag color={currentItem.color}>{currentItem.name}</Tag>;
      },
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
      key: "action",
      render: (value, record, index) => {
        return (
          <Space>
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        );
      },
    },
  ];
  // 第几页、每页有多少项
  const handlePageChange = (page, per_page) => {
    articleRef.current = { page, per_page };
    getArticleList(articleRef.current);
  };
  const onSubmitForm = (values) => {
    const formData = { ...values };
    if (values.status === -1) {
      delete formData.status;
    }
    if (values.date) {
      const startTime = values.date[0]
        .startOf("day")
        .format("YYYY-MM-DD HH:mm:ss");
      const endTime = values.date[1].endOf("day").format("YYYY-MM-DD HH:mm:ss");
      formData.begin_pubdate = startTime;
      formData.end_pubdate = endTime;
    }
    delete formData.date;
    formData.page = 1;
    formData.per_page = 10;
    articleRef.current = formData;
    console.log(articleRef.current);
    getArticleList(articleRef.current);
  };
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
        <Form
          initialValues={{ status: -1, channel_id: 0 }}
          onFinish={onSubmitForm}
        >
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

          <Form.Item label="日期" name="date">
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
      <Table
        dataSource={articleInfo.results}
        columns={columns}
        rowKey="id"
        pagination={{
          onChange: handlePageChange,
          position: ["bottomCenter "],
          pageSize: articleInfo.perPage,
          total: articleInfo.total_count,
          current: articleRef.current.page || 1,
        }}
      />
    </div>
  );
}
