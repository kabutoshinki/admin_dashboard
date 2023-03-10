import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { useState } from "react";
import { Link } from "react-router-dom";
const Widget = ({ type }) => {
  const [amount, setAmount] = useState(null);
  const [diff, setDiff] = useState(null);
  let data;
  //temporary
  console.log(amount);
  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        href: "/users",
        query: "User",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    // case "order":
    //   data = {
    //     title: "ORDERS",
    //     isMoney: false,
    //     link: "View all orders",
    //     icon: (
    //       <ShoppingCartOutlinedIcon
    //         className="icon"
    //         style={{
    //           backgroundColor: "rgba(218, 165, 32, 0.2)",
    //           color: "goldenrod",
    //         }}
    //       />
    //     ),
    //   };
    //   break;
    // case "earning":
    //   data = {
    //     title: "EARNINGS",
    //     isMoney: true,
    //     link: "View net earnings",
    //     icon: (
    //       <MonetizationOnOutlinedIcon
    //         className="icon"
    //         style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
    //       />
    //     ),
    //   };
    //   break;
    case "project":
      data = {
        title: "PROJECT",
        query: "Projects",
        link: "See details",
        href: "/products",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="link">
          <Link to={data.href} id="link">
            {data.link}
          </Link>
        </span>
      </div>
      <div className="right">
        <div className={`percentage ${diff < 0 ? "negative" : "positive"}`}>
          {diff < 0 ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
