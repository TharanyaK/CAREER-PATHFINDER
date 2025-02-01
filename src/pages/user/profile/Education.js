import { Form, Row, Col } from "antd";
import React from "react";

function Education() {
  return (
    <>
      <Form.List name="education">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row gutter={[10, 10]} className="align-items-center">
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name={[name, "degree"]}
                    rules={[{ required: true, message: "requierd" }]}
                    label="Degree"
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name={[name, "institution"]}
                    rules={[{ required: true, message: "requierd" }]}
                    label="Institution"
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    {...restField}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name={[name, "percentage"]}
                    rules={[{ required: true, message: "requierd" }]}
                    label="Percentage"
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>
                <i onClick={() => remove(name)} class="ri-delete-bin-line"></i>
              </Row>
            ))}
            <Form.Item>
              <button className="primary-outline-btn" onClick={() => add()}>
                ADD EDUCATION
              </button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.List name="skills">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row gutter={[10, 10]} className="align-items-center">
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name={[name, "technology"]}
                    rules={[{ required: true, message: "requierd" }]}
                    label="Technology"
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name={[name, "rating"]}
                    rules={[{ required: true, message: "requierd" }]}
                    label="Rating"
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>
                <i onClick={() => remove(name)} class="ri-delete-bin-line"></i>
              </Row>
            ))}
            <Form.Item>
              <button className="primary-outline-btn" onClick={() => add()}>
                ADD SKILLS
              </button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
}

export default Education;
