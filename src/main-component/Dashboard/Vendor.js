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
import Dashboard from "./VendorDashboard/Dashboard";
import AuctionProducts from "./VendorDashboard/AuctionProducts";
import NewProduct from "./VendorDashboard/NewProduct";
import Products from "./VendorDashboard/Products";
import Orders from "./VendorDashboard/Orders";
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

const Vendor = () => {
  let { vid } = useParams();
  const classes = useStyles();
  const [Progress, setProgress] = React.useState(false);
  const [state, setState] = React.useState({
    dash: vid === "1" ? true : false,
    pro: vid === "2" ? true : false,
    apro: vid === "3" ? true : false,
    auction: vid === "4" ? true : false,
    order: vid === "5" ? true : false,
    account: vid === "6" ? true : false,
    logout: vid === false,
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
          <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
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
                    apro: false,
                    auction: false,
                    order: false,
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
                    apro: false,
                    auction: false,
                    order: false,
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
                className={state.apro ? classes.active : classes.basic}
                onClick={() => {
                  setState({
                    dash: false,
                    pro: false,
                    auction: false,
                    order: false,
                    account: false,
                    apro: true,
                  });
                }}
              >
                <StyledTypography>ADD PRODUCT</StyledTypography>
              </Grid>
              <Grid
                item
                xs
                className={state.auction ? classes.active : classes.basic}
                onClick={() => {
                  setState({
                    dash: false,
                    apro: false,
                    pro: false,
                    order: false,
                    account: false,
                    auction: true,
                  });
                }}
              >
                <StyledTypography>AUCTION DETAILS</StyledTypography>
              </Grid>
              <Grid
                item
                xs
                className={state.order ? classes.active : classes.basic}
                onClick={() => {
                  setState({
                    dash: false,
                    apro: false,
                    pro: false,
                    account: false,
                    auction: false,
                    order: true,
                  });
                }}
              >
                <StyledTypography>ORDERS</StyledTypography>
              </Grid>
              <Grid
                item
                xs
                className={state.account ? classes.active : classes.basic}
                onClick={() => {
                  setState({
                    dash: false,
                    apro: false,
                    pro: false,
                    order: false,
                    auction: false,
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
                    deleteCookie("cart");
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
          <Grid
            item
            xs={9}
            sx={{
              bgcolor: "#f9f9f9",
              padding: "20px",
            }}
          >
            {state.dash && <Dashboard />}
            {state.pro && <Products />}
            {state.apro && <NewProduct />}
            {state.auction && <AuctionProducts />}
            {state.order && <Orders />}
            {state.account && <Account />}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};
export default Vendor;
