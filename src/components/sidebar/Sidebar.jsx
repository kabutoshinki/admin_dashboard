import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import TopicIcon from "@mui/icons-material/Topic";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import SchoolIcon from "@mui/icons-material/School";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import logo from "../../images/logo.png";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import * as authService from "../../services/authenService";
const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { dispatch: dispatchAuth } = useContext(AuthContext);
  const handleLogout = async () => {
    // signOut(auth)
    //   .then(() => {
    //     console.log("success");
    //     dispatchAuth({ type: "LOGOUT" });
    //   })
    //   .catch((error) => {
    //     // An error happened.
    //     console.log(error);
    //   });
    auth.signOut();
    await authService.logout();
    dispatchAuth({ type: "LOGOUT" });
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img className="h-fit w-8 logo" src={logo} alt="BindUP logo" />
          <span className="logoTitle">BindUp</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          {/* <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>  
            </li>
          </Link> */}
          <Link to="/projects" style={{ textDecoration: "none" }}>
            <li>
              <NewspaperIcon className="icon" />
              <span>Projects</span>
            </li>
          </Link>
          <Link to="/topics" style={{ textDecoration: "none" }}>
            <li>
              <TopicIcon className="icon" />
              <span>Topics</span>
            </li>
          </Link>
          <Link to="/mentors" style={{ textDecoration: "none" }}>
            <li>
              <AssignmentIndOutlinedIcon className="icon" />
              <span>Mentors</span>
            </li>
          </Link>
          <Link to="/majors" style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className="icon" />
              <span>Majors</span>
            </li>
          </Link>
          {/* <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li> */}
          <p className="title">USER</p>
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={handleLogout}>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption" onClick={() => dispatch({ type: "LIGHT" })}></div>
        <div className="colorOption" onClick={() => dispatch({ type: "DARK" })}></div>
      </div>
    </div>
  );
};

export default Sidebar;
