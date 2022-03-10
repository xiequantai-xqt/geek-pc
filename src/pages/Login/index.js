import { Button, Card, Checkbox, Form, Input, message } from "antd";
import logo from "assets/logo.png";
import { setToken } from "components/local";
import { loginAPI } from "../../api/user";
import styles from "./index.module.scss";
export default function Login(props) {
  const onFinish = async (values) => {
    const { mobile, code } = values;
    try {
      const res = await loginAPI(mobile, code);
      // 存储token
      setToken(res.data.token);
      // 跳转到首页
      props.history.push("/");
      message.success("登录成功");
    } catch (err) {
      if (err.response) {
        message.error(err.response.data.message, 1);
      }
    }
  };
  return (
    <div className={styles.login}>
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 表单 */}
        <Form
          size="large"
          validateTrigger={["onChange", "onBlur"]}
          onFinish={onFinish}
          initialValues={{
            agree: true,
            mobile: "13911111111",
            code: "246810",
          }}
        >
          <Form.Item
            name="mobile"
            rules={[
              { required: true, message: "手机号码不能为空" },
              { pattern: /^1[3-9]\d{9}$/, message: "手机号码格式错误" },
            ]}
          >
            <Input placeholder="请输入手机号码" />
          </Form.Item>

          <Form.Item
            name="code"
            rules={[
              { required: true, message: "验证码不能为空" },
              { pattern: /^\d{6}$/, message: "验证码格式错误" },
            ]}
          >
            <Input placeholder="请输入验证码" />
          </Form.Item>

          <Form.Item
            name="agree"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value === true
                    ? Promise.resolve()
                    : Promise.reject("请阅读并同意用户协议"),
              },
            ]}
          >
            <Checkbox>我已阅读并同意[隐私条款]和[用户协议]</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
