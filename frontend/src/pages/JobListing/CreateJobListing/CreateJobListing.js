import React, { useState, useContext } from "react";
import { Container, TextField, Button } from "@mui/material";
import axios from "axios";
import { EmployerAuthContext } from "../../../contexts/EmployerAuthContext";

function CreateJobListingPage() {
  const { employerauthState } = useContext(EmployerAuthContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    payment: "",
    employer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your API endpoint to create a job listing
      const response = await axios.post(
        "http://localhost:3001/joblisting/createjoblisting",
        formData
      );
      console.log("Job listing created:", response.data);
      // Redirect to a different page or reset the form
      setFormData({
        title: "",
        description: "",
        payment: "",
        employer: "",
      });
    } catch (error) {
      console.error("There was an error creating the job listing!", error);
    }
  };

  //   if (!employerauthState) {
  //     return (
  //       <div>
  //         <h1>Not logged in</h1>
  //       </div>
  //     );
  //   }

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
          label="Employer ID"
          variant="outlined"
          name="employer"
          value={formData.employer}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Create Job Listing
        </Button>
      </form>
    </Container>
  );
}

export default CreateJobListingPage;