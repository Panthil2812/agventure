import * as React from "react";
import Box from "@mui/material/Box";
import { FaPhoneAlt } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import organic from "../../assets/Images/contact.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import validator from "validator";
const theme = createTheme();
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#325240",
  },
  "& .MuiInput-underline:after": {
    borderWidth: "2px",
    borderBottomColor: "#325240",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderWidth: "2px",
      borderColor: "#325240",
    },
    "&:hover fieldset": {
      borderWidth: "2px",
      borderColor: "#325240",
    },
    "&.Mui-focused fieldset": {
      borderWidth: "2px",
      borderColor: "#325240",
    },
  },
});
const CssFormControl = styled(FormControl)({
  "& .MuiFormControlLabel-label": {
    color: "#325240",
  },
  "::-webkit-scrollbar": {
    display: "none",
  },
  "& label.Mui-focused": {
    color: "#325240",
  },
  "& .MuiInput-underline:after": {
    borderWidth: "2px",
    borderBottomColor: "#325240",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderWidth: "2px",
      borderColor: "#325240",
    },
    "&:hover fieldset": {
      borderWidth: "2px",
      borderColor: "#325240",
    },
    "&.Mui-focused fieldset": {
      borderWidth: "2px",
      borderColor: "#325240",
    },
  },
});

const Contactform = () => {
  const [state, setState] = React.useState({
    flag: false,
    iscontact: false,
    message: "",
  });
  const { iscontact, flag, message } = state;

  const errorfunction = () => {
    if (iscontact) {
      return (
        <div>
          <Snackbar
            open={flag}
            sx={{ width: "50%" }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert
              variant="filled"
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%", bgcolor: "#325240" }}
            >
              {message}
            </Alert>
          </Snackbar>
        </div>
      );
    } else {
      return (
        <div>
          <Snackbar
            open={flag}
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
  const handleClose = () => {
    setState({ ...state, flag: false });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const info = {
      name: validator.trim(data.get("name")),
      emailid: validator.trim(data.get("emailid")),
      message: validator.trim(data.get("message")),
    };
    if (validator.isEmpty(info.name)) {
      setState({ flag: true, message: "Please Enter a Name." });
    } else if (!validator.isAlpha(info.firstname, ["en-IN"])) {
      setState({
        flag: true,
        message: "plase enter vaild Name",
      });
    } else if (validator.isEmpty(info.emailid)) {
      setState({
        flag: true,
        message: "Please Enter a Email Id.",
      });
    } else if (!validator.isEmail(info.emailid)) {
      setState({
        flag: true,
        message: "Please Enter a Valid Email-Id Address.",
      });
    } else if (validator.isEmpty(info.message)) {
      setState({ flag: true, message: "Please Enter a Message." });
    } else {
      setState({
        iscontact: true,
        flag: true,
        message: "Successfully send email",
      });
    }
  };

  const buttons = (
    <React.Fragment>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="success"
        sx={{ mt: 3, mb: 2, bgcolor: "#325240" }}
      >
        Submit
      </Button>
      <div>{errorfunction()}</div>
    </React.Fragment>
  );

  return (
    <>
      <Box
        sx={{
          bgcolor: "#fff",
          height: "100vh",
          padding: "50px",
          backgroundImage: `url(${organic})`,backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "#f9f9f9",
            height: "90vh",
            width: "80%",
            marginTop: "50px",
            float: "right",
            boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.4)",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              bgcolor: "#f9f9f9",
              height: "70vh",
              position: "absolute",
              width: "120vh",
              top: "40%",
              left: "30%",
              padding: "10px",
              color: "#325240",
            }}
          >
            <div>
              <h1>Get in Touch</h1>
              <h3>Feel free to drop us a line below!</h3>
            </div>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                my: 4,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CssTextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CssTextField
                    required
                    fullWidth
                    id="emailid"
                    label="Email Address"
                    name="emailid"
                    autoComplete="email"
                  />
                </Grid>

                <Grid item xs={12}>
                  <CssTextField
                    required
                    multiline
                    fullWidth
                    maxRows={3}
                    minRows={3}
                    id="outlined-multiline-flexible"
                    label="Message"
                    name="message"
                    autoComplete="message"
                  />
                </Grid>
              </Grid>
              {buttons}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            bgcolor: "#325240",
            height: "70vh",
            width: "25%",
            position: "absolute",
            top: "40%",
            boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.4)",
            borderRadius: "25px",
          }}
        >
          <div
            style={{
              color: "#fff",
              width: "100%",
              height: "100%",
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>CONTACT US</h1>
            <div align="left">
              <hr
                style={{
                  height: "2px",
                  borderWidth: "0",
                  backgroundColor: "#fff",
                }}
              />

              <div style={{ margin: "15px" }}>
                <ImLocation2 /> Rk University,Rajkot
              </div>
              <div style={{ margin: "15px" }}>
                <FaPhoneAlt /> Phone: (0039)333 12 347
              </div>
              <div style={{ margin: "15px" }}>
                <MdEmail /> Email: agventureibid@gmail.com
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
};
export default Contactform;
