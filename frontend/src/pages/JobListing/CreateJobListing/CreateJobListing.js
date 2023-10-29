import React, { useState, useContext, useEffect } from "react";
import { Container, TextField, Button, Snackbar, Alert } from "@mui/material";
import { api } from "services/api";
import { EmployerAuthContext } from "../../../contexts/EmployerAuthContext";

function CreateJobListingPage() {
  const { employerAuthState } = useContext(EmployerAuthContext);

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

  useEffect(() => {
    if (employerAuthState) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        employer: employerAuthState._id,
      }));
    }
  }, [employerAuthState]);

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
      const response = await api.post("joblisting/createjoblisting", formData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setNotification({
          open: true,
          message: "Job listing created successfully!",
          severity: "success",
        });
        setFormData({
          title: "",
          description: "",
          payment: "",
        });
      } else {
        throw new Error(`Unexpected response: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
      setNotification({
        open: true,
        message: "There was an error creating the job listing!",
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

  if (!employerAuthState) {
    return (
      <div>
        <h1>Not logged in</h1>
      </div>
    );
  }
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
          <option value="closed">In-progress</option>
        </TextField>
        <Button variant="contained" color="primary" type="submit">
          Create Job Listing
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

export default CreateJobListingPage;
