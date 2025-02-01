import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alertSlice";
import { message, Table } from "antd";
import { getAllUsers, updateUserProfile } from "../apis/users";

function AllUsers() {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllUsers();
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

  const changeStatus = async (id, status) => {
    try {
      dispatch(ShowLoading());

      const response = await updateUserProfile({ id, status });
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
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "User Id",
      dataIndex: "id",
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
          {record.status === "approved" && (
            <span
              className="underline"
              onClick={() => changeStatus(record.id, "rejected")}
            >
              Reject
            </span>
          )}
          {(record.status === "pending" || record.status === "rejected") && (
            <span
              className="underline"
              onClick={() => changeStatus(record.id, "approved")}
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
        <PageTitle title="All Users" />
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default AllUsers;
