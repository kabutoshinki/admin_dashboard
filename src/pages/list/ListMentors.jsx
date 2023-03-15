import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableProjects from "../../components/datatable/DatatableProjects";
import DatatableMentors from "../../components/datatable/DatatableMentors";

const ListMentors = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableMentors />
      </div>
    </div>
  );
};

export default ListMentors;
