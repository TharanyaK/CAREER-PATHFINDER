import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../components/PageTitle";
import { Tabs, Alert, message } from "antd";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import { changeNotificationStatus } from "./apis/users";
import { SetReloadNotifications } from "../redux/notifications";
import { useNavigate } from "react-router-dom";

const TabPane = Tabs.TabPane;

function Notifications() {
  const { readNotifications, unreadNotifications } = useSelector(
    (state) => state.notifications
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeStatus = async (id, status) => {
    try {
      dispatch(ShowLoading());
      const response = await changeNotificationStatus(id, status);
      if (response.success) {
        dispatch(SetReloadNotifications(true));
        message.success(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
    }
  };

  return (
    <div>
      <PageTitle title="Notifications" />

      <Tabs defaultActiveKey="1">
        <TabPane tab="Unread" key="1">
          {unreadNotifications.map((notification, index) => {
            return (
              <Alert
                key={index}
                message={
                  <div className="d-flex justify-content-between align-items-center">
                    <div
                      className="d-flex flex-column"
                      onClick={() => navigate("/applied-jobs")}
                    >
                      <span>{notification.title}</span>
                      <span>{notification.createdAt}</span>
                    </div>
                    <span
                      className="underline"
                      onClick={() => changeStatus(notification.id, "read")}
                    >
                      Mark as read
                    </span>
                  </div>
                }
              />
            );
          })}
        </TabPane>
        <TabPane tab="Read" key="2">
          {readNotifications.map((notification, index) => {
            return (
              <Alert
                key={index}
                message={
                  <div className="d-flex justify-content-between align-items-center">
                    <div
                      className="d-flex flex-column"
                      onClick={() => navigate("/applied-jobs")}
                    >
                      <span>{notification.title}</span>
                      <span>{notification.createdAt}</span>
                    </div>
                    <span
                      className="underline"
                      onClick={() => changeStatus(notification.id, "unread")}
                    >
                      Mark as unread
                    </span>
                  </div>
                }
              />
            );
          })}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Notifications;
