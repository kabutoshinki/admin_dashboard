import React, { useEffect } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { projectColumns, topicColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Button } from "@mui/material";
import ModalAddTopic from "../modal/ModalAddTopic";
import ModalDelete from "../modal/ModalDelete";
import ModalUpdateTopic from "../modal/ModalUpdateTopic";
import * as topicService from "../../services/topicService";
const DatatableTopics = () => {
  const [open, setOpen] = useState(false);
  const [openModalDel, setOpenModalDel] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [id, setId] = useState();
  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const Topics = async () => {
    const { data } = await topicService.getTopics();
    setTopics(data?.data);
  };

  const handleSuccess = () => {
    Topics();
  };
  useEffect(() => {
    Topics();
  }, []);

  const handleDelete = async (id) => {
    try {
      console.log(id);
      setId(id);
      setOpenModalDel(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = (row) => {
    try {
      setTopic(row);
      setOpenModalUpdate(true);
    } catch (error) {
      console.log(error);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/topics/" + params.row.id} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>

            <div className="updateButton" onClick={() => handleUpdate(params?.row)}>
              Update
            </div>
            <div className="deleteButton" onClick={() => handleDelete(params?.row?.id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  const handleAdd = () => {
    setOpen(true);
  };
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Topics Table
        <Button onClick={() => handleAdd()}>Add Topic</Button>
      </div>
      <input
        type="text"
        placeholder="Search topics..."
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
          topics?.topicDTOList?.filter(
            (topic) =>
              topic?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              topic?.shortName.toLowerCase().includes(searchQuery.toLowerCase())
          ) ?? []
        }
        columns={topicColumns.concat(actionColumn)}
        // pageSize={data?.data?.noOfPages}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
      />
      <ModalAddTopic open={open} onClose={() => setOpen(false)} reFresh={handleSuccess} />

      <ModalUpdateTopic
        open={openModalUpdate}
        onClose={() => setOpenModalUpdate(false)}
        reFresh={handleSuccess}
        topic={topic}
      />

      <ModalDelete
        open={openModalDel}
        onClose={() => setOpenModalDel(false)}
        title={"Topic"}
        id={id}
        type={"topic"}
        reFresh={handleSuccess}
      />
    </div>
  );
};

export default DatatableTopics;
