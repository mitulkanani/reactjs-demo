import React from 'react';
import { Form, Col, Row, Input, Select, Button, Upload, Icon } from 'antd';
import { connect } from "react-redux";
import { compose } from "redux";
import authActions from "../redux/auth/actions";

const { Option } = Select;

const { addProject } = authActions;


const AddProject = (props) => {

  const { getFieldDecorator } = props.form;

  const { token, loader } = props.auth;

  console.log(token)

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleFileUpload = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        let formData = new FormData();
        formData.append('attachment', values.attachment[0].originFileObj);
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('tags', values.tags);
        formData.append('type', values.type);
        props.addProject(formData, token);
        props.form.resetFields();
      }
    });
  };


  return (
    <Form onSubmit={handleSubmit} layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item>
            {getFieldDecorator("title", {
              rules: [
                { required: true, message: "Please input title!" }
              ]
            })(
              <Input
                type="text"
                placeholder="Title"
              />
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            {getFieldDecorator("description", {
              rules: [
                { required: true, message: "Please input description!" }
              ]
            })(
              <Input
                type="text"
                placeholder="Description"
              />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item>
            {getFieldDecorator("tags", {
              rules: [
                { required: true, message: "Please input tags!" }
              ]
            })(
              <Input
                type="text"
                placeholder="Tags"
              />
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            {getFieldDecorator("type", {
              rules: [
                { required: true, message: "Please select project type!" }
              ]
            })(
              <Select
                style={{ width: 200 }}
                placeholder="Select a project"
                optionFilterProp="children">
                <Option value="0">One Time</Option>
                <Option value="1">Hourly</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item>
            {getFieldDecorator("attachment", {
              valuePropName: 'fileList',
              getValueFromEvent: handleFileUpload,
              rules: [
                { required: true, message: "Please select attachment!" }
              ]
            })(
              <Upload name="attachment" customRequest={dummyRequest} listType="picture">
                <Button>
                  <Icon type="upload" /> Click Here to Upload Attachment
                </Button>
              </Upload>
            )}
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={loader}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

const ProjectForm = Form.create({ name: "AddProject" })(AddProject);

const mapStateToProps = state => {
  return {
    auth: {
      loader: state.auth.loader,
      token: state.auth.token
    }
  };
};


export default compose(connect(mapStateToProps, { addProject }))(ProjectForm);