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
        >
          <textarea type="text" rows={4} />
        </Form.Item>
      </Col>
    </Row>
  );
}

export default PersonalInfo;
