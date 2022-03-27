import React from "react";
import {
  CircularProgress,
  Backdrop,
  Alert,
  Snackbar,
  Autocomplete,
  FormControl,
  Button,
  TextField,
  Checkbox,
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
  styled,
} from "@mui/material";
import axios from "axios";
import qs from "query-string";
import ValidatorAccount from "../Validator/ValidatorAccount";
import validator from "validator";
import { enCrypt, deCrypt } from "../Validator/crypto";
import ProfilePic from "./ProfilePic";

import {
  setCookie,
  getCookie,
  deleteCookie,
} from "../Validator/CookieFunction";

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
  const token = getCookie("token");
  const [accountData, setAccountData] = React.useState({
    username: account.user_name,
    emailid: account.email_id,
    password: account.password,
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
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const info = {
      username: validator.trim(data.get("username")),
      emailid: validator.trim(data.get("emailid")),
      address: validator.trim(data.get("address")),
      city: data.get("city"),
      state: data.get("state"),
      phone: validator.trim(data.get("phone")),
    };
    // console.log(info);
    const errorMessage = ValidatorAccount(info);

    if (!errorMessage.flag) {
      setState({
        open: true,
        message: errorMessage.message,
      });
    } else {
      const Data = {
        _id: account._id,
        user_name: info.username,
        email_id: info.emailid,
        password: enCrypt(info.password),
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
            Authorization: `Bearer ${token}`,
          },
          data: qs.stringify(Data),
          url: `${process.env.REACT_APP_BASEURL}user/update_user`,
        })
          .then(function (response) {
            // handle success
            // const infomation = qs.stringify(response);
            console.log(response.data);
            if (response.data.status === 504) {
              setState({
                open: true,
                message: "User does not updated.",
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
                setCookie("account", JSON.stringify(response.data.data), 1);
                //navigate("/signin");
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

  const handleSubmitPassword = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const info = {
      password: validator.trim(data.get("password")),
      newpassword: validator.trim(data.get("newpassword")),
      crpassword: validator.trim(data.get("crpassword")),
    };
    if (validator.isEmpty(info.password)) {
      setState({
        open: true,
        message: "Please Enter a Password.",
      });
    } else if (validator.isEmpty(info.newpassword)) {
      setState({
        open: true,
        message: "Please Enter a New password.",
      });
    } else if (validator.isEmpty(info.crpassword)) {
      setState({
        open: true,
        message: "Please Enter a confirm new Password.",
      });
    } else if (
      !validator.isStrongPassword(info.newpassword, {
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
    } else if (!validator.equals(info.crpassword, info.newpassword)) {
      setState({
        open: true,
        message: "Password don't Match.Try Again !.",
      });
    } else {
      // setState({
      //   isLogged: true,
      //   open: true,
      //   message: "Password",
      // });
      const Data = {
        _id: account._id,
        email_id: accountData.emailid,
        password: enCrypt(info.newpassword),
      };
      setFlag(true);
      setTimeout(() => {
        axios({
          method: "post",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
          data: qs.stringify(Data),
          url: `${process.env.REACT_APP_BASEURL}user/update_user`,
        })
          .then(function (response) {
            if (response.data.status === 504) {
              setState({
                open: true,
                message: "User does not updated.",
              });
              setFlag(false);
            }
            if (response.data.status === 200) {
              setState({
                isLogged: true,
                open: true,
                message: "Congratulation,You have Successfully Update Password",
              });

              setTimeout(() => {
                setFlag(false);
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
  const handleDeleteEvent = () => {
    setFlag(true);
    axios({
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${process.env.REACT_APP_BASEURL}users/deleteUser/${account._id}`,
    })
      .then(function (response) {
        // handle success
        // const infomation = qs.stringify(response);
        console.log(response.data);
        if (response.data.status === 500) {
          setState({
            open: true,
            message: "User does not found.",
          });
          setFlag(false);
        }
        if (response.data.status === 200) {
          setState({
            isLogged: true,
            open: true,
            message:
              "Congratulation,You have Successfully Delete Account,Redirecting....",
          });
          deleteCookie("token");
          deleteCookie("account");
          // deleteCookie("username");
          setFlag(false);
          window.location.replace("/");
        }
      })
      .catch(function (error) {
        setState({
          open: true,
          message: "Please Try again!",
        });
      });
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
  const passwordChangeButtons = (
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
        Save Password
      </Button>
      <div>{errorfunction()}</div>
      <div>{backDrop()}</div>
    </React.Fragment>
  );

  const DeleteButtons = (
    <React.Fragment>
      <Typography
        component="h1"
        variant="h5"
        sx={{
          color: "#325240",
          fontWeight: "bold",
          borderBottom: "2px outset #325240",
          textAlign: "center",
          margin: "0 auto 32px auto",
          width: "fit-content",
        }}
      >
        DELETE ACCOUNT
      </Typography>
      <Box
        sx={{
          my: 2,
          mx: 4,
        }}
      >
        <Typography
          component="h2"
          variant="h5"
          sx={{
            color: "#325240",
            fontSize: "18px",
          }}
        >
          <span
            style={{
              display: "block",
            }}
          >
            Delete this Account
          </span>
          <span>
            Once you delete a Account, there is no going back. Please be
            certain.
          </span>
        </Typography>
        <Button
          type="submit"
          variant="contained"
          onClick={handleDeleteEvent}
          sx={{
            mt: 3,
            mb: 2,
            color: "error",
            backgroundColor: "#B10000",
            "&:hover": {
              backgroundColor: "red",
            },
          }}
        >
          Delete Account
        </Button>
      </Box>
      <div>{errorfunction()}</div>
      <div>{backDrop()}</div>
    </React.Fragment>
  );
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              color: "#325240",
              fontWeight: "bold",
              margin: "0 auto 32px auto",
              width: "fit-content",
              display: "inline-block",
              borderBottom: "2px outset #325240",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            ACCOUNT DETAILS
          </Typography>
          <ProfilePic />
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              my: 2,
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
                      value={accountData.city}
                      onChange={(event, value) => {
                        setAccountData({
                          ...accountData,
                          city: value,
                        });
                      }}
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
                      value={accountData.state}
                      onChange={(event, value) => {
                        setAccountData({
                          ...accountData,
                          state: value,
                        });
                      }}
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
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              color: "#325240",
              fontWeight: "bold",
              margin: "0 auto 32px auto",
              width: "fit-content",
              borderBottom: "2px outset #325240",
              textAlign: "center",
            }}
          >
            PASSWORD CHANGE
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmitPassword}
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
                  id="password"
                  type="password"
                  label="Current Password"
                  name="password"
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  required
                  fullWidth
                  type="password"
                  id="newpassword"
                  label="New password"
                  name="newpassword"
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  required
                  fullWidth
                  type="password"
                  id="crpassword"
                  label="Confirm new password"
                  name="crpassword"
                />
              </Grid>
            </Grid>
            {passwordChangeButtons}
          </Box>
        </Box>
        {DeleteButtons}
      </ThemeProvider>
    </>
  );
};
export default Account;
