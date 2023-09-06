import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Payroll System
        </Typography>
        <Button color="inherit" href="#dashboard">
          Dashboard
        </Button>
        <Button color="inherit" href="#employees">
          Employees
        </Button>
        <Button color="inherit" href="#payroll">
          Payroll
        </Button>
        <Button color="inherit" href="#reports">
          Reports
        </Button>
        <Button color="inherit" href="#settings">
          Settings
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
