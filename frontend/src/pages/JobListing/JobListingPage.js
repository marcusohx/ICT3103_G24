import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Grid,
  Card,
  Typography,
  Button,
  TextField,
  Box,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material";
import { api } from "services/api";
import { AuthContext } from "../../contexts/AuthContext";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { keyframes } from "@emotion/react";
import Chip from "@mui/material/Chip";

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "300px", // Adjust this value as per your preference
  width: "100%",
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "transform .2s",
  "&:hover": {
    transform: "scale(1.01)",
  },
  marginBottom: theme.spacing(4),
}));

const Banner = styled(Box)(({ theme }) => ({
  background: `
    linear-gradient(
      rgba(0, 0, 0, 0.5), 
      rgba(0, 0, 0, 0.5)
    ), 
    url('https://source.unsplash.com/featured/?workspace') no-repeat center center/cover`,
  color: "#fff",
  padding: theme.spacing(10, 2),
  textAlign: "center",
  borderRadius: theme.spacing(2),
  margin: theme.spacing(2),
}));

const BannerText = styled(Box)(({ theme }) => ({
  animation: `${slideUp} 1s ease`,
}));

const Sidebar = styled("aside")(({ theme }) => ({
  padding: theme.spacing(2),
}));

function JobListingsPage() {
  const [jobListings, setJobListings] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSalaryRange, setSelectedSalaryRange] = useState({
    "$500 - $2000": false,
    "$2000 - $4000": false,
    "$4000 - $6000": false,
    "$6000 - $8000": false,
    "$8000 - $10000": false,
  });

  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const { authState } = useContext(AuthContext);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSalaryRangeChange = (event) => {
    const value = event.target.name;
    const isChecked = event.target.checked;
    setSelectedSalaryRange((prevRange) => ({
      ...prevRange,
      [value]: isChecked,
    }));
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguages((prevLanguages) =>
      prevLanguages.includes(language)
        ? prevLanguages.filter((lang) => lang !== language)
        : [...prevLanguages, language]
    );
  };

  useEffect(() => {
    api
      .get("joblisting/job-listings?status=open")
      .then((response) => {
        let data = response.data;
        if (searchTerm) {
          data = data.filter((job) =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        if (Object.values(selectedSalaryRange).some((v) => v)) {
          // check if any range is selected
          data = data.filter((job) =>
            Object.entries(selectedSalaryRange).some(([range, isSelected]) => {
              if (isSelected) {
                const [min, max] = range
                  .split("-")
                  .map((str) => str.replace(/[^\d]/g, "").trim());
                return (
                  (min ? job.payment >= Number(min) : true) &&
                  (max ? job.payment <= Number(max) : true)
                );
              }
              return false;
            })
          );
        }
        if (selectedLanguages.length > 0) {
          data = data.filter((job) =>
            selectedLanguages.some((language) => job.skills.includes(language))
          );
        }
        setJobListings(data);
      })
      .catch((error) => {
        console.error("There was an error fetching the job listings!", error);
      });
  }, [searchTerm, selectedSalaryRange, selectedLanguages]);

  const viewDetails = (job) => {
    api
      .get(`joblisting/job-listings/${job._id}`)
      .then((response) => {
        setSelectedJob(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the job details!", error);
      });
  };

  const handleApplyJob = (selectedJob) => {
    api
      .post(
        `joblisting/job-listings/apply/${selectedJob._id}`,
        {},
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          alert("Job application successful");
        }
      })
      .catch((error) => {
        console.error(error);

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx

          if (error.response.status === 400) {
            alert("User has already applied for this job");
          } else if (error.response.status === 401) {
            alert("Not authenticated");
          } else if (error.response.status === 404) {
            alert("Job listing not found");
          } else {
            alert("An unexpected error occurred");
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          alert("No response received from the server");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
          alert("An unexpected error occurred");
        }
      });
  };

  if (!authState) {
    return (
      <div>
        <h1>Not logged in</h1>
      </div>
    );
  }
  return (
    <Container>
      <Banner>
        <BannerText>
          <Typography variant="h3" gutterBottom>
            Find the Project Tailored for Your Skills
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Discover opportunities and collaborations crafted for SIT students.
          </Typography>
        </BannerText>
        <TextField
          variant="outlined"
          placeholder="Search for jobs..."
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            maxWidth: "500px",
            bgcolor: "background.paper",
            m: 0,
            borderRadius: 2,
          }}
        />
      </Banner>

      <Grid container spacing={4}>
        <Grid item md={3}>
          <Sidebar>
            <Typography variant="h6" gutterBottom>
              Advanced Filters
            </Typography>
            <Divider />

            {/* Salary Range Filter */}
            <Typography variant="subtitle1" gutterBottom mt={2}>
              Salary Range
            </Typography>
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleSalaryRangeChange}
                      name="$500 - $2000"
                    />
                  }
                  label="$500 - $2k"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleSalaryRangeChange}
                      name="$2000 - $4000"
                    />
                  }
                  label="$2k - $4k"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleSalaryRangeChange}
                      name="$4000 - $6000"
                    />
                  }
                  label="$4k - $6k"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleSalaryRangeChange}
                      name="$6000 - $8000"
                    />
                  }
                  label="$6k - $8k"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleSalaryRangeChange}
                      name="$8000 - $10000"
                    />
                  }
                  label="$8k - $10k"
                />
              </FormGroup>
            </FormControl>

            <Divider />

            {/* Popular Keywords Filter */}
            <Typography variant="subtitle1" gutterBottom mt={2}>
              Programming Languages
            </Typography>
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Node.js"
                  onChange={() => handleLanguageChange("node.js")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Python"
                  onChange={() => handleLanguageChange("Python")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Java"
                  onChange={() => handleLanguageChange("Java")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="C++"
                  onChange={() => handleLanguageChange("C++")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Ruby"
                  onChange={() => handleLanguageChange("Ruby")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="PHP"
                  onChange={() => handleLanguageChange("PHP")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Go"
                  onChange={() => handleLanguageChange("Go")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Swift"
                  onChange={() => handleLanguageChange("Swift")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Kotlin"
                  onChange={() => handleLanguageChange("Kotlin")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="TypeScript"
                  onChange={() => handleLanguageChange("TypeScript")}
                />
              </FormGroup>
            </FormControl>
            <Divider />

            {/* Industry Filter */}
            <Typography variant="subtitle1" gutterBottom mt={2}>
              Industry
            </Typography>
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Tech" />
                <FormControlLabel control={<Checkbox />} label="Finance" />
                <FormControlLabel control={<Checkbox />} label="Healthcare" />
                <FormControlLabel control={<Checkbox />} label="Education" />
                <FormControlLabel control={<Checkbox />} label="Government" />
                {/* Add more industries as necessary */}
              </FormGroup>
            </FormControl>
            <Divider />

            {/* Add more filters as needed with dividers in between */}
          </Sidebar>
        </Grid>

        <Grid item md={9}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2, ml: 2 }}>
            Projects
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {selectedJob ? (
            <StyledCard>
              <Typography variant="h5">{selectedJob.title}</Typography>
              <Typography>Description: {selectedJob.description}</Typography>
              <Typography>Payment: ${selectedJob.payment}</Typography>

              {/* Skills section */}
              <Box
                sx={{ mt: 2, display: "flex", gap: "8px", flexWrap: "wrap" }}
              >
                {selectedJob.skills &&
                  selectedJob.skills.map((skill, index) => (
                    <Chip
                      label={skill}
                      key={index}
                      variant="outlined"
                      size="small"
                    />
                  ))}
              </Box>

              <Button
                variant="contained"
                color="primary"
                onClick={() => handleApplyJob(selectedJob)}
                sx={{ mt: 2 }}
              >
                Apply for Job
              </Button>
              <Button
                variant="contained"
                onClick={() => setSelectedJob(null)}
                sx={{ mt: 2 }}
              >
                Back
              </Button>
            </StyledCard>
          ) : (
            <Grid
              container
              spacing={2}
              style={{ display: "flex", alignItems: "stretch" }}
            >
              {jobListings.map((job) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={job._id}
                  style={{ display: "flex" }}
                >
                  <StyledCard>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Avatar
                          src={job.companyLogoUrl}
                          alt={job.companyName}
                          sx={{ mt: 2 }} // Adjust margin top as necessary to align it properly
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="subtitle1">
                          {job.companyName}
                        </Typography>
                        <Typography
                          variant="h6"
                          mt={2}
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            height: "3em",
                          }}
                        >
                          {job.title}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography
                      variant="body2"
                      mt={2}
                      ml={1}
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3, // Adjust this value to control the number of lines shown for description
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {job.description}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 2,
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => viewDetails(job)}
                      >
                        View Details
                      </Button>
                    </Box>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default JobListingsPage;
