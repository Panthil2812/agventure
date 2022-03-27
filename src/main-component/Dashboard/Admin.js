import * as React from "react";
import { useParams } from "react-router-dom";
import {
  CircularProgress,
  Alert,
  Snackbar,
  Backdrop,
  styled,
  Grid,
  Breadcrumbs,
  Link,
  Typography,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getCookie, deleteCookie } from "../Validator/CookieFunction";
import Account from "./Account";
import AddBlogs from "./AdminDashboard/AddBlogs";
import Dashboard from "./AdminDashboard/Dashboard";
import Newadmin from "./AdminDashboard/Newadmin";
import UsersAccount from "./AdminDashboard/UsersAccount";
import Products from "./AdminDashboard/Products";
import { Outlet } from "react-router-dom";
import Footer from "../sub-component/Footer";

const useStyles = makeStyles(() => ({
  active: {
    backgroundColor: "#f9f9f9",
    color: "#325240",
    padding: "10px",
  },
  basic: {
    backgroundColor: "#325240",
    color: "#f9f9f9",
    padding: "10px",
    "&:hover": {
      backgroundColor: "#f9f9f9",
      color: "#325240",
      padding: "10px",
    },
  },
}));
const StyledTypography = styled(Typography)({
  fontSize: "18px",
  margin: "8px",
});

const Admin = () => {
  let { aid } = useParams();
  const classes = useStyles();
  const [Progress, setProgress] = React.useState(false);
  const [state, setState] = React.useState({
    dash: aid === "1" ? true : false,
    pro: aid === "2" ? true : false,
    user: aid === "3" ? true : false,
    blog: aid === "4" ? true : false,
    admin: aid === "5" ? true : false,
    account: aid === "6" ? true : false,
    logout: aid === false,
  });
  const handleClose = () => {
    setProgress(false);
  };

  const LogoutToHome = (message) => {
    return (
      <>
        <Snackbar
          open={Progress}
          sx={{ width: "50%" }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            variant="filled"
            onClose={handleClose}
            sx={{
              width: "100%",
              texttransform: "capitalize",
              bgcolor: "#325240",
            }}
          >
            {message}
          </Alert>
        </Snackbar>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={Progress}
          onClick={handleClose}
        >
          <CircularProgress sx={{ color: "#325240" }} />
        </Backdrop>
      </>
    );
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
      <Box
        sx={{
          padding: "30px",
          bgcolor: "#f9f9f9",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={3} sx={{ bgcolor: "#f9f9f9", padding: "20px" }}>
            <Box sx={{ boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.2)" }}>
              <Grid
                item
                xs
                className={state.dash ? classes.active : classes.basic}
                onClick={() => {
                  setState({
                    pro: false,
                    user: false,
                    blog: false,
                    admin: false,
                    account: false,
                    dash: true,
                  });
                }}
              >
                <StyledTypography>DASHBOARD</StyledTypography>
              </Grid>
              <Grid
                item
                xs
                className={state.pro ? classes.active : classes.basic}
                onClick={() => {
                  setState({
                    dash: false,
                    user: false,
                    blog: false,
                    admin: false,
                    account: false,
                    pro: true,
                  });
                }}
              >
                <StyledTypography>PRODUCTS</StyledTypography>
              </Grid>
              <Grid
                item
                xs
                className={state.user ? classes.active : classes.basic}
                onClick={() => {
                  setState({
                    dash: false,
                    pro: false,
                    blog: false,
                    admin: false,
                    account: false,
                    user: true,
                  });
                }}
              >
                <StyledTypography>USERS ACCOUNT</StyledTypography>
              </Grid>
              <Grid
                item
                xs
                className={state.blog ? classes.active : classes.basic}
                onClick={() => {
                  setState({
                    dash: false,
                    user: false,
                    pro: false,
                    admin: false,
                    account: false,
                    blog: true,
                  });
                }}
              >
                <StyledTypography>ADD BLOGS</StyledTypography>
              </Grid>
              <Grid
                item
                xs
                className={state.admin ? classes.active : classes.basic}
                onClick={() => {
                  setState({
                    dash: false,
                    user: false,
                    pro: false,
                    account: false,
                    blog: false,
                    admin: true,
                  });
                }}
              >
                <StyledTypography>ADD NEW ADMIN</StyledTypography>
              </Grid>
              <Grid
                item
                xs
                className={state.account ? classes.active : classes.basic}
                onClick={() => {
                  setState({
                    dash: false,
                    user: false,
                    pro: false,
                    admin: false,
                    blog: false,
                    account: true,
                  });
                }}
              >
                <StyledTypography>ACCOUNT DETAILS</StyledTypography>
              </Grid>
              <Grid
                item
                xs
                className={state.logout ? classes.active : classes.basic}
                onClick={() => {
                  setState({
                    logout: true,
                  });
                  setProgress(true);
                  setTimeout(() => {
                    deleteCookie("token");
                    deleteCookie("account");
                    window.location.replace("/");
                    setProgress(false);
                  }, 2000);
                }}
              >
                <StyledTypography>
                  LOGOUT
                  {Progress &&
                    LogoutToHome(
                      "Congratulation,You have Successfully logged out,Redirecting...."
                    )}
                </StyledTypography>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={9} sx={{ bgcolor: "#f9f9f9", padding: "20px" }}>
            {state.dash && <Dashboard />}
            {state.pro && <Products />}
            {state.user && <UsersAccount />}
            {state.blog && <AddBlogs />}
            {state.admin && <Newadmin />}
            {state.account && <Account />}
            <Outlet />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};
export default Admin;
