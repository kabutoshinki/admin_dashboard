import React, { useEffect, useState } from "react";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import logo from "../../images/logo.png";
import * as mentorService from "../../services/mentorService";
const MentorDetail = () => {
  const param = useParams();

  const [mentor, setMentor] = useState();
  // const { data } = useFetch(
  //   `http://fhunt-env.eba-pr2amuxm.ap-southeast-1.elasticbeanstalk.com/api/v1/mentor/${param.mentorId}`
  // );
  // console.log(data);
  const Mentor = async () => {
    const { data } = await mentorService.getMentorById(param.mentorId);
    // console.log("data");
    // console.log(data?.data);
    setMentor(data?.data);
  };

  useEffect(() => {
    Mentor();
  }, []);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Mentor Information</h1>
            <div className="item">
              <img src={logo} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{mentor?.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Major:</span>
                  <span className="itemValue">{mentor?.major}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{mentor?.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{mentor?.phone}</span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="right">
            <div className="detailItem">
              <span className="itemKey">Email:</span>
              <span className="itemValue">{mentor?.email}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Phone:</span>
              <span className="itemValue">{mentor?.phone}</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MentorDetail;
