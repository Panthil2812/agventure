import React from "react";
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
import ValidatorAccount from "../Validator/ValidatorAccount";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import validator from "validator";
import { enCrypt, deCrypt } from "../Validator/crypto";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { setCookie, getCookie } from "../Validator/CookieFunction";

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

const Account = () => {
  const account = JSON.parse(getCookie("account"));
  const [accountData, setAccountData] = React.useState({
    username: account.user_name,
    firstname: account.first_name,
    lastname: account.last_name,
    emailid: account.email_id,
    password: deCrypt(account.password),
    gender: account.gender,
    ctype: account.type,
    address: account.address,
    city: account.city,
    state: account.state,
    phone: account.phone,
  });
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
      username: validator.trim(data.get("username")),
      firstname: validator.trim(data.get("firstname")),
      lastname: validator.trim(data.get("lastname")),
      emailid: validator.trim(data.get("emailid")),
      gender: Gender,
      ctype: CType,
      address: validator.trim(data.get("address")),
      city: data.get("city"),
      state: data.get("state"),
      phone: validator.trim(data.get("phone")),
    };

    const errorMessage = ValidatorAccount(info);
    // console.log(errorMessage);
    if (!errorMessage.flag) {
      setState({
        open: true,
        message: errorMessage.message,
      });
    } else {
      const Data = {
        _id: account._id,
        user_name: info.username,
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
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
          data: qs.stringify(Data),
          url: `${process.env.REACT_APP_BASEURL}user/update_user`,
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
                window.location.replace("/dashboard");
              }, 1000);
            }
          })
          .catch(function (error) {
            setState({
              open: true,
              message: "Please Try again!",
            });
          });
      }, 3000);
    }
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const [Gender, setGender] = React.useState(account.gender);
  const [CType, setCType] = React.useState(account.type);
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
        sx={{
          mt: 3,
          mb: 2,
          backgroundColor: "#325240",
          "&:hover": {
            backgroundColor: "#325240",
          },
        }}
      >
        Save change
      </Button>
      <div>{errorfunction()}</div>
      <div>{backDrop()}</div>
    </React.Fragment>
  );
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              color: "#325240",
              fontWeight: "bold",
              borderBottom: "2px outset #325240",
            }}
          >
            ACCOUNT DETAILS
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
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CssTextField
                  required
                  fullWidth
                  id="username"
                  label="UserName"
                  name="username"
                  value={accountData.username}
                  onChange={(e) => {
                    setAccountData({
                      ...accountData,
                      username: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CssTextField
                  name="firstname"
                  required
                  fullWidth
                  value={accountData.firstname}
                  onChange={(e) => {
                    setAccountData({
                      ...accountData,
                      firstname: e.target.value,
                    });
                  }}
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
                  value={accountData.lastname}
                  onChange={(e) => {
                    setAccountData({
                      ...accountData,
                      lastname: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  required
                  fullWidth
                  id="emailid"
                  label="Email Address"
                  name="emailid"
                  value={accountData.emailid}
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
                  >
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
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
                  value={accountData.address}
                  onChange={(e) => {
                    setAccountData({
                      ...accountData,
                      address: e.target.value,
                    });
                  }}
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
                  >
                    <Autocomplete
                      required
                      id="combo-box-city"
                      options={CityName}
                      value={account.city}
                      renderInput={(params) => (
                        <TextField
                          required
                          {...params}
                          label="City"
                          name="city"
                          id="city"
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
                  >
                    <Autocomplete
                      required
                      id="combo-box-state"
                      options={StateName}
                      value={account.state}
                      renderInput={(params) => (
                        <TextField
                          required
                          {...params}
                          label="State"
                          id="state"
                          name="state"
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
                  value={accountData.phone}
                  onChange={(e) => {
                    setAccountData({
                      ...accountData,
                      phone: e.target.value,
                    });
                  }}
                />
              </Grid>
            </Grid>
            {buttons}
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};
export default Account;
