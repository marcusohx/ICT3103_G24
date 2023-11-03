import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import { styled } from "@mui/system";
import "./About.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(180deg, #a0e7e5, #f8fff4)`,
  padding: "100px 0",
  height: "200px",
  textAlign: "center",
  margin: "20px -100%",
}));

const AboutContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
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
  marginBottom: "40px",
});

const SectionTitle = styled(Typography)({
  fontWeight: 600,
  marginBottom: "20px",
  textAlign: "center",
});

function About() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <AboutContainer>
      {/* <BackgroundImage /> Background image appears above */}
      <HeroSection data-aos="fade-up">
        <AboutTitle variant="h2">About Us</AboutTitle>
        <AboutSubtitle variant="h5">
          Your Gateway to Freelance Industry Jobs - Discover SIT Gigs
        </AboutSubtitle>
      </HeroSection>

      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Box>
            <SectionTitle variant="h4">Who We Are</SectionTitle>
            <Typography variant="body1" textAlign="center">
              We are SIT Gigs, a community built around the aspirations of
              university students. Our platform is designed to connect talented
              students with exciting freelance opportunities. We believe in the
              power of education and the potential of every student to make a
              meaningful impact in the freelance industry. With SIT Gigs, you
              can unleash your creativity, gain real-world experience, and earn
              while you learn.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box>
            <SectionTitle variant="h4" centered>
              What We Offer
            </SectionTitle>
            <Typography variant="body1" textAlign="center">
              Whether you're a talented writer, a coding wizard, a creative
              designer, or a skilled marketer, we've got something for you. At
              SIT Gigs, we offer a wide range of freelance gigs and projects to
              match your skills and interests. You can explore opportunities to
              work on diverse projects, build your portfolio, and collaborate
              with clients from around the world. We provide a platform to
              showcase your talent and connect with businesses looking for your
              expertise.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box>
            <SectionTitle variant="h4">Our Commitment</SectionTitle>
            <Typography variant="body1" textAlign="center">
              We are committed to creating a safe and supportive environment for
              students and freelancers. Your security and satisfaction are our
              top priorities. We employ advanced security measures to protect
              your personal information and ensure a secure experience on our
              platform. Our support team is always here to assist you, answer
              your questions, and address any concerns. With SIT Gigs, you can
              pursue your freelancing journey with confidence.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box>
            <SectionTitle variant="h4">Get Started Today!</SectionTitle>
            <Typography variant="body1" textAlign="center">
              Are you ready to embark on your side hustle journey? Join SIT Gigs
              today and start exploring freelance opportunities that match your
              skills and interests. It's easy to get started – create your
              profile, browse available gigs, and submit proposals to clients.
              Build your freelancing career, gain valuable experience, and earn
              income while you're still in school. Your journey begins here!
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box>
            <SectionTitle variant="h4">Stay Connected</SectionTitle>
            <Typography variant="body1" textAlign="center">
              Stay in the loop with the latest opportunities, success stories,
              and community updates. Connect with us on social media, follow our
              blog, and subscribe to our newsletter. Be part of a vibrant
              community of student freelancers and entrepreneurs. Discover
              inspiring success stories and get insights into the freelance
              industry. With SIT Gigs, you're never alone on your freelancing
              journey.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box>
            <SectionTitle variant="h4" centered>
              Contact Us
            </SectionTitle>
            <Typography variant="body1" textAlign="center">
              Got questions or need assistance? Our support team is here to
              help. We value your feedback and are eager to assist you with any
              inquiries. Reach out to us via email, phone, or our online contact
              form. We're dedicated to providing excellent customer support and
              ensuring your experience with SIT Gigs is smooth and enjoyable.
              Don't hesitate to get in touch with us – we're here for you.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </AboutContainer>
  );
}

export default About;