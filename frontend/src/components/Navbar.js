import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { EmployerAuthContext } from "../contexts/EmployerAuthContext";
import { useLocation } from "react-router-dom";

export default function PrimarySearchAppBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { authState, logout: userLogout } = useContext(AuthContext);
  const { employerAuthState, employerlogout: employerLogout } =
    useContext(EmployerAuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [useProfile, setUseProfile] = useState("empty");
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) =>
    setMobileMoreAnchorEl(event.currentTarget);

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  const handleLogout = () => {
    if (authState) {
      userLogout();
    } else if (employerAuthState) {
      employerLogout();
    }
    navigate("/");
    handleMenuClose();
  };

  // Simulating fetching the auth state - you would typically do this when fetching from an API
  useEffect(() => {
    if (authState || employerAuthState) {
      setUseProfile(
        authState ? authState.username : employerAuthState.username
      );
    }
  }, [authState, employerAuthState]);

  const commonMenuItems = [
    { text: "Home", path: "/" },
    { text: "About", path: "/about" },
  ];

  const userMenuItems = [
    {
      text: "User Profile",
      path: `/user/profile/${useProfile}`,
    },
    { text: "User Settings", path: "/user/profilesettings" },
    { text: "Job Listings", path: "/joblistings" },
    { text: "Shop", path: "/shop" },
  ];

  const employerMenuItems = [
    { text: "Employer Profile", path: "/employer/profile" },
    { text: "Job Listings", path: "/joblistings" },
    { text: "Create Job Listing", path: "/createjoblisting" },
    { text: "Job listed", path: "/employerjoblistings" },
  ];

  const unAuthMenuItems = [{ text: "Login", path: "/chooserole" }];

  const getMenuItems = () => {
    if (authState) {
      return [...commonMenuItems, ...userMenuItems];
    }
    if (employerAuthState) {
      return [...commonMenuItems, ...employerMenuItems];
    }
    return [...commonMenuItems, ...unAuthMenuItems];
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>
      <Link
        to="/my-account"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Link>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* ... (same as your existing code) */}
    </Menu>
  );

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={handleDrawerClose}
      onKeyDown={handleDrawerClose}
    >
      <List>
        {getMenuItems().map((option, index) => (
          <Link
            to={option.path}
            key={option.text}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem button>
              <Typography>{option.text}</Typography>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const appBarStyles = {
    backgroundColor:
      location.pathname === "/"
        ? isScrolled
          ? "#fff"
          : "transparent"
        : "#fff",
    transition: "background-color 0.5s ease",
    boxShadow: isScrolled ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
  };
  const mainContainerStyles = {
    pt: location.pathname === "/" ? "0px" : "64px",
  };

  // Conditionally render the Drawer based on authState or employerAuthState
  const renderDrawer = () => {
    if (!authState && !employerAuthState) {
      return null; // Hide the Drawer when neither authState nor employerAuthState is logged in
    }

    return (
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        {list}
      </Drawer>
    );
  };

  return (
    <Box sx={mainContainerStyles}>
      <AppBar position="fixed" sx={appBarStyles}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, color: "gray" }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton> */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "left" }}>
            <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", color: "inherit" }}>
            <img src="../assets/SITGigs-Logo.png" width="40" height="40" style={{ marginRight: "8px" }} />
            <Typography variant="h6" noWrap component="div" sx={{ textAlign: "center", color: "gray" }} >
              SIT Gigs
            </Typography>
    </Link>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" }, color: "gray" }}>
            {authState && (
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ pr: 2, pt: 1, textAlign: "center", color: "gray" }}
              >
                User Credits: {authState.credits}
              </Typography>
            )}
            {employerAuthState && (
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ pr: 2, pt: 1, textAlign: "center", color: "gray" }}
              >
                Employer Credits: {employerAuthState.credits}
              </Typography>
            )}
                    {/* Add navigation links for Login and About pages */}
            <Link to="/chooserole" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ pr: 2, pt: 1, textAlign: "center", color: "gray" }}
              >
                Login
              </Typography>
            </Link>
            <Link to="/about" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ pr: 2, pt: 1, textAlign: "center", color: "gray" }}
              >
                About
              </Typography>
            </Link>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, color: "gray" }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderDrawer()} {/* Conditionally render the Drawer */}
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
