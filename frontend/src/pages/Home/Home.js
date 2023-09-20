import React from "react";
import { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Container,
} from "@mui/material";
import { styled } from "@mui/system";
import SchoolIcon from "@mui/icons-material/School";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import RedeemIcon from "@mui/icons-material/Redeem";
import AOS from "aos";
import "aos/dist/aos.css";

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(180deg, #a0e7e5, #f8fff4)`,
  padding: "100px 0",
  textAlign: "center",
}));

const HeroTitle = styled(Typography)({
  marginBottom: "20px",
  fontWeight: 700,
});

const HeroSubtitle = styled(Typography)({
  marginBottom: "40px",
});

const SearchField = styled(TextField)({
  width: "300px",
  marginRight: "20px",
});

const CategoryCard = styled(Card)(({ theme }) => ({
  padding: "20px",
  borderRadius: "15px",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.03)",
  },
  background: "#f0f0f0",
  display: "flex",
  alignItems: "center",
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginLeft: theme.spacing(2),
}));

const CategoryDescription = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  color: "#555",
}));

const JobCard = styled(Card)(({ theme }) => ({
  borderRadius: "10px",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
  transition: "box-shadow 0.3s",
  "&:hover": {
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
  },
}));

function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <HeroSection data-aos="fade-up">
        <HeroTitle variant="h2">Welcome to SIT Gigs</HeroTitle>
        <HeroSubtitle variant="h6">
          Bridging SIT students with IT companies for unique opportunities and
          collaborations.
        </HeroSubtitle>
        <Grid container justifyContent="center">
          <SearchField
            label="Job title, keywords, or company"
            variant="outlined"
          />
          <Button variant="contained" color="primary">
            Search
          </Button>
        </Grid>
      </HeroSection>

      {/* Categories Section */}
      <Container sx={{ my: 10 }} data-aos="fade-up">
        <Typography variant="h4" gutterBottom>
          Discover Opportunities in Top Categories
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: "Student Opportunities",
              icon: <SchoolIcon fontSize="large" />,
              description: "Projects tailored for SIT students",
            },
            {
              title: "Business Collaborations",
              icon: <BusinessCenterIcon fontSize="large" />,
              description: "Collaborations with IT companies",
            },
            {
              title: "Redeem Rewards",
              icon: <RedeemIcon fontSize="large" />,
              description: "Earn and redeem exclusive rewards",
            },
          ].map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CategoryCard elevation={0}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {category.icon}
                  <Box sx={{ ml: 2 }}>
                    <CategoryTitle variant="h6">{category.title}</CategoryTitle>
                    <CategoryDescription variant="body2">
                      {category.description}
                    </CategoryDescription>
                  </Box>
                </Box>
              </CategoryCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* JobBox Section */}
      <Container sx={{ my: 10 }} data-aos="fade-up">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Project Opportunities at Your Fingertips
            </Typography>
            <Typography variant="h6" gutterBottom>
              Find the perfect project tailored to your skills and ambitions
            </Typography>
            <Typography variant="body1" paragraph>
              SIT Gigs streamlines the connection between talented students and
              top IT companies. Explore the latest project listings, understand
              the required skills and timelines, and take the next big step in
              your career.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src="https://via.placeholder.com/600x400"
              alt="JobBox Image"
              style={{ width: "100%", borderRadius: "15px" }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Featured Jobs Section */}
      <Container sx={{ my: 10 }} data-aos="fade-up">
        <Typography variant="h4" gutterBottom>
          Exclusive Benefits for SIT Students
        </Typography>
        <Grid container spacing={4}>
          {/* Featured jobs data to be mapped here. Use JobCard for individual job listings. */}
          {[1, 2, 3].map((job, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <JobCard>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://via.placeholder.com/600x400"
                  alt="Job Image"
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Job Title {index}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Job description and details here
                  </Typography>
                </CardContent>
              </JobCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default HomePage;
