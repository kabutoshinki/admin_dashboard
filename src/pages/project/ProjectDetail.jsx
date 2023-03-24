import React from "react";
import "./single.scss";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import logo from "../../images/logo.png";
import DatatableMembers from "../../components/datatable/DatatableMembers";
import DatatableChangeLog from "../../components/datatable/DatatableChangeLog";
import DatatableMentorsProject from "../../components/datatable/DatatableMentorsProject";
import DatatableJobs from "../../components/datatable/DatatableJobs";

const ProjectDetail = () => {
  const param = useParams();
  const { data } = useFetch(
    `http://fhunt-env.eba-pr2amuxm.ap-southeast-1.elasticbeanstalk.com/api/v1/projects/${param.projectId}`
  );

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Project Information</h1>
            <div className="item">
              <img src={data.data?.logo || logo} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{data.data?.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Founder:</span>
                  <span className="itemValue">{data.data?.founder.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+1 2345 67 89</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Mentor:</span>

                  <span className="itemValue">{data.data?.mentor === undefined ? "None" : data.data?.mentor}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="detailItem">
              <h3 className="itemKey">Description:</h3>
              {/* {data?.data?.description} */}
              <div dangerouslySetInnerHTML={{ __html: data?.data?.description }} />
            </div>
            <div className="detailItem">
              <h3 className="itemKey">Summary:</h3>
              <p className="itemValue">{data?.data?.summary}</p>
            </div>
            <div className="detailItem">
              <span className="itemKey" style={{ fontWeight: "bold" }}>
                Vote:
              </span>

              <span className="itemValue"> {data?.data?.voteQuantity}</span>
            </div>
            <div className="detailItem">
              <h3 className="itemKey">Source:</h3>
              <Link to={data?.data?.source}>
                <p className="itemValue">{data?.data?.name}</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="bottom">
          <DatatableMembers id={param?.projectId} />
        </div>
        <div className="bottom">
          <DatatableChangeLog id={param?.projectId} />
        </div>
        <div className="bottom">
          <DatatableMentorsProject id={param?.projectId} />
        </div>
        <div className="bottom">
          <DatatableJobs id={param?.projectId} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
