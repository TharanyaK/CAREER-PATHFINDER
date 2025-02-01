import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/alertSlice";
import {
  getPostedJobsByUserId,
  deleteJobById,
  getApplicationsByJobId,
} from "../../apis/jobs";
import { message, Table } from "antd";
import AppliedCandidates from "./AppliedCandidates";

function PostedJobs() {
  const [data, setData] = useState([]);
  const [showAppliedCandidates, setShowAppliedCandidates] = useState(false);
  const [appliedCandidates, setAppliedCandidates] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await getPostedJobsByUserId(user.id);
      dispatch(HideLoading());
      if (response.success) {
        setData(response.data);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteJob = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await deleteJobById(id);
      dispatch(HideLoading());
      if (response.success) {
        setData(response.data);
        getData();
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const getAppliedCadidates = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await getApplicationsByJobId(id);
      dispatch(HideLoading());
      if (response.success) {
        setAppliedCandidates(response.data);
        if (!showAppliedCandidates) {
          setShowAppliedCandidates(true);
        }
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Company",
      dataIndex: "companyName",
    },
    {
      title: "Posted On",
      dataIndex: "posterOn",
    },
    {
      title: "Last Date To Apply",
      dataIndex: "lastDayToApply",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="d-flex gap-3 align-items-center">
          <span
            className="underline"
            onClick={() => getAppliedCadidates(record.id)}
          >
            candidates
          </span>
          <i
            className="ri-delete-bin-line"
            onClick={() => deleteJob(record.id)}
          ></i>
          <i
            className="ri-pencil-line"
            onClick={() => navigate(`/posted-jobs/edit/${record.id}`)}
          ></i>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <PageTitle title="Posted Jobs" />
        <button
          className="primary-outline-btn"
          onClick={() => navigate("/posted-jobs/new")}
        >
          NEW JOB
        </button>
      </div>
      <Table columns={columns} dataSource={data} />

      {showAppliedCandidates && (
        <AppliedCandidates
          showAppliedCandidates={showAppliedCandidates}
          setShowAppliedCandidates={setShowAppliedCandidates}
          appliedCandidates={appliedCandidates}
          reloadData={getAppliedCadidates}
        />
      )}
    </div>
  );
}

export default PostedJobs;
