import React from "react";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { DataGrid } from "@mui/x-data-grid";
import { memberColumns } from "../../datatablesource";
import logo from "../../images/logo.png";
const ProjectDetail = () => {
  const param = useParams();
  const { data } = useFetch(
    `http://fhunt-env.eba-pr2amuxm.ap-southeast-1.elasticbeanstalk.com/api/v1/project/${param.projectId}`
  );

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/projects/" + params.row.id} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div className="deleteButton">Delete</div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {/* <div className="editButton">Edit</div> */}
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
              {data?.data?.description}
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
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Members</h1>
          {/* <DataGrid
            className="datagrid"
            rows={data?.data.members ?? []}
            columns={memberColumns.concat(actionColumn)}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          /> */}
          {data?.data?.members?.length > 0 ? (
            <DataGrid
              className="datagrid"
              rows={data.data.members}
              columns={memberColumns.concat(actionColumn)}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          ) : (
            <div>No Member to display</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
