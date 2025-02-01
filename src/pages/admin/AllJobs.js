import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alertSlice";
import {
  changeJobStatusFromAdmin,
  deleteJobById,
  editJobDetails,
} from "../apis/jobs";
import { message, Table } from "antd";
import { getAllJobs } from "../apis/jobs";

function AllJobs() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllJobs();
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

  const changeStatus = async (jobData, status) => {
    try {
      dispatch(ShowLoading());

      const response = await changeJobStatusFromAdmin({
        ...jobData,
        status,
      });
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
        <div className="d-flex gap-2 align-items-center">
          <i
            className="ri-delete-bin-line"
            onClick={() => deleteJob(record.id)}
          ></i>
          {record.status === "approved" && (
            <span
              className="underline"
              onClick={() => changeStatus(record, "rejected")}
            >
              Reject
            </span>
          )}
          {(record.status === "pending" || record.status === "rejected") && (
            <span
              className="underline"
              onClick={() => changeStatus(record, "approved")}
            >
              Approve
            </span>
          )}
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
        <PageTitle title="All Jobs" />
        <button
          className="primary-outline-btn"
          onClick={() => navigate("/posted-jobs/new")}
        >
          NEW JOB
        </button>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default AllJobs;
