import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import { Form, message, Tabs } from "antd";
import PersonalInfo from "./PersonalInfo";
import Education from "./Education";
import Experience from "./Experience";
import { useDispatch } from "react-redux";
import { getUserProfile, updateUserProfile } from "../../apis/users";
import { ShowLoading, HideLoading } from "../../../redux/alertSlice.js";
import { useNavigate, useParams } from "react-router-dom";

const { TabPane } = Tabs;

function Profile() {
  const [userData, setUserdata] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await getUserProfile(params.id);

      dispatch(HideLoading());
      if (response.success) {
        setUserdata(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const onFinish = async (values) => {
    const clearValues = {};
    Object.entries(values).map((item) => {
      if (item[1] === undefined) {
        item[1] = "";
      }
      clearValues[item[0]] = item[1];
    });
    try {
      dispatch(ShowLoading());
      const response = await updateUserProfile(clearValues);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div>
      <PageTitle title="Profile" />
      {userData && (
        <Form layout="vertical" onFinish={onFinish} initialValues={userData}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Personal Info" key="1">
              <PersonalInfo />
            </TabPane>
            <TabPane tab="Education" key="2">
              <Education />
            </TabPane>
            <TabPane tab="Experience" key="3">
              <Experience />
            </TabPane>
          </Tabs>
          <div className="d-flex justify-content-end gap-2">
            <button
              className="primary-outline-btn"
              type="button"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            {params.id === loggedInUser.id && (
              <button className="primary-contained-btn" type="submit">
                Save
              </button>
            )}
          </div>
        </Form>
      )}
    </div>
  );
}

export default Profile;
