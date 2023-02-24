import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableProjects from "../../components/datatable/DatatableProjects";

const ListProjects = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableProjects />
      </div>
    </div>
  );
};

export default ListProjects;
