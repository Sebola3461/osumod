import React, { Component } from "react";
import "../../utilities.css";
import "./List.css";

// data from "../../content/home-en";
import { Layout, Button, InputNumber, Form, Select, Switch, message, Typography } from "antd";
import { get, post } from "../../utilities";
import { navigate } from "@reach/router";
const { Content } = Layout;
const { Paragraph } = Typography;

const HELP_URL = "https://github.com/cory2067/osumod/blob/master/README.md";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.state = { reqs: [], editing: null };
  }

  componentDidMount() {
    get("/api/settings", { owner: this.props.owner }).then((settings) => {
      if (!settings) navigate("/404");
      this.setState({ settings });
    });
  }

  onFinish = async (form) => {
    try {
      await post("/api/settings", { settings: form });
      message.success("Updated settings");
    } catch (e) {
      console.log(e);
      message.success("Failed to update settings");
    }
  };

  render() {
    const reqLink = `${window.location.protocol}//${window.location.host}/${
      window.location.pathname.split("/")[1]
    }/request`;

    return (
      <Content className="content">
        {this.state.settings && (
          <div style={{ maxWidth: 500 }}>
            <Paragraph>
              <a href={HELP_URL} target="_blank">
                Click here
              </a>{" "}
              for instructions on how to use your queue.
            </Paragraph>
            <Paragraph>
              Mappers can request you at: <a href={reqLink}>{reqLink}</a>
            </Paragraph>
            <Form initialValues={this.state.settings} onFinish={this.onFinish}>
              <Form.Item label="Open" name="open" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Form.Item label="Accept M4M requests" name="m4m" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Form.Item label="Max pending requests before auto-close" name="maxPending">
                <InputNumber />
              </Form.Item>
              <Form.Item label="Cooldown between requests (days)" name="cooldown">
                <InputNumber />
              </Form.Item>
              <Form.Item label="Modder Type" name="modderType">
                <Select>
                  <Select.Option value="full">Full BN</Select.Option>
                  <Select.Option value="probation">Probationary BN</Select.Option>
                  <Select.Option value="modder">Regular Modder</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Gamemodes" name="modes">
                <Select mode="multiple">
                  <Select.Option value="Standard">Standard</Select.Option>
                  <Select.Option value="Taiko">Taiko</Select.Option>
                  <Select.Option value="Catch the Beat">Catch</Select.Option>
                  <Select.Option value="Mania">Mania</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Content>
    );
  }
}

export default Settings;
