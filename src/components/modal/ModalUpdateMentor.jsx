import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as changelogService from "../../services/changeLogService";
import { toast } from "react-toastify";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import * as mentorService from "../../services/mentorService";
import * as majorService from "../../services/majorService";

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

const ModalUpdateMentor = ({ open, onClose, data, reFresh }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    major: "",
    phone: "",
    email: "",
  });
  const [majors, setMajors] = useState([]);

  const Majors = async () => {
    const { data } = await majorService.getMajors();
    setMajors(data?.data?.majorDTOList);
  };

  useEffect(() => {
    Majors();
  }, []);
  useEffect(() => {
    if (data) {
      setFormData({
        id: data.id || "",
        name: data.name || "",
        major: data.major || "",
        phone: data.phone || "",
        email: data.email || "",
      });
    }
  }, [data]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mentorService.updateMentor(formData);
      console.log(formData);
      toast.success("Update Success");
      onClose();
      reFresh();
    } catch (error) {
      toast.error("Update Fail");
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
              Update Topic
            </Typography>

            <TextField
              label="name"
              sx={{ mb: 3, width: "100%" }}
              name="name"
              value={formData?.name}
              onChange={handleInputChange}
              required
            />
            <FormControl sx={{ mb: 3, width: "100%" }}>
              <InputLabel htmlFor="major-select" inputProps={{ id: "major-select" }}>
                Major
              </InputLabel>
              <Select label="major" name="major" value={formData.major || ""} onChange={handleInputChange} required>
                <MenuItem disabled value="">
                  Select a major
                </MenuItem>
                {majors.map((major) => (
                  <MenuItem key={major.id} value={major.name}>
                    {major.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="phone"
              type={"text"}
              sx={{ mb: 3, width: "100%" }}
              name="phone"
              value={formData?.phone}
              onChange={handleInputChange}
              inputProps={{ maxLength: 10 }}
              required
            />
            <TextField
              label="email"
              type={"email"}
              sx={{ mb: 3, width: "100%" }}
              name="email"
              value={formData?.email}
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

export default ModalUpdateMentor;
