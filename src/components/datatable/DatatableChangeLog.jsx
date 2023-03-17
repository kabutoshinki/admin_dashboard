import "./membersDatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { changelogColumns, memberColumns, projectColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import * as changelogService from "../../services/changeLogService";
import ModalDelete from "../modal/ModalDelete";
const DatatableChangeLog = ({ id }) => {
  const { data, reFetch } = useFetch(
    `http://fhunt-env.eba-pr2amuxm.ap-southeast-1.elasticbeanstalk.com/api/v1/changelog/?projectId=${id}&paging=false`
  );

  const [open, setOpen] = useState(false);
  const [idDel, setIdDel] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [changelogs, setChangeLogs] = useState([]);

  useEffect(() => {
    setChangeLogs(data?.data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      console.log(id);
      // await changelogService.changeStatus(id, "REJECTED");
      setIdDel(id);
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
      <input
        type="text"
        placeholder="Search changelog..."
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
      {/* <DataGrid
        className="datagrid"
        rows={changelog ?? []}
        columns={changelogColumns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
      /> */}
      <DataGrid
        className="datagrid"
        rows={
          changelogs?.filter(
            (changelog) =>
              changelog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              changelog.description.toLowerCase().includes(searchQuery.toLowerCase())
          ) ?? []
        }
        columns={changelogColumns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
      />
      <ModalDelete
        open={open}
        onClose={() => setOpen(false)}
        title={"Change Log"}
        id={idDel}
        type={"changelog"}
        reFresh={reFetch}
      />
    </div>
  );
};

export default DatatableChangeLog;
