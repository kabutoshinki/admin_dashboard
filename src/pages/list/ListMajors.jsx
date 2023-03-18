import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableMajors from "../../components/datatable/DatatableMajors";

const ListMajors = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableMajors />
      </div>
    </div>
  );
};

export default ListMajors;
