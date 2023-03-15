import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableProjects from "../../components/datatable/DatatableProjects";
import DatatableTopics from "../../components/datatable/DatatableTopics";

const ListTopics = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableTopics />
      </div>
    </div>
  );
};

export default ListTopics;
