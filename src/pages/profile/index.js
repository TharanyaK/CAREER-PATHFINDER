import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { Form, message, Tabs } from "antd";
import PersonalInfo from "./PersonalInfo";
import Education from "./Education";
import Experience from "./Experience";
import { useDispatch } from "react-redux";
import { getUserProfile, updateUserProfile } from "../apis/users";
import { ShowLoading, HideLoading } from "../../redux/alertSlice.js";

const { TabPane } = Tabs;

function Profile() {
  const dispatch = useDispatch();
  const [userData, setUserdata] = useState(null);

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await getUserProfile(user.id);

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
    try {
      dispatch(ShowLoading());
      const response = await updateUserProfile(values);
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
            <button className="primary-outline-btn">Cancel</button>
            <button className="primary-contained-btn" type="submit">
              Save
            </button>
          </div>
        </Form>
      )}
    </div>
  );
}

export default Profile;
