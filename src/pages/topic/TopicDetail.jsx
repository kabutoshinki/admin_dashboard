import React, { useEffect, useState } from "react";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import logo from "../../images/logo.png";
import DatatableTopicProjects from "../../components/datatable/DatatableTopicProjects";

const TopicDetail = () => {
  const param = useParams();
  const { data } = useFetch(
    `http://fhunt-env.eba-pr2amuxm.ap-southeast-1.elasticbeanstalk.com/api/v1/topic/${param.topicId}`
  );
  console.log(data);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Topic Information</h1>
            <div className="item">
              <img src={logo} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{data?.data?.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Short Name:</span>
                  <span className="itemValue">{data?.data?.shortName}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="detailItem">
              <h3 className="itemKey">Description:</h3>
              {data?.data?.description}
            </div>
          </div>
        </div>
        <div className="bottom">
          <DatatableTopicProjects id={param.topicId} />
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;
