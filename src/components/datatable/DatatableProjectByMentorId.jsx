import React, { useEffect } from "react";
import "./membersDatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { projectColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as mentorService from "../../services/mentorService";

const DatatableProjectsByMentorId = ({ id }) => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const Projects = async () => {
    const { data } = await mentorService.getProjectsByMentorId(id);
    console.log(data);
    setProjects(data?.data);
  };

  useEffect(() => {
    Projects();
  }, []);

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
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatableMember">
      <div className="datatableTitle">Projects</div>

      <input
        type="text"
        placeholder="Search projects..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          padding: "5px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "16px",
          width: "100%",
          maxWidth: "400px",
          boxSizing: "border-box",
          marginBottom: "20px",
        }}
      />
      <DataGrid
        className="datagrid"
        rows={projects?.filter((project) => project.name.toLowerCase().includes(searchQuery.toLowerCase())) ?? []}
        columns={projectColumns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default DatatableProjectsByMentorId;
