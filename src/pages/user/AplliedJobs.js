import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alertSlice";
import {
  getPostedJobsByUserId,
  deleteJobById,
  getApplicationsByUserId,
} from "../apis/jobs";
import { message, Table } from "antd";

function AppliedJobs() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await getApplicationsByUserId(user.id);
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

  const columns = [
    {
      title: "Job",
      dataIndex: "jobTitle",
    },
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Applied On",
      dataIndex: "appliedOn",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <PageTitle title="Posted Jobs" />
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default AppliedJobs;
