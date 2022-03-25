import * as React from "react";
import {CircularProgress,Alert,Snackbar,Backdrop,styled,Grid,Breadcrumbs,Link,Typography,Box} from "@mui/material";
import { getCookie, deleteCookie } from "../Validator/CookieFunction";
import { makeStyles } from "@mui/styles";
import Account from "./Account";
import Dashboard from "./CustomerDashboard/Dashboard";
import MyBids from "./CustomerDashboard/MyBids";
import Orders from "./CustomerDashboard/Orders";

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
const Customer = () => {
  const classes = useStyles();
  const [Progress, setProgress] = React.useState(false);
  const [state, setState] = React.useState({
    dash: true,
    pro: false,
    apro: false,
    auction: false,
    order: false,
    account: false,
    logout: false,
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
                className={state.order ? classes.active : classes.basic}
                onClick={() => {
                  setState({
                    dash: false,
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
                className={state.auction ? classes.active : classes.basic}
                onClick={() => {
                  setState({
                    dash: false,
                    order: false,
                    account: false,
                    auction: true,
                  });
                }}
              >
                <StyledTypography>MY AUCTION BIDS</StyledTypography>
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
            {state.order && <Orders />}
            {state.auction && <MyBids />}
            {state.account && <Account />}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default Customer;
