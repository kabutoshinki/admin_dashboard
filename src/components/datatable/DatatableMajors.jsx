import React, { useEffect } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { majorColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as majorService from "../../services/majorService";
import { Button } from "@mui/material";
import ModalAddMajor from "../modal/ModalAddMajor";
import ModalDelete from "../modal/ModalDelete";
import ModalUpdateMajor from "../modal/ModalUpdateMajor";
const DatatableMajors = () => {
  const [majors, setMajors] = useState([]);
  const [open, setOpen] = useState(false);
  const [openModalDel, setOpenModalDel] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [major, setMajor] = useState();
  const [id, setId] = useState();

  const Majors = async () => {
    const { data } = await majorService.getMajors();
    setMajors(data?.data?.majorDTOList);
  };

  const handleSuccess = () => {
    Majors();
  };

  useEffect(() => {
    Majors();
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
      setMajor(row);
      setOpenModalUpdate(true);
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
        Majors Table
        <Button onClick={() => handleAdd()}>Add Major</Button>
      </div>

      <input
        type="text"
        placeholder="Search majors..."
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
        rows={majors?.filter((major) => major.name.toLowerCase().includes(searchQuery.toLowerCase())) ?? []}
        columns={majorColumns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />

      <ModalAddMajor open={open} onClose={() => setOpen(false)} reFresh={handleSuccess} />

      <ModalUpdateMajor
        open={openModalUpdate}
        onClose={() => setOpenModalUpdate(false)}
        reFresh={handleSuccess}
        data={major}
      />

      <ModalDelete
        open={openModalDel}
        onClose={() => setOpenModalDel(false)}
        title={"Major"}
        id={id}
        type={"major"}
        reFresh={handleSuccess}
      />
    </div>
  );
};

export default DatatableMajors;
