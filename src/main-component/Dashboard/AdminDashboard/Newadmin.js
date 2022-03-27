import React from "react";
import { enCrypt } from "../../Validator/crypto";
import {
  CircularProgress,
  Backdrop,
  Slide,
  Button,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Dialog,
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
  FormControl,
  TextField,
  CssBaseline,
  useMediaQuery,
  Avatar,
  useTheme,
} from "@mui/material";
import axios from "axios";
import qs from "query-string";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import validator from "validator";
// import { enCrypt, deCrypt } from "../Validator/crypto";

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

const Newadmin = () => {
  const themedialog = useTheme();
  const fullScreen = useMediaQuery(themedialog.breakpoints.down("md"));
  const [state, setState] = React.useState({
    open: false,
    isLogged: false,
    message: "",
  });
  const [dialog, setDialog] = React.useState(false);
  const [flag, setFlag] = React.useState(false);
  const { isLogged, open, message } = state;
  const [addAdmin, setaddAdmin] = React.useState({
    adminName: "",
    adminEmailid: "",
    adminPassword: "",
  });
  const { adminName, adminEmailid, adminPassword } = addAdmin;

  const handleClickDialog = () => {
    setaddAdmin({
      adminName: "",
      adminEmailid: "",
      adminPassword: "",
    });
    setDialog(true);
  };

  const handleCloseDialog = () => {
    setDialog(false);
  };
  const handleSubmitDialog = () => {
    if (validator.isEmpty(adminName)) {
      setState({
        open: true,
        message: "Please Enter a Admin Name.",
      });
    } else if (validator.isEmpty(adminEmailid)) {
      setState({
        open: true,
        message: "Please Enter a Email id.",
      });
    } else if (validator.isEmpty(adminPassword)) {
      setState({
        open: true,
        message: "Please Enter a Password.",
      });
    } else if (!validator.isEmail(adminEmailid)) {
      setState({
        open: true,
        message: "Please Enter a Valid Email-Id Address.",
      });
    } else if (
      !validator.isStrongPassword(adminPassword, {
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
      const Data = {
        user_name: adminName,
        full_name: adminName,
        email_id: adminEmailid,
        password: enCrypt(adminPassword),
        type: 2,
        address: "admin",
        city: "Surat",
        state: "Gujarat",
        phone: "0000000000",
      };
      console.log(Data);
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
            // console.log(response.data);
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
                message: "You have Successfully added new Admin. ",
              });
              setFlag(false);
              setTimeout(() => {
                setDialog(false);
              }, 1000);
            }
          })
          .catch(function (error) {
            setState({
              open: true,
              message: "Please Try again!",
            });
            setFlag(false);
            setDialog(false);
          });
      }, 3000);
      // setTimeout(() => {
      //   // console.log(Data);
      //   axios({
      //     method: "post",
      //     headers: {
      //       "content-type": "application/x-www-form-urlencoded",
      //     },
      //     data: qs.stringify(Data),
      //     url: `${process.env.REACT_APP_BASEURL}authorise/forgot_password`,
      //   })
      //     .then(function (response) {
      //       // handle success
      //       // const infomation = qs.stringify(response);
      //       console.log(response.data);
      //       if (response.data.status === 500) {
      //         setState({
      //           open: true,
      //           message:
      //             "The user ID you entered does not exist.Please check that you have typed your ID correctly.",
      //         });
      //         setFlag(false);
      //       }
      //       if (response.data.status === 200) {
      //         setForget({
      //           isForget: true,
      //         });
      //         setDialog(false);
      //         setState({
      //           open: true,
      //           message: "Your Password has been changed Successfully.",
      //         });
      //         setFlag(false);
      //       }
      //     })
      //     .catch(function (error) {
      //       setState({
      //         open: true,
      //         message: "Please Try again!",
      //       });
      //     });
      // }, 3000);
    }
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
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // const info = {
    //   username: validator.trim(data.get("username")),
    //   emailid: validator.trim(data.get("emailid")),
    //   address: validator.trim(data.get("address")),
    //   city: data.get("city"),
    //   state: data.get("state"),
    //   phone: validator.trim(data.get("phone")),
    // };
    // // console.log(info);
    // const errorMessage = ValidatorAccount(info);

    // if (!errorMessage.flag) {
    //   setState({
    //     open: true,
    //     message: errorMessage.message,
    //   });
    // } else {
    //   const Data = {
    //     _id: account._id,
    //     user_name: info.username,
    //     email_id: info.emailid,
    //     password: enCrypt(info.password),
    //     type: info.ctype,
    //     city: info.city,
    //     state: info.state,
    //     address: info.address,
    //     phone: info.phone,
    //   };
    //   setFlag(true);
    //   setTimeout(() => {
    //     // console.log(Data);
    //     axios({
    //       method: "post",
    //       headers: {
    //         "content-type": "application/x-www-form-urlencoded",
    //         Authorization: `Bearer ${token}`,
    //       },
    //       data: qs.stringify(Data),
    //       url: `${process.env.REACT_APP_BASEURL}user/update_user`,
    //     })
    //       .then(function (response) {
    //         // handle success
    //         // const infomation = qs.stringify(response);
    //         console.log(response.data);
    //         if (response.data.status === 504) {
    //           setState({
    //             open: true,
    //             message: "User does not updated.",
    //           });
    //           setFlag(false);
    //         }
    //         if (response.data.status === 200) {
    //           setState({
    //             isLogged: true,
    //             open: true,
    //             message: errorMessage.message,
    //           });
    //           setFlag(false);
    //           setTimeout(() => {
    //             setCookie("account", JSON.stringify(response.data.data), 1);
    //             //navigate("/signin");
    //           }, 1000);
    //         }
    //       })
    //       .catch(function (error) {
    //         setState({
    //           open: true,
    //           message: "Please Try again!",
    //         });
    //       });
    //   }, 3000);
    // }
  };
  const DialogBox = (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={dialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          align="center"
          sx={{
            color: "#325240",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Add New Admin
        </DialogTitle>
        <DialogContent>
          <CssTextField
            margin="normal"
            required
            fullWidth
            name="adminname"
            label="Admin Name"
            type="name"
            id="adminname"
            value={adminName}
            onChange={(e) => {
              setaddAdmin({
                ...addAdmin,
                adminName: e.target.value,
              });
              // console.log("email: " + fEmail);
            }}
          />
          <CssTextField
            margin="normal"
            required
            fullWidth
            name="adminemail"
            label="Email Id"
            type="email"
            id="adminemail"
            value={adminEmailid}
            onChange={(e) => {
              setaddAdmin({
                ...addAdmin,
                adminEmailid: e.target.value,
              });
              // console.log("password: " + fPassword);
            }}
          />
          <CssTextField
            margin="normal"
            required
            fullWidth
            name="adminpassword"
            label="Password"
            type="password"
            id="adminpassword"
            value={adminPassword}
            onChange={(e) => {
              setaddAdmin({
                ...addAdmin,
                adminPassword: e.target.value,
              });
              // console.log("password: " + fPassword);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            align="right"
            onClick={handleCloseDialog}
            sx={{
              bgcolor: "#B10000",
              color: "#fff",
              "&:hover": {
                bgcolor: "#B10000",
                color: "#fff",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#325240",
              color: "#fff",
              "&:hover": { bgcolor: "#325240", color: "#fff" },
            }}
            align="center"
            onClick={handleSubmitDialog}
          >
            Submit
          </Button>
          <div>
            {errorfunction()}
            {backDrop()}
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ marginTop: 4 }}>
          <Button
            type="submit"
            variant="contained"
            onClick={handleClickDialog}
            sx={{
              float: "right",
              backgroundColor: "#325240",
              "&:hover": {
                backgroundColor: "#325240",
              },
            }}
          >
            ADD NEW ADMIN
          </Button>
        </Box>
        <Box sx={{ marginTop: 4 }}>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              color: "#325240",
              fontWeight: "bold",
              marginTop: "32px",
              margin: "0 auto 32px auto",
              width: "fit-content",
              borderBottom: "2px outset #325240",
              textAlign: "center",
            }}
          >
            ADMIN LISTS
          </Typography>
        </Box>
      </Box>
      {DialogBox}
      {errorfunction()}
      {backDrop()}
    </>
  );
};
export default Newadmin;
