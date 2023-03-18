import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import ListProjects from "./pages/list/ListProjects";
import ProjectDetail from "./pages/project/ProjectDetail";
import TopicDetail from "./pages/topic/TopicDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MemberDetail from "./pages/members/MemberDetail";
import ChangeLogDetail from "./pages/changelog/ChangeLogDetail";
import ListTopics from "./pages/list/ListTopics";
import ListMentors from "./pages/list/ListMentors";
import MentorDetail from "./pages/mentor/MentorDetail";
import ListMajors from "./pages/list/ListMajors";
import MajorDetail from "./pages/major/MentorDetail";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
              <Route
                path=":userId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New inputs={userInputs} title="Add New User" />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="projects">
              <Route
                index
                element={
                  <RequireAuth>
                    <ListProjects />
                  </RequireAuth>
                }
              />
              <Route
                path=":projectId"
                element={
                  <RequireAuth>
                    <ProjectDetail />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New inputs={productInputs} title="Add New Product" />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="members">
              <Route
                path=":memberId"
                element={
                  <RequireAuth>
                    <MemberDetail />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="changelogs">
              <Route
                path=":changelogId"
                element={
                  <RequireAuth>
                    <ChangeLogDetail />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="topics">
              <Route
                index
                element={
                  <RequireAuth>
                    <ListTopics />
                  </RequireAuth>
                }
              />
              <Route
                path=":topicId"
                element={
                  <RequireAuth>
                    <TopicDetail />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="mentors">
              <Route
                index
                element={
                  <RequireAuth>
                    <ListMentors />
                  </RequireAuth>
                }
              />
              <Route
                path=":mentorId"
                element={
                  <RequireAuth>
                    <MentorDetail />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="majors">
              <Route
                index
                element={
                  <RequireAuth>
                    <ListMajors />
                  </RequireAuth>
                }
              />
              <Route
                path=":majorId"
                element={
                  <RequireAuth>
                    <MajorDetail />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
