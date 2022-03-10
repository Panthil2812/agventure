import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { getCookie, deleteCookie } from "../Validator/CookieFunction";
const Dashbord = () => {
  const [Progress, setProgress] = React.useState(false);
  let navigate = useNavigate();
  let username = "";
  let password = "";
  const login = JSON.parse(getCookie("login"));
  if (login !== "") {
    username = login.email;
    password = login.password;
  }
  const handleClose = () => {
    setProgress(false);
  };

  const LogoutToDashbord = (message) => {
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
            severity="success"
            sx={{ width: "100%", texttransform: "capitalize" }}
          >
            {message}
          </Alert>
        </Snackbar>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={Progress}
          onClick={handleClose}
        >
          <CircularProgress color="success" />
        </Backdrop>
      </>
    );
  };

  return (
    <>
      <h1>Dashbord PAGE</h1>
      <h1>UserName : {username}</h1>
      <h1>Passowrd : {password}</h1>
      <div>
        <Button
          variant="contained"
          color="success"
          align="center"
          onClick={() => {
            //
            setProgress(true);
            //deleteCookie("login");
            setTimeout(() => {
              //
              deleteCookie("login");
              window.location.replace("/");
              setProgress(false);

              //  navigate("/");
              //
            }, 2000);
          }}
        >
          Logout
          {Progress &&
            LogoutToDashbord(
              "Congratulation,You have Successfully logged out,Redirecting...."
            )}
        </Button>
        {/* {} */}
      </div>
    </>
  );
};

export default Dashbord;
