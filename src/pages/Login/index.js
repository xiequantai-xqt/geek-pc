import { Button, Card, Checkbox, Form, Input } from "antd";
import logo from "../../assets/logo.png";
import "./index.css";
export default function Login() {
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 表单 */}
        <Form size="large">
          <Form.Item name="mobile">
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item name="code">
            <Input placeholder="请输入验证码" />
          </Form.Item>

          <Form.Item name="agree" valuePropName="checked">
            <Checkbox>我已阅读并同意[用户协议]和[隐私条款]</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
