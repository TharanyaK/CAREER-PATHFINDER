import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import {
  applyJobPost,
  editJobDetails,
  getApplicationsByJobId,
  getJobById,
} from "./apis/jobs";

function JobDescription() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [jobData, setJobData] = useState(null);
  const [showApplyButton, setShowApplyButton] = useState(true);
  const [alredyApllied, setAlreadyApplied] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getJobById(params.id);

      if (response.data.posterByUserId === user.id) {
        setShowApplyButton(false);
      }

      const applicationsResponse = await getApplicationsByJobId(params.id);

      if (
        applicationsResponse.data.filter((item) => item.userId === user.id)
          .length > 0
      ) {
        setShowApplyButton(false);
        setAlreadyApplied(true);
      }

      dispatch(HideLoading());

      if (response.success) {
        const isIdInResponseData = response.data.id;
        if (isIdInResponseData === undefined) {
          await editJobDetails({
            ...response.data,
            id: params.id,
          });
        }
        setJobData({
          ...response.data,
          id: params.id,
        });
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const applyNow = async () => {
    try {
      dispatch(ShowLoading());
      const response = await applyJobPost(jobData);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    jobData && (
      <div>
        <PageTitle title={jobData.title} />
        <Row>
          <Col span={18}>
            <div className="d-flex flex-column gap-1">
              <div className="d-flex justify-content-between mt-1">
                <span>Company</span>
                <span>{jobData.companyName}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Location</span>
                <span>{jobData?.location.toUpperCase()}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Salary</span>
                <span>{jobData.salary}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Experience</span>
                <span>{jobData.expeience} Years</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Notice Period</span>
                <span>{jobData.noticePeriod} Days</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Job Type</span>
                <span>{jobData.jobType}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Industry</span>
                <span>{jobData?.industry.toUpperCase()}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Posted On</span>
                <span>{jobData.posterOn}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Last date to apply</span>
                <span>{jobData.lastDayToApply}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Posted By</span>
                <span>{jobData.posterByUserName}</span>
              </div>
            </div>
            <h5 className="underline uppercase my-3">Job Description</h5>
            <span className="pt-2">{jobData.jobDescription}</span>

            {alredyApllied && (
              <div className="already-applied">
                <span>
                  You already applied for this job. You can view your
                  application status in the applied section
                </span>
              </div>
            )}

            <div className="d-flex gap-2 mt-3 justify-content-end">
              <button
                className="primary-outline-btn"
                onClick={() => navigate("/")}
              >
                CANCEL
              </button>

              {showApplyButton && (
                <button className="primary-contained-btn" onClick={applyNow}>
                  APPLY NOW
                </button>
              )}
            </div>
          </Col>
        </Row>
      </div>
    )
  );
}

export default JobDescription;
