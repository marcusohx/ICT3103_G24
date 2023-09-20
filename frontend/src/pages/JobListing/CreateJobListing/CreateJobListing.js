import React, { useState, useContext, useEffect } from "react";
import { Container, TextField, Button } from "@mui/material";
import axios from "axios";
import { EmployerAuthContext } from "../../../contexts/EmployerAuthContext";

function CreateJobListingPage() {
  const { employerAuthState } = useContext(EmployerAuthContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    payment: "",
    employer: "",
    skills: [], // Adding skills array
    status: "open", // Adding status field with default value "open"
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
      skills: value.split(","), // Skills are stored as an array of strings
    });
  };

  useEffect(() => {
    if (employerAuthState) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        employer: employerAuthState._id, // Assuming the ID is stored in _id field
      }));
    }
  }, [employerAuthState]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your API endpoint to create a job listing
      const response = await axios.post(
        "http://localhost:3001/joblisting/createjoblisting",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("Job listing created:", response.data);
      // Redirect to a different page or reset the form
      setFormData({
        title: "",
        description: "",
        payment: "",
      });
    } catch (error) {
      console.error("There was an error creating the job listing!", error);
    }
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
        />
        <TextField
          label="Payment"
          variant="outlined"
          name="payment"
          value={formData.payment}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Skills (comma-separated)"
          variant="outlined"
          name="skills"
          value={(formData.skills || []).join(",")}
          onChange={handleSkillsChange}
          fullWidth
          margin="normal"
          helperText="Enter skills separated by commas"
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
        >
          <TextField
            label="Employer ID"
            variant="outlined"
            name="employer"
            value={formData.employer}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled
          />
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </TextField>
        <Button variant="contained" color="primary" type="submit">
          Create Job Listing
        </Button>
      </form>
    </Container>
  );
}

export default CreateJobListingPage;
