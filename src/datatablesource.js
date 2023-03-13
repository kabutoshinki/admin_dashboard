import logo from "../src/images/logo.png";
export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row?.img} alt="avatar" />
          {params?.row?.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "address",
    headerName: "Address",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return <div className={`cellWithStatus ${params?.row?.status}`}>{params?.row?.status}</div>;
    },
  },
];

export const projectColumns = [
  // { field: "id", headerName: "ID", width: 250 },
  {
    field: "project",
    headerName: "Project Image",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params?.row?.logo || logo} alt="avatar" />
          {params?.row?.username}
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },

  {
    field: "summary",
    headerName: "Summary",
    width: 300,
  },
  {
    field: "voteQuantity",
    headerName: "Vote",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return <div className={`cellWithStatus ${params?.row?.status}`}>{params?.row?.status}</div>;
    },
  },
];

export const memberColumns = [
  // { field: "id", headerName: "ID", width: 250 },
  {
    field: "user_image",
    headerName: "Members Image",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={logo} alt="avatar" />
          {/* {params?.row?.username} */}
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 330,
  },
  {
    field: "role",
    headerName: "Role",
    width: 200,
  },
  {
    field: "title",
    headerName: "Title",
    width: 200,
  },
];

export const changelogColumns = [
  // { field: "id", headerName: "ID", width: 250 },
  {
    field: "title",
    headerName: "Title",
    width: 200,
  },
  {
    field: "description",
    headerName: "Description",
    width: 650,
  },
  {
    field: "createdDate",
    headerName: "Date",
    width: 100,
  },
];
