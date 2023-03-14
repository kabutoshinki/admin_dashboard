import React, { useEffect, useState } from "react";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import logo from "../../images/logo.png";

const MemberDetail = () => {
  const param = useParams();
  console.log(param);
  const { data } = useFetch(
    `http://fhunt-env.eba-pr2amuxm.ap-southeast-1.elasticbeanstalk.com/api/v1/member/${param.memberId}`
  );
  console.log(data);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Member Information</h1>
            <div className="item">
              <img src={logo} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{data.data?.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Role:</span>
                  <span className="itemValue">{data.data?.role}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Title:</span>
                  <span className="itemValue">{data?.data?.title}</span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="right">
            <div className="detailItem">
              <h3 className="itemKey">Description:</h3>
             
              <div dangerouslySetInnerHTML={{ __html: data.data?.description }} />
            </div>
            <div className="detailItem">
              <h3 className="itemKey">Summary:</h3>
              <p className="itemValue">{data?.data?.summary}</p>
            </div>
            <div className="detailItem">
              <span className="itemKey" style={{ fontWeight: "bold" }}>
                Vote:
              </span>

              <span className="itemValue"> {data.data?.voteQuantity}</span>
            </div>
            <div className="detailItem">
              <h3 className="itemKey">Source:</h3>
              <Link to={data.data?.source}>
                <p className="itemValue">{data.data?.name}</p>
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;
