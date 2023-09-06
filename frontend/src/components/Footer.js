import React from "react";
import { Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Container
      maxWidth="md"
      style={{
        backgroundColor: "#fff",
        boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
        padding: "1rem",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography variant="body1" align="center">
        &copy; 2023 Payroll System, Inc.
      </Typography>
    </Container>
  );
};

export default Footer;
