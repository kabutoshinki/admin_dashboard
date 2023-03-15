import React, { useEffect } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { mentorColumns, projectColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import * as mentorService from "../../services/mentorService";
import { Button } from "@mui/material";
import ModalAddMentor from "../modal/ModalAddMentor";
const DatatableMentors = () => {
  // const { data, reFetch } = useFetch(
  //   "http://fhunt-env.eba-pr2amuxm.ap-southeast-1.elasticbeanstalk.com/api/v1/mentor/?pageNo=0&pageSize=99&sortBy=id"
  // );
  // console.log(data);
  const [pageSize, setPageSize] = useState(0);
  const [mentors, setMentors] = useState([]);
  const [open, setOpen] = useState(false);
  const Mentors = async () => {
    const { data } = await mentorService.getMentors();
    console.log(data?.data);
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
        Mentors Table
        <Button onClick={() => handleAdd()}>Add Mentor</Button>
      </div>
      <DataGrid
        className="datagrid"
        rows={mentors ?? []}
        columns={mentorColumns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
      />
      <ModalAddMentor open={open} onClose={() => setOpen(false)} reFresh={handleSuccess} />
    </div>
  );
};

export default DatatableMentors;
