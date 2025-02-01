import { Col, Form, message, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import PageTitle from "../../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../../redux/alertSlice";
import { addNewJobPost, editJobDetails, getJobById } from "../../apis/jobs";
import { useEffect, useState } from "react";

function NewEditJob() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [jobData, setJobData] = useState(null);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;

      if (params.id) {
        response = await editJobDetails({
          id: params.id,
          ...values,
        });
      } else {
        response = await addNewJobPost(values);
      }
      if (response.success) {
        message.success(response.message);
        navigate("/posted-jobs");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const getData = async () => {
    try {
      const response = await getJobById(params.id);

      dispatch(HideLoading());
      if (response.success) {
        setJobData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (params.id) {
      getData();
    } else {
      setJobData({});
    }
  }, []);

  return (
    <div>
      <PageTitle title={params.id ? "Edit Job" : "Add New Job Post"} />
      {jobData && (
        <Form onFinish={onFinish} initialValues={jobData} layout="vertical">
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "required" }]}
              >
                <input type="text" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Industry"
                name="industry"
                rules={[{ required: true, message: "required" }]}
              >
                <select>
                  <option value="">Select</option>
                  <option value="it">IT</option>
                  <option value="finance">Finance</option>
                  <option value="marketing">Marketing</option>
                  <option value="realestate">Real Estate</option>
                </select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Location"
                name="location"
                rules={[{ required: true, message: "required" }]}
              >
                <select>
                  <option value="">Select</option>
                  <option value="bulgaria">Bulgaria</option>
                  <option value="usa">USA</option>
                  <option value="uk">UK</option>
                </select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Compnay Name"
                name="companyName"
                rules={[{ required: true, message: "required" }]}
              >
                <input type="text" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Salary"
                name="salary"
                rules={[{ required: true, message: "required" }]}
              >
                <input type="text" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Job Type"
                name="jobType"
                rules={[{ required: true, message: "required" }]}
              >
                <select>
                  <option value="">Select</option>
                  <option value="fulltime">Full Time</option>
                  <option value="parttime">Part Time</option>
                  <option value="remote">Remote</option>
                </select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Last Date To Apply"
                name="lastDayToApply"
                rules={[{ required: true, message: "required" }]}
              >
                <input type="date" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Experience"
                name="expeience"
                rules={[{ required: true, message: "required" }]}
              >
                <input type="text" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Notice Period"
                name="noticePeriod"
                rules={[{ required: true, message: "required" }]}
              >
                <input type="text" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Job Description"
                name="jobDescription"
                rules={[{ required: true, message: "required" }]}
              >
                <textarea type="text" />
              </Form.Item>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2">
            <button
              onClick={() => navigate("/posted-jobs")}
              className="primary-outline-btn"
            >
              Cancel
            </button>
            <button type="submit" className="primary-contained-btn">
              Save
            </button>
          </div>
        </Form>
      )}
    </div>
  );
}

export default NewEditJob;
