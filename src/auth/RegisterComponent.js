import React from 'react';
import { Form, Icon, Input, Button } from "antd";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import authActions from "../redux/auth/actions";

const { login } = authActions;

const Register = (props) => {
  const { getFieldDecorator } = props.form;
  const {auth} = props;

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.login({ data: { ...values, type: "register" } });
      }
    });
  };

  return(
    <div className="page-container">
      <div className="background-overlay">
        <div className="form-container">
          <div className="an-20 text-center">Log in to your account</div>

            <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
                {getFieldDecorator("name", {
                  rules: [
                    { required: true, message: "Please input your name!" }
                  ]
                })(
                  <Input
                    type="text"
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Name"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("email", {
                  rules: [
                    {
                      type: "email",
                      message: "The input is not valid E-mail!"
                    },
                    { required: true, message: "Please input your email!" }
                  ]
                })(
                  <Input
                    type="email"
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Email"
                  />
                )}
              </Form.Item>
              <Form.Item hasFeedback>
                {getFieldDecorator("password", {
                  rules: [
                    { min: 8, message: "Min password length 8 is required!" },
                    {
                      required: true,
                      message: "Please input your password!"
                    }
                  ]
                })(
                  <Input.Password
                    placeholder="Password"
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                  />
                )}
              </Form.Item>

              <Form.Item>
                <Button
                  loading={auth.loader}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Register
                </Button>
                Or
                <NavLink to="/login">
                  <span className="ml5">Login Now!</span>
                </NavLink>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
  );

}

const mapStateToProps = state => {
  return {
    auth: {
      loader: state.auth.loader
    }
  };
};

const RegisterForm = Form.create({ name: "Register" })(Register);

export default compose(connect(mapStateToProps, {login}))(RegisterForm);