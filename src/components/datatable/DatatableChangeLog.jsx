import "./membersDatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { changelogColumns, memberColumns, projectColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import * as changelogService from "../../services/changeLogService";
import ModalDelete from "../modal/ModalDelete";
const DatatableChangeLog = ({ id }) => {
  const { data, reFetch } = useFetch(
    `http://fhunt-env.eba-pr2amuxm.ap-southeast-1.elasticbeanstalk.com/api/v1/changelog/?projectId=${id}&paging=false`
  );
  console.log(data);
  const [open, setOpen] = useState(false);
  const handleDelete = async (id) => {
    try {
      console.log(id);
      // await changelogService.changeStatus(id, "REJECTED");
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/changelogs/" + params.row.id} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            {/* {params.row.status === "PUBLIC" ? (
              <div className="acceptButton disabled">Accept</div>
            ) : (
              <div className="acceptButton" onClick={() => handleAccept(params.row.id)}>
                Accept
              </div>
            )} */}
            <ModalDelete open={open} onClose={() => setOpen(false)} id={params?.row?.id} reFresh={reFetch} />
            <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatableMember">
      <div className="datatableTitle">Change Logs</div>
      <DataGrid
        className="datagrid"
        rows={data?.data ?? []}
        columns={changelogColumns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
      />
    </div>
  );
};

export default DatatableChangeLog;
