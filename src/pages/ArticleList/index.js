import {
  Breadcrumb,
  Button,
  Card,
  DatePicker,
  Form,
  Radio,
  Select,
} from "antd";
import { getChannelsAPI } from "api/channels";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Article() {
  const [channelList, setChannelList] = useState([]);
  const getChannelList = async () => {
    const res = await getChannelsAPI();
    setChannelList(res.data.channels);
  };
  useEffect(() => {
    getChannelList();
  }, []);
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
    </div>
  );
}
