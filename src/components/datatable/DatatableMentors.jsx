import React, { useEffect } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { mentorColumns, projectColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as mentorService from "../../services/mentorService";
import { Button } from "@mui/material";
import ModalAddMentor from "../modal/ModalAddMentor";
import ModalDelete from "../modal/ModalDelete";
import ModalUpdateMajor from "../modal/ModalUpdateMajor";
import ModalUpdateMentor from "../modal/ModalUpdateMentor";
const DatatableMentors = () => {
  const [pageSize, setPageSize] = useState(0);
  const [mentors, setMentors] = useState([]);
  const [mentor, setMentor] = useState({});
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModalDel, setOpenModalDel] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [id, setId] = useState();

  const Mentors = async () => {
    const { data } = await mentorService.getMentors();
    setMentors(data?.data?.mentorDTOList);
    setPageSize(data?.data?.noOfPages);
  };

  const handleSuccess = () => {
    Mentors();
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
      setMentor(row);
      setOpenModalUpdate(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Mentors Table
        <Button onClick={() => handleAdd()}>Add Mentor</Button>
      </div>

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

      <ModalUpdateMentor
        open={openModalUpdate}
        onClose={() => setOpenModalUpdate(false)}
        reFresh={handleSuccess}
        data={mentor}
      />

      <ModalDelete
        open={openModalDel}
        onClose={() => setOpenModalDel(false)}
        title={"Mentor"}
        id={id}
        type={"mentor"}
        reFresh={handleSuccess}
      />
      <ModalAddMentor open={open} onClose={() => setOpen(false)} reFresh={handleSuccess} />
    </div>
  );
};

export default DatatableMentors;
