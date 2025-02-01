import { Form, Row, Col } from "antd";
import React from "react";

function PersonalInfo() {
  return (
    <Row gutter={[10, 10]}>
      <Col span={8}>
        <Form.Item
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <input type="text" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <input type="text" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <input type="text" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          label="Phone Number"
          name="phoneNumber"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <input type="text" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          label="Portfolio"
          name="portfolio"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <input type="text" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          label="Carrier Objective"
          name="carrierObjective"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <textarea type="text" rows={4} />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <textarea type="text" rows={4} />
        </Form.Item>
      </Col>
    </Row>
  );
}

export default PersonalInfo;
