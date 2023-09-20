import React, { useState, useEffect } from "react";
import { Container, TextField, Button } from "@mui/material";
import axios from "axios";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/joblisting/${id}`
        );
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/joblisting/update/${id}`,
        formData
      );
      console.log("Job listing updated:", response.data);
      // Here, add what should happen after successfully updating the job listing (e.g., redirect to a different page)
    } catch (error) {
      console.error("There was an error updating the job listing!", error);
    }
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
          <option value="open">Open</option>
          <option value="in-progress">In-Progress</option>
          <option value="closed">Closed</option>
        </TextField>
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

        <Button variant="contained" color="primary" type="submit">
          Update Job Listing
        </Button>
      </form>
    </Container>
  );
}

export default UpdateJobListingPage;
