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
import ComputerIcon from "@mui/icons-material/Computer";
import BusinessIcon from "@mui/icons-material/Business";
import CampaignIcon from "@mui/icons-material/Campaign";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
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
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      {/* Hero Section */}
      <HeroSection data-aos="fade-up">
        <HeroTitle variant="h2">Find Your Dream Job</HeroTitle>
        <HeroSubtitle variant="h6">
          Discover thousands of opportunities we have for you
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
          Top Categories
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: "Software",
              icon: <ComputerIcon fontSize="large" />,
              description: "Find your dream software job",
            },
            {
              title: "Finance",
              icon: <BusinessIcon fontSize="large" />,
              description: "Roles in the financial sector",
            },
            {
              title: "Marketing",
              icon: <CampaignIcon fontSize="large" />,
              description: "Marketing jobs and opportunities",
            },
            {
              title: "Healthcare",
              icon: <HealthAndSafetyIcon fontSize="large" />,
              description: "Healthcare and medical field roles",
            },
          ].map((category, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
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
              JobBox
            </Typography>
            <Typography variant="h6" gutterBottom>
              Millions Of Jobs. Find The One That’s Right For You
            </Typography>
            <Typography variant="body1" paragraph>
              Search all the open positions on the web. Get your own
              personalized salary estimate. Read reviews on over 600,000
              companies worldwide. The right job is out there.
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

      <Container
        sx={{
          my: 10,
          background: "#e0e0e0",
          padding: "20px",
          borderRadius: "15px",
        }}
        data-aos="fade-up"
      >
        <Grid container spacing={4}>
          {[
            {
              title: "25K+",
              subtitle: "Completed Cases",
              description:
                "We always provide people a complete solution focused on any business.",
            },
            {
              title: "17+",
              subtitle: "Our Offices",
              description:
                "We always provide people a complete solution focused on any business.",
            },
            {
              title: "86+",
              subtitle: "Skilled People",
              description:
                "We always provide people a complete solution focused on any business.",
            },
            {
              title: "28+",
              subtitle: "Happy Clients",
              description:
                "We always provide people a complete solution focused on any business.",
            },
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" component="div" gutterBottom>
                  {stat.title}
                </Typography>
                <Typography variant="subtitle1" component="div" gutterBottom>
                  {stat.subtitle}
                </Typography>
                <Typography variant="body2">{stat.description}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Jobs Section */}
      <Container sx={{ my: 10 }} data-aos="fade-up">
        <Typography variant="h4" gutterBottom>
          Featured Jobs
        </Typography>
        <Grid container spacing={4}>
          {["Job 1", "Job 2", "Job 3", "Job 4"].map((job, index) => (
            <Grid item xs={12} md={6} key={index}>
              <JobCard>
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://via.placeholder.com/150?text=${job}`}
                  alt={`${job} image`}
                />
                <CardContent>
                  <Typography variant="h6">{job}</Typography>
                  <Typography variant="body2">Company Name</Typography>
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
