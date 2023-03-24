import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as changelogService from "../../services/changeLogService";
import * as topicService from "../../services/topicService";
import * as majorService from "../../services/majorService";
import * as mentorService from "../../services/mentorService";
import { toast } from "react-toastify";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#ffffff",
  // bgcolor: "background.paper",
  // border: "2px solid #000",
  // boxShadow: 24,
  p: 4,
};

const ModalDelete = ({ open, onClose, type, title, id, reFresh }) => {
  const handleDelete = async () => {
    try {
      if (type === "changelog") {
        await changelogService.deleteChangeLog(id);
      } else if (type === "topic") {
        await topicService.deleteTopicById(id);
      } else if (type === "major") {
        await majorService.deleteMajorById(id);
      } else if (type === "mentor") {
        await mentorService.deleteMentorById(id);
      }
      toast.success("Delete Success");
      onClose();
      reFresh();
    } catch (error) {
      toast.error("Delete Fail");
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are You Sure You Want To Delete This {title}
          </Typography>
          <Button onClick={handleDelete} sx={{ color: "red", marginTop: "10px", fontWeight: "bold", float: "right" }}>
            Delete
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalDelete;
