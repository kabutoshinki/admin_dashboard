import "./membersDatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { jobColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import * as jobService from "../../services/jobService";
import { Button } from "@mui/material";

const DatatableJobs = ({ id }) => {
  const [jobs, setJobs] = useState([]);

  const { data, reFetch } = useFetch(
    `http://fhunt-env.eba-pr2amuxm.ap-southeast-1.elasticbeanstalk.com/api/v1/jobs/${id}/`
  );

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setJobs(data?.data);
  }, [data]);
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/jobs/` + params.row.id} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatableMember">
      <div className="datatableTitle">Jobs</div>
      <input
        type="text"
        placeholder="Search Jobs..."
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
        rows={jobs?.filter((member) => member.name.toLowerCase().includes(searchQuery.toLowerCase())) ?? []}
        columns={jobColumns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
      />
    </div>
  );
};

export default DatatableJobs;
