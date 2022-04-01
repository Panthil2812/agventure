import * as React from "react";
import axios from "axios";
import qs from "query-string";
import {
  CircularProgress,
  Backdrop,
  Slide,
  Button,
  FormControl,
  Alert,
  Snackbar,
  styled,
  ThemeProvider,
  createTheme,
  Typography,
  Grid,
  Box,
  Paper,
  Link,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  ToggleButtonGroup,
  ToggleButton,
  InputLabel,
  Select,
  Autocomplete,
  MenuItem,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "../sub-component/Copyright";
import ValidatorSignup from "../Validator/ValidatorSignup";

// import { useNavigate } from "react-router-dom";
import validator from "validator";
import { enCrypt } from "../Validator/crypto";

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
const ScrollDiv = styled(Grid)({
  "::-webkit-scrollbar": {
    display: "none",
  },
});
const CityName = [
  { label: "Mumbai" },
  { label: "Delhi" },
  { label: "Bangalore" },
  { label: "Hyderabad" },
  { label: "Ahmedabad" },
  { label: "Chennai" },
  { label: "Kolkata" },
  { label: "Surat" },
  { label: "Pune" },
  { label: "Jaipur" },
  { label: "Lucknow" },
  { label: "Kanpur" },
  { label: "Nagpur" },
  { label: "Indore" },
  { label: "Thane" },
  { label: "Bhopal" },
  { label: "Visakhapatnam" },
  { label: "Pimpri and Chinchwad" },
  { label: "Patna" },
  { label: "Vadodara" },
  { label: "Ghaziabad" },
  { label: "Ludhiana" },
  { label: "Agra" },
  { label: "Nashik" },
  { label: "Faridabad" },
  { label: "Meerut" },
  { label: "Rajkot" },
  { label: "Kalyan" },
  { label: "Vasai" },
  { label: "Varanasi" },
];
const StateName = [
  { label: "Daman" },
  { label: "Diu" },
  { label: "Silvassa" },
  { label: "Mumbai" },
  { label: "Delhi" },
  { label: "Karnataka" },
  { label: "Andhra Pradesh" },
  { label: "Gujarat" },
  { label: "Tamil Nadu" },
  { label: "Rajasthan" },
  { label: "Uttar Pradesh" },
  { label: "Madhya Pradesh" },
  { label: "Bihar" },
  { label: "Punjab" },
  { label: "Arunachal Pradesh" },
  { label: "Assam" },
  { label: "Chhattisgarh" },
  { label: "Goa" },
  { label: "Haryana" },
  { label: "Himachal Pradesh" },
  { label: "Jharkhand" },
  { label: "Kerala" },
  { label: "Manipur" },
  { label: "Meghalaya" },
  { label: "Mizoram" },
  { label: "Nagaland" },
  { label: "Odisha" },
  { label: "Sikkim" },
  { label: "Tripura" },
  { label: "Uttarakhand" },
  { label: "West Bengal" },
];

export default function SignInSide() {
  //console.log(enCrypt("U2FsdGVkX1+CEJvYZDsZFAARLkhA/6fG6ZCx5pz90vs="));

  // let navigate = useNavigate();
  const [state, setState] = React.useState({
    open: false,
    isLogged: false,
    message: "",
  });
  const [flag, setFlag] = React.useState(false);
  const { isLogged, open, message } = state;
  const [alignment, setAlignment] = React.useState("0");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const errorfunction = () => {
    if (isLogged) {
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
  const backDrop = () => {
    return (
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={flag}
          onClick={handleClose}
        >
          <CircularProgress sx={{ color: "#325240" }} />
        </Backdrop>
      </>
    );
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let info = "";
    if (alignment === "1") {
      info = {
        fullname: validator.trim(data.get("vfullname")),
        emailid: validator.trim(data.get("vemailid")),
        password: validator.trim(data.get("vpassword")),
        repassword: validator.trim(data.get("vrepassword")),
        ctype: alignment,
        address: validator.trim(data.get("vaddress")),
        city: data.get("vcity"),
        state: data.get("vstate"),
        phone: validator.trim(data.get("vphone")),
        checkbox: data.get("vcheckbox"),
      };
    } else if (alignment === "0") {
      info = {
        fullname: validator.trim(data.get("cfullname")),
        emailid: validator.trim(data.get("cemailid")),
        password: validator.trim(data.get("cpassword")),
        repassword: validator.trim(data.get("crepassword")),
        ctype: alignment,
        address: "",
        city: data.get("ccity"),
        state: data.get("cstate"),
        phone: validator.trim(data.get("cphone")),
        checkbox: data.get("ccheckbox"),
      };
    }
    console.log(info);
    const errorMessage = ValidatorSignup(info);
    console.log(errorMessage);
    if (!errorMessage.flag) {
      setState({
        open: true,
        message: errorMessage.message,
      });
    } else {
      const Data = {
        user_name: capitalizeFirstLetter(info.fullname),
        full_name: capitalizeFirstLetter(info.fullname),
        email_id: info.emailid,
        password: enCrypt(info.password),
        type: alignment,
        city: info.city,
        state: info.state,
        address: info.address,
        phone: info.phone,
      };
      setFlag(true);
      setTimeout(() => {
        // console.log(Data);
        axios({
          method: "post",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify(Data),
          url: `${process.env.REACT_APP_BASEURL}users/create_user`,
        })
          .then(function (response) {
            // handle success
            // const infomation = qs.stringify(response);
            console.log(response.data);
            if (response.data.status === 500) {
              setState({
                open: true,
                message: "Email already exists.",
              });
              setFlag(false);
            }
            if (response.data.status === 200) {
              setState({
                isLogged: true,
                open: true,
                message: errorMessage.message,
              });
              setFlag(false);
              setTimeout(() => {
                //navigate("/signin");
                window.location.replace("/signin");
              }, 1000);
            }
          })
          .catch(function (error) {
            setState({
              open: true,
              message: "Please Try again!",
            });
            setFlag(false);
          });
        // axios
        //   .get("https://jsonplaceholder.typicode.com/posts")
        //   .then(function (response) {
        //     // handle success
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     // handle error
        //     console.log(error);
        //   })
        //   .then(function () {
        //     // always executed
        //   });
      }, 3000);
      // if (isLogged) {
      //   navigate("/signin");
      // }
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
        sx={{
          mt: 3,
          mb: 2,
          bgcolor: "#325240",
          "&:hover": {
            backgroundColor: "#325240",
          },
        }}
      >
        Sign Up
      </Button>
      <div>{errorfunction()}</div>
      <div>{backDrop()}</div>
    </React.Fragment>
  );
  const ToggleFunction = () => {
    // vendor
    if (alignment === "1") {
      return (
        <>
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
              <Grid item xs={12}>
                <CssTextField
                  name="vfullname"
                  required
                  fullWidth
                  id="vfullname"
                  label="Full Name"
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  required
                  fullWidth
                  id="vemailid"
                  label="Email Address"
                  name="vemailid"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CssTextField
                  required
                  fullWidth
                  name="vpassword"
                  label="Password"
                  type="password"
                  id="vpassword"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CssTextField
                  required
                  fullWidth
                  name="vrepassword"
                  label="
                    Re-Password"
                  type="password"
                  id="vrepassword"
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  required
                  fullWidth
                  id="vaddress"
                  label="Address"
                  name="vaddress"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box CssTextField sx={{ minWidth: 120 }}>
                  <CssFormControl
                    fullWidth
                    required
                    name="vcity"
                    label="City"
                    type="City"
                    id="vcity"
                  >
                    <Autocomplete
                      required
                      id="combo-box-city"
                      disableClearable
                      options={CityName}
                      renderInput={(params) => (
                        <TextField
                          required
                          {...params}
                          label="City"
                          name="vcity"
                          id="vcity"
                        />
                      )}
                    />
                  </CssFormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box CssTextField sx={{ minWidth: 120 }}>
                  <CssFormControl
                    fullWidth
                    required
                    name="vstate"
                    label="State"
                    type="State"
                    id="vstate"
                  >
                    <Autocomplete
                      required
                      disableClearable
                      id="combo-box-state"
                      options={StateName}
                      renderInput={(params) => (
                        <TextField
                          required
                          {...params}
                          label="State"
                          id="vstate"
                          name="vstate"
                        />
                      )}
                    />
                  </CssFormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  required
                  fullWidth
                  name="vphone"
                  label="Phone"
                  type="number"
                  id="vphone"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="true"
                      name="vcheckbox"
                      id="vcheckbox"
                      color="success"
                    />
                  }
                  sx={{ color: "#325240" }}
                  label="I acknowledge that I have read and agree to the terms and Condition and Privacy Policy.*"
                />
              </Grid>
            </Grid>
            {buttons}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="/signin"
                  variant="body2"
                  sx={{ color: "#325240", fontWeight: "bold" }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Copyright />
          </Box>
        </>
      );
      //customer
    } else if (alignment === "0") {
      return (
        <>
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
              <Grid item xs={12}>
                <CssTextField
                  name="cfullname"
                  required
                  fullWidth
                  id="cfullname"
                  label="Full Name"
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  required
                  fullWidth
                  id="cemailid"
                  label="Email Address"
                  name="cemailid"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CssTextField
                  required
                  fullWidth
                  name="cpassword"
                  label="Password"
                  type="password"
                  id="cpassword"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CssTextField
                  required
                  fullWidth
                  name="crepassword"
                  label="
                  Re-Password"
                  type="password"
                  id="crepassword"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box CssTextField sx={{ minWidth: 120 }}>
                  <CssFormControl
                    fullWidth
                    required
                    name="ccity"
                    label="City"
                    type="City"
                    id="ccity"
                  >
                    <Autocomplete
                      required
                      disableClearable
                      id="combo-box-city"
                      options={CityName}
                      renderInput={(params) => (
                        <TextField
                          required
                          {...params}
                          label="City"
                          name="ccity"
                          id="ccity"
                        />
                      )}
                    />
                  </CssFormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box CssTextField sx={{ minWidth: 120 }}>
                  <CssFormControl
                    fullWidth
                    required
                    name="cstate"
                    label="State"
                    type="State"
                    id="cstate"
                  >
                    <Autocomplete
                      required
                      disableClearable
                      id="combo-box-state"
                      options={StateName}
                      renderInput={(params) => (
                        <TextField
                          required
                          {...params}
                          label="State"
                          id="cstate"
                          name="cstate"
                        />
                      )}
                    />
                  </CssFormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  required
                  fullWidth
                  name="cphone"
                  label="Phone"
                  type="number"
                  id="cphone"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="true"
                      name="ccheckbox"
                      id="ccheckbox"
                      color="success"
                    />
                  }
                  sx={{ color: "#325240" }}
                  label="I acknowledge that I have read and agree to the terms and Condition and Privacy Policy.*"
                />
              </Grid>
            </Grid>
            {buttons}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="/signin"
                  variant="body2"
                  sx={{ color: "#325240", fontWeight: "bold" }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Copyright />
          </Box>
        </>
      );
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{ height: "100vh", color: "#325240" }}
      >
        <ScrollDiv
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{ height: "100vh", overflow: "auto", padding: "18px" }}
        >
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#325240" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{ color: "#325240", fontWeight: "bold" }}
            >
              Sign Up
            </Typography>
            <ToggleButtonGroup
              value={alignment}
              fullWidth
              exclusive
              onChange={handleChange}
              sx={{
                mt: "18px",
                border: "2px solid #f9f9f9",
                borderRadius: "25px",
                boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.2)",
              }}
            >
              <ToggleButton
                value="0"
                sx={{
                  color: "#325240",
                  fontWeight: "bold",
                  borderRadius: "25px",
                  borderLeft: "2px solid #f9f9f9",
                  "&.Mui-selected, &.Mui-selected:hover,&:hover": {
                    color: "#f9f9f9",
                    backgroundColor: "#325240",
                  },
                }}
              >
                Customer
              </ToggleButton>
              <ToggleButton
                value="1"
                sx={{
                  color: "#325240",
                  fontWeight: "bold",
                  borderRadius: "25px",
                  borderRight: "2px solid #f9f9f9",
                  "&.Mui-selected, &.Mui-selected:hover,&:hover": {
                    color: "#f9f9f9",
                    backgroundColor: "#325240",
                  },
                }}
              >
                Vendor
              </ToggleButton>
            </ToggleButtonGroup>
            {ToggleFunction()}
          </Box>
        </ScrollDiv>
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
      </Grid>
    </ThemeProvider>
  );
}
