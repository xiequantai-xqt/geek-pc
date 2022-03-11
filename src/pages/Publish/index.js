import { Breadcrumb, Button, Card, Form, Input, Radio, Space } from "antd";
import { Link } from "react-router-dom";

export default function Publish() {
  const changeImageType = () => {};
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div className="ArticleList">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
        >
          <Form.Item label="标题" name="title">
            <Input placeholder="请输入文章标题" />
          </Form.Item>
          <Form.Item label="频道" name="channel_id">
            频道组件
          </Form.Item>
          <Form.Item label="封面" name="type">
            <Radio.Group onChange={changeImageType}>
              <Radio value={0}>无图</Radio>
              <Radio value={1}>单图</Radio>
              <Radio value={3}>三图</Radio>
              {/* <Radio value={-1}>自动</Radio> */}
            </Radio.Group>
          </Form.Item>
          <Form.Item label="内容" name="content">
            文章内容
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 3 }}>图片上传组件</Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                发布文章
              </Button>
              <Button>存入草稿</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
