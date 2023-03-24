import React, { useEffect } from "react";
import "./membersDatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { mentorColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as mentorService from "../../services/mentorService";

const DatatableMentorsProject = ({ id }) => {
  const [mentors, setMentors] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const Mentors = async () => {
    const { data } = await mentorService.getListMentorsById(id);
    console.log(data);
    setMentors(data?.data);
  };

  useEffect(() => {
    Mentors();
  }, []);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/mentors/" + params.row.id} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatableMember">
      <div className="datatableTitle">Mentors</div>

      <input
        type="text"
        placeholder="Search mentors..."
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
        rows={
          mentors?.filter(
            (mentor) =>
              mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              mentor.email.toLowerCase().includes(searchQuery.toLowerCase())
          ) ?? []
        }
        columns={mentorColumns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default DatatableMentorsProject;
