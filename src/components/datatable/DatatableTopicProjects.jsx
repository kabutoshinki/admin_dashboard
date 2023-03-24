import "./membersDatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { memberColumns, projectColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import * as projectMemberService from "../../services/projectMemberService";

const DatatableTopicProjects = ({ id }) => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModalDel, setOpenModalDel] = useState(false);
  const [idDel, setIdDel] = useState();
  const { data, reFetch } = useFetch(
    `http://fhunt-env.eba-pr2amuxm.ap-southeast-1.elasticbeanstalk.com/api/v1/topics/${id}/projects?pageNo=0&pageSize=99&sortBy=id&ascending=ASC`
  );
  useEffect(() => {
    setProjects(data?.data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      console.log(id);
      setIdDel(id);
      setOpenModalDel(true);
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
            <Link to={"/projects/" + params.row.id} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            {/* <div className="deleteButton" onClick={() => handleDelete(params?.row?.id)}>
              Delete
            </div> */}
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
        rows={projects?.filter((project) => project?.name.toLowerCase().includes(searchQuery.toLowerCase())) ?? []}
        columns={projectColumns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
      />
    </div>
  );
};

export default DatatableTopicProjects;
