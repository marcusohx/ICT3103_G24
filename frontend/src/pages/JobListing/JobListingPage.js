import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
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
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { EmployerAuthContext } from "../../contexts/EmployerAuthContext";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { keyframes } from "@emotion/react";

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
  background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('path/to/your/image.jpg') no-repeat center center/cover`,
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
  const { authState } = useContext(AuthContext);
  const { employerauthState } = useContext(EmployerAuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:3001/joblisting/job-listings")
      .then((response) => {
        setJobListings(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the job listings!", error);
      });
  }, []);

  const viewDetails = (job) => {
    axios
      .get(`http://localhost:3001/joblisting/job-listings/${job._id}`)
      .then((response) => {
        setSelectedJob(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the job details!", error);
      });
  };

  return (
    <Container>
      <Banner>
        <BannerText>
          <Typography variant="h3" gutterBottom>
            Find the Job that Fits Your Life
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Discover opportunities tailored just for you.
          </Typography>
        </BannerText>
        <TextField
          variant="outlined"
          placeholder="Search for jobs..."
          fullWidth
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
                <FormControlLabel control={<Checkbox />} label="< $50k" />
                <FormControlLabel control={<Checkbox />} label="$50k - $100k" />
                <FormControlLabel
                  control={<Checkbox />}
                  label="$100k - $150k"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="$150k - $200k"
                />
                <FormControlLabel control={<Checkbox />} label="> $200k" />
              </FormGroup>
            </FormControl>
            <Divider />

            {/* Popular Keywords Filter */}
            <Typography variant="subtitle1" gutterBottom mt={2}>
              Popular Keywords
            </Typography>
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Remote" />
                <FormControlLabel control={<Checkbox />} label="Full-time" />
                <FormControlLabel control={<Checkbox />} label="Part-time" />
                <FormControlLabel control={<Checkbox />} label="Contract" />
                <FormControlLabel control={<Checkbox />} label="Internship" />
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
              <Typography>{selectedJob.description}</Typography>
              <Typography>Payment: ${selectedJob.payment}</Typography>
              <Button variant="contained" onClick={() => setSelectedJob(null)}>
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
