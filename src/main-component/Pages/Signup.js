import * as React from "react";
import axios from "axios";
import qs from "query-string";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import Copyright from "../sub-component/Copyright";
import ValidatorSignup from "../Validator/ValidatorSignup";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
// import { useNavigate } from "react-router-dom";
import validator from "validator";
import { enCrypt } from "../Validator/crypto";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

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
    const info = {
      firstname: validator.trim(data.get("firstname")),
      lastname: validator.trim(data.get("lastname")),
      emailid: validator.trim(data.get("emailid")),
      password: validator.trim(data.get("password")),
      repassword: validator.trim(data.get("repassword")),
      gender: Gender,
      ctype: CType,
      address: validator.trim(data.get("address")),
      city: data.get("city"),
      state: data.get("state"),
      phone: validator.trim(data.get("phone")),
      checkbox: data.get("checkbox"),
    };

    const errorMessage = ValidatorSignup(info);
    //console.log(errorMessage);
    if (!errorMessage.flag) {
      setState({
        open: true,
        message: errorMessage.message,
      });
    } else {
      const Data = {
        user_name: info.firstname + " " + info.lastname,
        first_name: info.firstname,
        last_name: info.lastname,
        email_id: info.emailid,
        password: enCrypt(info.password),
        gender: info.gender,
        type: info.ctype,
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
          url: "http://localhost:5050/users/create_user",
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
  const [Gender, setGender] = React.useState("");
  const [CType, setCType] = React.useState("");
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleCTypeChange = (event) => {
    setCType(event.target.value);
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
        Sign Up
      </Button>
      <div>{errorfunction()}</div>
      <div>{backDrop()}</div>
    </React.Fragment>
  );
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
          sx={{ height: "100vh", overflow: "auto" }}
        >
          <Box
            sx={{
              marginTop: 4,
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
                    name="firstname"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CssTextField
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CssTextField
                    required
                    fullWidth
                    id="emailid"
                    label="Email Address"
                    name="emailid"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CssTextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CssTextField
                    required
                    fullWidth
                    name="repassword"
                    label="
                    Re-Password"
                    type="password"
                    id="repassword"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box CssTextField sx={{ minWidth: 120 }}>
                    <CssFormControl
                      fullWidth
                      required
                      name="gender"
                      label="Gender"
                      type="Gender"
                      id="gender"
                      autoComplete="Gender"
                    >
                      <InputLabel id="demo-simple-select-label">
                        Gender
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={Gender}
                        name="gender"
                        label="gender"
                        onChange={handleGenderChange}
                      >
                        <MenuItem value={0}>Male</MenuItem>
                        <MenuItem value={1}>Female</MenuItem>
                      </Select>
                    </CssFormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box CssTextField sx={{ minWidth: 120 }}>
                    <CssFormControl
                      fullWidth
                      required
                      name="ctype"
                      label="Type"
                      type="select"
                      id="ctype"
                      autoComplete="Type"
                    >
                      <InputLabel id="demo-simple-select-label">
                        Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={CType}
                        label="Type"
                        name="ctype"
                        onChange={handleCTypeChange}
                        className={theme.select}
                      >
                        <MenuItem value={0}>Vendor</MenuItem>
                        <MenuItem value={1}>Customers</MenuItem>
                      </Select>
                    </CssFormControl>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <CssTextField
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="address"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box CssTextField sx={{ minWidth: 120 }}>
                    <CssFormControl
                      fullWidth
                      required
                      name="city"
                      label="City"
                      type="City"
                      id="city"
                      autoComplete="City"
                    >
                      <Autocomplete
                        required
                        id="combo-box-city"
                        options={CityName}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="City"
                            name="city"
                            id="city"
                            autoComplete="off"
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
                      name="state"
                      label="State"
                      type="State"
                      id="state"
                      autoComplete="State"
                    >
                      <Autocomplete
                        required
                        id="combo-box-state"
                        options={StateName}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="State"
                            id="state"
                            name="state"
                            autoComplete="off"
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
                    name="phone"
                    label="Phone"
                    type="number"
                    id="phone"
                    autoComplete="new-Phone"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="true"
                        name="checkbox"
                        id="checkbox"
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
