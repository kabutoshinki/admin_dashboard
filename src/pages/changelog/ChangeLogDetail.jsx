import React, { useEffect, useState } from "react";
import "./single.scss";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

import logo from "../../images/logo.png";

const ChangeLogDetail = () => {
  const param = useParams();
  const { data } = useFetch(
    `http://fhunt-env.eba-pr2amuxm.ap-southeast-1.elasticbeanstalk.com/api/v1/changelog/${param.changelogId}`
  );
  console.log(data);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Change Log Information</h1>
            <div className="item">
              <img src={logo} alt="" className="itemImg" style={{ marginLeft: "10px", marginRight: "20px" }} />
              <div className="details">
                <h1 className="itemTitle">{data?.data?.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Title:</span>
                  <span className="itemValue">{data?.data?.title}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{data?.data?.description}</span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="right">
            <div className="detailItem">
              <h3 className="itemKey">Description:</h3>
              {data?.data?.description}
              
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ChangeLogDetail;
