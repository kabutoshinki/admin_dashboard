import React, { useEffect, useState } from "react";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import logo from "../../images/logo.png";
import * as majorService from "../../services/majorService";
const MajorDetail = () => {
  const param = useParams();

  const [major, setMajor] = useState();
  // const { data } = useFetch(
  //   `http://fhunt-env.eba-pr2amuxm.ap-southeast-1.elasticbeanstalk.com/api/v1/mentor/${param.mentorId}`
  // );
  // console.log(data);
  const Major = async () => {
    const { data } = await majorService.getMajorById(param.majorId);
    console.log("data");
    console.log(data?.data);
    setMajor(data?.data);
  };

  useEffect(() => {
    Major();
  }, []);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Major Information</h1>
            <div className="item">
              <img src={logo} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{major?.name}</h1>
              </div>
            </div>
          </div>

          <div className="right">
            <div className="detailItem">
              <h3 className="itemKey">Description:</h3>
              <span className="itemValue">{major?.description}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MajorDetail;
