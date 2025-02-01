import { message, Modal, Table } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeApplicationStatus } from "../../apis/jobs";
import { ShowLoading, HideLoading } from "../../../redux/alertSlice";

function AppliedCandidates({
  showAppliedCandidates,
  setShowAppliedCandidates,
  appliedCandidates,
  reloadData,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeStatus = async (applicationData, status) => {
    try {
      dispatch(ShowLoading());
      const response = await changeApplicationStatus({
        ...applicationData,
        status,
      });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        reloadData(applicationData.jobId);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "userName",
      render: (text, record) => {
        return (
          <span
            className="underline"
            onClick={() => navigate(`/profile/${record.userId}`)}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div>
            {record.status === "pending" && (
              <>
                <span
                  className="underline"
                  onClick={() => changeStatus(record, "approved")}
                >
                  Approve
                </span>
                <span
                  className="underline mx-2"
                  onClick={() => changeStatus(record, "rejected")}
                >
                  Reject
                </span>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Modal
        title="Applied Candidates"
        visible={showAppliedCandidates}
        onCancel={() => setShowAppliedCandidates(false)}
        footer={null}
        width={1000}
      >
        <Table columns={columns} dataSource={appliedCandidates} rowKey="id" />
      </Modal>
    </div>
  );
}

export default AppliedCandidates;
