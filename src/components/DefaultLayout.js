import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserNotifications, getUserProfile } from "../pages/apis/users";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import { SetReloadNotifications } from "../redux/notifications";
import { Badge } from "antd";

function DefaultLayout({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const { reloadNotifications, unreadNotifications } = useSelector(
    (state) => state.notifications
  );
  const [collapsed, setCollapsed] = useState(false);
  const [manuToRender, setMenuToRender] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userMenu = [
    {
      title: "Home",
      onClick: () => navigate("/"),
      icon: <i className="ri-home-7-line"></i>,
      path: "/",
    },
    {
      title: "Applied Jobs",
      onClick: () => navigate("/applied-jobs"),
      icon: <i className="ri-file-list-3-line"></i>,
      path: "/applied-jobs",
    },
    {
      title: "Posted Jobs",
      onClick: () => navigate("/posted-jobs"),
      icon: <i className="ri-file-list-2-line"></i>,
      path: "/posted-jobs",
    },
    {
      title: "Profile",
      onClick: () => navigate(`/profile/${user.id}`),
      icon: <i className="ri-user-2-line"></i>,
      path: `/profile`,
    },
    {
      title: "Logout",
      onClick: () => {
        localStorage.removeItem("user");
        navigate("/login");
      },
      icon: <i className="ri-logout-box-r-line"></i>,
      path: "/login",
    },
  ];

  const adminMenu = [
    {
      title: "Home",
      onClick: () => navigate("/"),
      icon: <i className="ri-home-7-line"></i>,
      path: "/",
    },
    {
      title: "Jobs",
      onClick: () => navigate("/admin/jobs"),
      icon: <i className="ri-file-list-2-line"></i>,
      path: "/admin/jobs",
    },
    {
      title: "Users",
      onClick: () => navigate("/admin/users"),
      icon: <i className="ri-user-2-line"></i>,
      path: "/admin/users",
    },
    {
      title: "Logout",
      onClick: () => {
        localStorage.removeItem("user");
        navigate("/login");
      },
      icon: <i className="ri-logout-box-r-line"></i>,
      path: "/login",
    },
  ];

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const userId = JSON.parse(localStorage.getItem("user")).id;
      const response = await getUserProfile(userId);
      dispatch(HideLoading());
      if (response.data?.isAdmin === true) {
        setMenuToRender(adminMenu);
      } else {
        setMenuToRender(userMenu);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadNotifications = async () => {
    try {
      dispatch(ShowLoading());
      await getUserNotifications();
      dispatch(HideLoading());
      dispatch(SetReloadNotifications(false));
    } catch (error) {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (reloadNotifications) {
      loadNotifications();
    }
  }, [reloadNotifications]);

  return (
    <div className="layout">
      <div className="sidebar justifay-content-between d-flex">
        <div className="menu" style={{ width: collapsed ? "40px" : "150px" }}>
          {manuToRender.map((item, index) => {
            const isActive = window.location.pathname === item.path;

            return (
              <div
                onClick={item.onClick}
                key={index}
                className={`menu-item ${isActive && "active-menu-item"}`}
              >
                {item.icon}
                {!collapsed && <span>{item.title}</span>}
              </div>
            );
          })}
        </div>
      </div>
      <div className="content">
        <div className="header justify-content-between d-flex">
          <div className="d-flex item-center gap-2">
            {collapsed ? (
              <i
                className="ri-menu-2-fill"
                onClick={() => setCollapsed(!collapsed)}
              ></i>
            ) : (
              <i
                className="ri-close-line"
                onClick={() => setCollapsed(!collapsed)}
              ></i>
            )}

            <span className="logo">CAREER PATHFINDER</span>
          </div>
          <div className="d-flex gap-1 align-items-center">
            <Badge
              className="mx-5"
              count={unreadNotifications.length || 0}
              onClick={() => navigate("/notifications")}
            >
              <i className="ri-notification-line"></i>
            </Badge>
            <span>{user?.name}</span>
            <i className="ri-shield-user-fill"></i>
          </div>
        </div>
        <div className="body">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
