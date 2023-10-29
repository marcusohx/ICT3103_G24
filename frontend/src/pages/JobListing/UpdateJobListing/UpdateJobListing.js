import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Snackbar, Alert } from "@mui/material";
import { api } from "services/api";
import { useParams } from "react-router-dom";

function UpdateJobListingPage() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    payment: "",
    employer: "",
    skills: [],
    status: "open",
  });

  const [formErrors, setFormErrors] = useState({});

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`joblisting/job-listings/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("There was an error fetching the job listing!", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSkillsChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      skills: value.split(","),
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title) errors.title = "Title is required";
    if (!formData.description) errors.description = "Description is required";
    if (formData.description.length > 500)
      errors.description = "Description can be at most 500 characters";
    if (!formData.payment) errors.payment = "Payment is required";
    if (isNaN(Number(formData.payment)))
      errors.payment = "Payment must be a number";
    // ... add other validation checks as needed
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await api.put(`joblisting/update/${id}`, formData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        // Successful update
        setNotification({
          open: true,
          message: "Job listing updated successfully!",
          severity: "success",
        });
        // Here, add what should happen after successfully updating the job listing (e.g., redirect to a different page)
      } else if (response.status === 404) {
        // Job listing not found
        setNotification({
          open: true,
          message: "Job listing not found!",
          severity: "error",
        });
      } else {
        // Other unexpected status
        setNotification({
          open: true,
          message: "Unexpected error!",
          severity: "error",
        });
      }
    } catch (error) {
      console.error(error);
      setNotification({
        open: true,
        message: "There was an error updating the job listing!",
        severity: "error",
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!formErrors.title}
          helperText={formErrors.title}
        />
        <TextField
          label="Description"
          variant="outlined"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          error={!!formErrors.description}
          helperText={formErrors.description}
        />
        <TextField
          label="Payment"
          variant="outlined"
          name="payment"
          value={formData.payment}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!formErrors.payment}
          helperText={formErrors.payment}
        />
        <TextField
          label="Skills (comma-separated)"
          variant="outlined"
          name="skills"
          value={(formData.skills || []).join(",")}
          onChange={handleSkillsChange}
          fullWidth
          margin="normal"
          error={!!formErrors.skills}
          helperText={
            formErrors.skills
              ? formErrors.skills
              : "Enter skills separated by commas"
          }
        />
        <TextField
          label="Status"
          variant="outlined"
          name="status"
          value={formData.status}
          onChange={handleChange}
          fullWidth
          margin="normal"
          select
          SelectProps={{ native: true }}
          error={!!formErrors.status}
          helperText={formErrors.status}
        >
          <option value="open">Open</option>
          <option value="in-progress">In-Progress</option>
          <option value="closed">Closed</option>
        </TextField>
        <TextField
          type="hidden"
          name="employer"
          value={formData.employer._id}
        />
        <Button variant="contained" color="primary" type="submit">
          Update Job Listing
        </Button>
      </form>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default UpdateJobListingPage;
