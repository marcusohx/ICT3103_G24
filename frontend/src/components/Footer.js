import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <Box sx={{ backgroundColor: "#f8f9fa", py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Company
            </Typography>
            <Typography variant="body2" color="textSecondary">
              About Us
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Contact
            </Typography>
            {/* Add more links as required */}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              For Candidates
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Browse Jobs
            </Typography>
            <Typography variant="body2" color="textSecondary">
              FAQs
            </Typography>
            {/* Add more links as required */}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              For Employers
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Post a Job
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Employer Dashboard
            </Typography>
            {/* Add more links as required */}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Follow Us
            </Typography>
            {/* Here, you can add social media icons */}
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
            {"© "}
            {new Date().getFullYear()}
            {" Your Company. All rights reserved."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
