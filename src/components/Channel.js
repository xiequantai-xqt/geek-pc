import { Select } from "antd";
import { getChannels } from "api/channel";
import { Component } from "react";

const { Option } = Select;

class Channel extends Component {
  state = {
    channels: [],
  };

  componentDidMount() {
    this.getChannles();
  }

  // 获取频道列表数据的方法
  async getChannles() {
    const res = await getChannels();
    this.setState({
      channels: res.data.channels,
    });
  }

  render() {
    const { channels } = this.state;

    return (
      <Select placeholder="请选择文章频道">
        {channels.map((item) => (
          <Option key={item.id} value={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
    );
  }
}

export default Channel;
