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
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ComputerIcon from "@mui/icons-material/Computer";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SearchIcon from "@mui/icons-material/Search";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import WorkIcon from "@mui/icons-material/Work";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AOS from "aos";
import "aos/dist/aos.css";
import educationJPG from "../../assets/Education.jpg";
import bookstech from "../../assets/bookstech.jpg";
import amazonian from "../../assets/amazonian.jpg";
import mechanic from "../../assets/mechanic.jpg";

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(180deg, #a0e7e5, #f8fff4)`,
  padding: "100px 0",
  height: "300px",
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
  padding: "10px",
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
      <Container sx={{ my: 10, py: 5 }} data-aos="fade-up">
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", padding: "20px" }}
        >
          Discover Opportunities in Top Categories
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: "Technology",
              icon: <ComputerIcon fontSize="large" />,
            },
            {
              title: "Accountancy",
              icon: <BusinessCenterIcon fontSize="large" />,
            },
            {
              title: "Mobile",
              icon: <PhoneAndroidIcon fontSize="large" />,
            },
            {
              title: "Engineering",
              icon: <EngineeringIcon fontSize="large" />,
            },
            {
              title: "Digital Art",
              icon: <ColorLensIcon fontSize="large" />,
            },
            {
              title: "F & B",
              icon: <RestaurantIcon fontSize="large" />,
            },
          ].map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{ mb: 4 }}>
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
      <Container sx={{ my: 10, py: 10 }} data-aos="fade-up">
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
              src={educationJPG}
              alt="JobBox"
              style={{ width: "100%", borderRadius: "15px" }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Featured Jobs Section */}
      <Container sx={{ my: 10, py: 10 }} data-aos="fade-up">
        <Typography variant="h4" gutterBottom>
          Exclusive Benefits for SIT Students
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <JobCard style={{ margin: "0 16px" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={bookstech}
                  alt="Job Image"
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Software Engineer (backend)
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Build backend solution for a book managing software. Main
                    language in C#, to code logic and authenticate from backend
                    database mongoDB
                  </Typography>
                </CardContent>
              </JobCard>

              <JobCard style={{ margin: "0 16px" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={amazonian}
                  alt="Job Image"
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Full Stack Engineer
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Design and develop responsive and stylish user interframe
                    framework and web component. Using technology like HTML5,
                    CSS3, REST
                  </Typography>
                </CardContent>
              </JobCard>

              <JobCard style={{ margin: "0 16px" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={mechanic}
                  alt="Job Image"
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Mechanical Engineer
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Analyze mechanical problems and produce innovative solutions
                    using multiple fabrication and material methods such as
                    molding, aluminum casting.
                  </Typography>
                </CardContent>
              </JobCard>
            </div>
          </Grid>
        </Grid>
      </Container>

      {/*How it Works Section */}
      <Container sx={{ my: 10, py: 10 }} data-aos="fade-up">
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", padding: "20px" }}
        >
          How it Works
        </Typography>
        <Grid
          container
          spacing={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {[
            {
              title: "1. Search for a gig",
              icon: <SearchIcon fontSize="large" />,
              description:
                "Browse and search for the particular gig or job that you want to do based on your skills and interest.",
            },
            {
              title: "2. Apply for gig",
              icon: <WorkIcon fontSize="large" />,
              description:
                "Apply for the job and wait for the employer to get back to you.",
            },
            {
              title: "3. Accept your gig",
              icon: <ThumbUpIcon fontSize="large" />,
              description:
                "After submitting an application, accept the offer by the company to officially begin your journey.",
            },
            {
              title: "4. Get rewarded after",
              icon: <EmojiEventsIcon fontSize="large" />,
              description:
                "After completing the job, get credits based on the job to exchange for good stuff!",
            },
          ].map((category, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} sx={{ mb: 4 }}>
              <CategoryCard
                elevation={0}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 100,
                  }}
                >
                  {category.icon}
                </CardMedia>
                <CardContent sx={{ height: "150px", textAlign: "left" }}>
                  <CategoryTitle variant="h6" sx={{ textAlign: "left" }}>
                    {category.title}
                  </CategoryTitle>
                  <CategoryDescription variant="body2">
                    {category.description}
                  </CategoryDescription>
                </CardContent>
              </CategoryCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default HomePage;