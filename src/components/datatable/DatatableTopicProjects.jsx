import "./membersDatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { memberColumns, projectColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import * as projectMemberService from "../../services/projectMemberService";

const DatatableTopicProjects = ({ id }) => {
  const [project, setProject] = useState([]);
  const { data, reFetch } = useFetch(
    `http://fhunt-env.eba-pr2amuxm.ap-southeast-1.elasticbeanstalk.com/api/v1/topic/${id}/projects?pageNo=0&pageSize=99&sortBy=id&ascending=ASC`
  );
  console.log(data);

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

            {/* {params.row.status === "PUBLIC" ? (
              <div className="acceptButton disabled">Accept</div>
            ) : (
              <div className="acceptButton" onClick={() => handleAccept(params.row.id)}>
                Accept
              </div>
            )}

            {params.row.status === "REJECTED" ? (
              <div className="deleteButton disabled">Reject</div>
            ) : (
              <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
                Reject
              </div>
            )} */}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatableMember">
      <div className="datatableTitle">Projects</div>
      <DataGrid
        className="datagrid"
        rows={data?.data ?? []}
        columns={projectColumns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
      />
    </div>
  );
};

export default DatatableTopicProjects;
