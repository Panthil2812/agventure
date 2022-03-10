import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import Copyright from "../sub-component/Copyright";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { setCookie, getCookie } from "../Validator/CookieFunction";

const theme = createTheme();
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderWidth: "2px",
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderWidth: "2px",
      borderColor: "green",
    },
    "&:hover fieldset": {
      borderWidth: "2px",
      borderColor: "green",
    },
    "&.Mui-focused fieldset": {
      borderWidth: "2px",
      borderColor: "green",
    },
  },
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function SignInSide() {
  let navigate = useNavigate();

  const checklogin = getCookie("login");
  const [state, setState] = React.useState({
    open: false,
    isLogged: false,
    message: "",
  });
  const { isLogged, open, message } = state;
  const [dialog, setDialog] = React.useState(false);
  const [Forget, setForget] = React.useState({
    isForget: false,
    fEmail: "",
    fPassword: "",
  });
  const { isForget, fEmail, fPassword } = Forget;

  const [remember, setRemember] = React.useState({
    rEmail: getCookie("username") ? getCookie("username") : "",
    rPassword: "",
  });
  const { rEmail, rPassword } = remember;
  const handleClickDialog = () => {
    setForget({
      isForget: false,
      fEmail: "",
      fPassword: "",
    });
    setDialog(true);
  };

  const handleCloseDialog = () => {
    setDialog(false);
  };
  const handleSubmitDialog = () => {
    if (!isEmail(fEmail)) {
      setState({
        open: true,
        message: "Please Enter a Valid Email-Id Address.",
      });
    } else if (fEmail !== "pmalaviya356@rku.ac.in") {
      setState({
        open: true,
        message:
          "The user ID you entered does not exist.Please check that you have typed your ID correctly.",
      });
    } else if (
      !isStrongPassword(fPassword, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setState({
        open: true,
        message:
          "Please password must be at least 8 characters long and at least one Symbols,Number.",
      });
    } else {
      console.log(fEmail);
      console.log(fPassword);
      setForget({
        isForget: true,
      });
      setDialog(false);
      setState({
        open: true,
        message: "Your Password has been changed Successfully.",
      });
    }
  };
  const errorfunction = () => {
    if (isForget) {
      return (
        <div>
          <Snackbar
            open={open}
            sx={{ width: "50%" }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert
              variant="filled"
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
          {/* <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isForget}
            onClick={handleClose}
          >
            <CircularProgress color="success" />
          </Backdrop> */}
        </div>
      );
    } else if (isLogged) {
      return (
        <div>
          <Snackbar
            open={open}
            sx={{ width: "50%" }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert
              variant="filled"
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLogged}
            onClick={handleClose}
          >
            <CircularProgress color="success" />
          </Backdrop>
        </div>
      );
    } else {
      return (
        <div>
          <Snackbar
            open={open}
            sx={{ width: "50%" }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert
              variant="filled"
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
        </div>
      );
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // // eslint-disable-next-line no-console
    const info = {
      email: data.get("email").toString(),
      password: data.get("password").toString(),
      checkbox: data.get("checkbox"),
    };
    if (isEmail(info.email) && info.password === "1234567890") {
      setState({
        isLogged: true,
        open: true,
        message:
          "Congratulation,You have Successfully logged in, Redirecting....",
      });
      if (info.checkbox) {
        setCookie("username", info.email, 24);
      }
      setCookie("login", JSON.stringify(info), 1);
      setTimeout(() => {
        // navigate("/");
        window.location.replace("/");
      }, 3000);
    } else {
      setState({
        open: true,
        message: "Invalid Username/email and password",
      });
      // console.log(state);
    }
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const buttons = (
    <React.Fragment>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="success"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
      <div>{errorfunction()}</div>
    </React.Fragment>
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid
          container
          component="main"
          sx={{ height: "100vh", color: "green" }}
        >
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#33691e" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                sx={{ color: "#33691e", fontWeight: "bold" }}
              >
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <CssTextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={rEmail}
                  onChange={(e) => {
                    setRemember({
                      ...remember,
                      rEmail: e.target.value,
                    });
                  }}
                  autoComplete="email"
                  autoFocus
                />
                <CssTextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  sx={{ color: "#33691e" }}
                  control={
                    <Checkbox
                      value="remember"
                      name="checkbox"
                      id="checkbox"
                      color="success"
                    />
                  }
                  label="Remember me"
                />
                {buttons}
                <Grid container>
                  <Grid item xs>
                    <div>
                      <Typography
                        component="span"
                        variant="h5"
                        onClick={handleClickDialog}
                        sx={{
                          color: "#33691e",
                          fontWeight: "bold",
                          fontSize: 15,
                        }}
                      >
                        <u> Forgot password?</u>
                      </Typography>
                      <Dialog
                        open={dialog}
                        TransitionComponent={Transition}
                        keepMounted
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <DialogTitle
                          align="center"
                          sx={{
                            color: "#33691e",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                        >
                          Forgot password?
                        </DialogTitle>
                        <DialogContent>
                          <CssTextField
                            margin="normal"
                            required
                            fullWidth
                            name="username"
                            label="UserName"
                            type="email"
                            id="username"
                            value={fEmail}
                            onChange={(e) => {
                              setForget({
                                ...Forget,
                                fEmail: e.target.value,
                              });
                              // console.log("email: " + fEmail);
                            }}
                          />
                          <CssTextField
                            margin="normal"
                            required
                            fullWidth
                            name="fpassword"
                            label="New Password"
                            type="password"
                            id="fpassword"
                            value={fPassword}
                            onChange={(e) => {
                              setForget({
                                ...Forget,
                                fPassword: e.target.value,
                              });
                              // console.log("password: " + fPassword);
                            }}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button
                            variant="contained"
                            color="success"
                            align="right"
                            onClick={handleCloseDialog}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            color="success"
                            align="center"
                            onClick={handleSubmitDialog}
                          >
                            Submit
                          </Button>
                          <div>{errorfunction()}</div>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </Grid>
                  <Grid item>
                    <Link
                      href="/signup"
                      variant="body2"
                      sx={{ color: "#33691e", fontWeight: "bold" }}
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
