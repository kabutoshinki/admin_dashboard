import React, { useEffect, useState } from "react";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import logo from "../../images/logo.png";
import DatatableTopicProjects from "../../components/datatable/DatatableTopicProjects";
import * as topicService from "../../services/topicService";
const TopicDetail = () => {
  const param = useParams();

  const [topic, setTopic] = useState({});
  const Topic = async () => {
    const { data } = await topicService.getTopicDetail(param.topicId);
    setTopic(data?.data);
  };
  useEffect(() => {
    Topic();
  }, []);
  // const { data } = useFetch(
  //   `http://fhunt-env.eba-pr2amuxm.ap-southeast-1.elasticbeanstalk.com/api/v1/topics/${param.topicId}`
  // );
  // console.log(data);
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
                <h1 className="itemTitle">{topic?.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Short Name:</span>
                  <span className="itemValue">{topic?.shortName}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="detailItem">
              <h3 className="itemKey">Description:</h3>
              {topic?.description}
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
