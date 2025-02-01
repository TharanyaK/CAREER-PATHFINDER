import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import "./stylesheets/custom-components.css";
import "./stylesheets/layout.css";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Loader from "./components/Loader";
import AplliedJobs from "./pages/user/AplliedJobs";
import PostedJobs from "./pages/user/postedjobs";
import Profile from "./pages/user/profile";
import NewEditJob from "./pages/user/postedjobs/NewEditJob";
import AllJobs from "./pages/admin/AllJobs";
import AllUsers from "./pages/admin/AllUsers";
import JobDescription from "./pages/JobDescription";
import Notifications from "./pages/Notifications";

function App() {
  const { loading } = useSelector((state) => state.alert);
  return (
    <div>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/job-description/:id"
            element={
              <ProtectedRoute>
                <JobDescription />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applied-jobs"
            element={
              <ProtectedRoute>
                <AplliedJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posted-jobs"
            element={
              <ProtectedRoute>
                <PostedJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posted-jobs/new"
            element={
              <ProtectedRoute>
                <NewEditJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posted-jobs/edit/:id"
            element={
              <ProtectedRoute>
                <NewEditJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <ProtectedRoute>
                <AllJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <AllUsers />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
