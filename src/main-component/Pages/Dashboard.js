import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Vendor from "../Dashboard/Vendor";
import Customer from "../Dashboard/Customer";
import Admin from "../Dashboard/Admin";
import Footer from "../sub-component/Footer";
import { setCookie, getCookie } from "../Validator/CookieFunction";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

const dashboard = () => {
  const account = JSON.parse(getCookie("account"));
  const type = account.type;
  const whichDashboard = () => {
    if (type === 1) {
      return <Customer />;
    } else if (type === 0) {
      return <Vendor />;
    } else if (type === 3) {
      return <Admin />;
    }
  };
  return (
    <>
      <Box
        sx={{
          bgcolor: "#f9f9f9",
          paddingLeft: "20px",
          borderBottom: "2px outset #325240",
        }}
      >
        <Breadcrumbs aria-label="breadcrumb" separator="›">
          <Link underline="hover" color="inherit" href="/">
            <h2>Home</h2>
          </Link>
          <Typography color="" sx={{ fontSize: "24px", fontWeight: "bold" }}>
            My Dashbord
          </Typography>
        </Breadcrumbs>
      </Box>
      {whichDashboard()}
      <Footer />
    </>
  );
};

export default dashboard;
