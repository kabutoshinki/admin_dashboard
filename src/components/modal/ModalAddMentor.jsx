import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as changelogService from "../../services/changeLogService";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import * as mentorService from "../../services/mentorService";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalAddMentor = ({ open, onClose, reFresh }) => {
  const initData = {
    name: "",
    major: "",
    email: "",
    phone: "",
  };

  const [formData, setFormData] = useState(initData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mentorService.addMentor(formData);
      toast.success("Add Success");
      onClose();
      reFresh();
    } catch (error) {
      toast.error("Add Fail");
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
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "2rem",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 3 }}>
              Add Mentor
            </Typography>

            <TextField
              label="name"
              sx={{ mb: 3, width: "100%" }}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="major"
              sx={{ mb: 3, width: "100%" }}
              name="major"
              value={formData.major}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="email"
              type={"email"}
              sx={{ mb: 3, width: "100%" }}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="phone"
              sx={{ mb: 3, width: "100%" }}
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />

            <div>
              <Button
                variant="contained"
                sx={{ me: 3 }}
                style={{ marginRight: "10px" }}
                color="inherit"
                onClick={() => onClose()}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalAddMentor;
