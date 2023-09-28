import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { styled } from "@mui/system";

const AboutContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(6),
}));

const AboutHeader = styled(Box)({
  textAlign: "center",
  marginBottom: "40px",
});

const AboutTitle = styled(Typography)({
  fontWeight: 700,
  marginBottom: "20px",
});

const AboutSubtitle = styled(Typography)({
  fontWeight: 500,
});

const SectionTitle = styled(Typography)({
  fontWeight: 600,
  marginBottom: "20px",
});

function About() {
  return (
    <AboutContainer>
      <AboutHeader>
        <AboutTitle variant="h2">About Us</AboutTitle>
        <AboutSubtitle variant="h5">
          Your Gateway to Freelance Industry Jobs - Discover SIT Gigs
        </AboutSubtitle>
      </AboutHeader>

      {[
        {
          title: "Who We Are",
          description:
            "We are SIT Gigs, a community built around the aspirations of university students...",
        },
        {
          title: "What We Offer",
          description: "Whether you're a talented writer, a coding wizard...",
        },
        {
          title: "Our Commitment",
          description:
            "We are committed to creating a safe and supportive environment...",
        },
        {
          title: "Get Started Today!",
          description:
            "Are you ready to embark on your side hustle journey?...",
        },
        {
          title: "Stay Connected",
          description:
            "Stay in the loop with the latest opportunities, success stories...",
        },
        {
          title: "Contact Us",
          description:
            "Got questions or need assistance? Our support team is here to help...",
        },
      ].map((section, index) => (
        <Box key={index} mb={5}>
          <SectionTitle variant="h4">{section.title}</SectionTitle>
          <Typography variant="body1">{section.description}</Typography>
        </Box>
      ))}
    </AboutContainer>
  );
}

export default About;
