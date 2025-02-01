import { Form, Row, Col } from "antd";
import React from "react";

function Experience() {
  return (
    <>
      <Form.List name="experiences">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row gutter={[10, 10]} className="align-items-center">
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name={[name, "company"]}
                    rules={[{ required: true, message: "requierd" }]}
                    label="Company"
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...restField}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name={[name, "designation"]}
                    rules={[{ required: true, message: "requierd" }]}
                    label="Designation"
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    {...restField}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name={[name, "duration"]}
                    rules={[{ required: true, message: "requierd" }]}
                    label="Duration"
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    {...restField}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name={[name, "location"]}
                    rules={[{ required: true, message: "requierd" }]}
                    label="Location"
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>
                <i onClick={() => remove(name)} class="ri-delete-bin-line"></i>
              </Row>
            ))}
            <Form.Item>
              <button className="primary-outline-btn" onClick={() => add()}>
                ADD EXPERIENCE
              </button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.List name="projects">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row gutter={[10, 10]} className="align-items-center">
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name={[name, "title"]}
                    rules={[{ required: true, message: "requierd" }]}
                    label="Tite"
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={10} className="mt-4">
                  <Form.Item
                    {...restField}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name={[name, "description"]}
                    rules={[{ required: true, message: "requierd" }]}
                    label="Description"
                  >
                    <textarea type="text" />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    {...restField}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name={[name, "duration"]}
                    rules={[{ required: true, message: "requierd" }]}
                    label="Duration"
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>
                <i onClick={() => remove(name)} class="ri-delete-bin-line"></i>
              </Row>
            ))}
            <Form.Item>
              <button className="primary-outline-btn" onClick={() => add()}>
                ADD PROJECT
              </button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
}

export default Experience;
