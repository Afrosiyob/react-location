import React, { useState } from "react";

import { Button, Checkbox, Col, Form, Input, Row } from "antd";

import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./Auth.scss";
import { useMutation } from "react-query";
import { loginApi } from "../../service/api.service";
import { useNavigate } from "react-location";

const Auth = () => {

  const [ loading, setLoading ] = useState( false )
  const navigate = useNavigate()


  const { mutate } = useMutation( loginApi, {
    onMutate: ( variables ) => {
      setLoading( true )
      // A mutation is about to happen!

      // Optionally return a context containing data to use when for example rolling back
      return { id: 1 };
    },
    onError: ( error, variables, context ) => {
      // An error happened!
      setLoading( false )
    },
    onSuccess: ( data, variables, context ) => {
      // Boom baby!
      console.log( data );
      const { data: { accessToken, refreshToken } } = data
      localStorage.setItem( "accessToken", accessToken )
      localStorage.setItem( "refreshToken", refreshToken )
      setLoading( false );
      navigate( { to: '/admin' } )
    },
    onSettled: ( data, error, variables, context ) => {
      // Error or success... doesn't matter!
    },
  } );

  const onFinish = ( values ) => {
    console.log( values );
    mutate( values );
  };

  const onFinishFailed = ( errorInfo ) => {
    console.log( "Failed:", errorInfo );
  };

  return (
    <Row className="auth-login-box">
      <Col xs={ 0 } sm={ 0 } md={ 12 } lg={ 16 } className="auth-login-left-box" />
      <Col xs={ 24 } sm={ 24 } md={ 12 } lg={ 8 }>
        <Row justify="center" align="middle" className="auth-login-right-box">
          <Col xs={ 20 } sm={ 20 } md={ 18 } lg={ 16 }>
            <h1>Welcome to React Admin! </h1>
            <p>Please sign-in to your account and start the adventure</p>

            <Form
              layout="vertical"
              name="basic"
              initialValues={ {
                email: "",
                password: "",
              } }
              onFinish={ onFinish }
              onFinishFailed={ onFinishFailed }
            >
              <Form.Item
                label="Email"
                name="email"
                hasFeedback
                rules={ [
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ] }
              >
                <Input prefix={ <UserOutlined /> } />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                hasFeedback
                rules={ [
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ] }
              >
                <Input.Password prefix={ <LockOutlined /> } />
              </Form.Item>
              <Form.Item
                name="remember"
                style={ { color: "red" } }
                valuePropName="checked"
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button
                  style={ {
                    borderRadius: "6px",
                  } }
                  type="primary"
                  size="large"
                  className="submit-btn"
                  htmlType="submit"
                  loading={ loading }
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Auth;
