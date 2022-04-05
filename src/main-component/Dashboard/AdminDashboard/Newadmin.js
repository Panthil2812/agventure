import React from "react";
import { enCrypt } from "../../Validator/crypto";
import profile from "../../../assets/Images/profile.png";
import nofound from "../../../assets/Images/nofound.png";
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
  Card,
  Chip,
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
import { getCookie } from "../../Validator/CookieFunction";
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
  const token = getCookie("token");
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
  const [AdminData, setAdminData] = React.useState([]);
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
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
        user_name: capitalizeFirstLetter(adminName),
        full_name: capitalizeFirstLetter(adminName),
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
              allAdmin();
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
    }
  };
  const errorfunction = () => {
    if (isLogged) {
      return (
        <div>
          <Snackbar
            open={open}
            sx={{ width: "50%", zIndex: 9999 }}
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
            sx={{ width: "50%", zIndex: 9999 }}
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
  const allAdmin = () => {
    setFlag(true);
    axios({
      method: "get",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      url: `${process.env.REACT_APP_BASEURL}admin/fetch_admin`,
    })
      .then(function (response) {
        if (response.data.status === 504) {
          console.log("error");
          setFlag(false);
        }
        if (response.data.status === 200) {
          const ff = response.data.data;
          setAdminData(response.data.data);
          console.log("AdminData : ", AdminData);
          setFlag(false);
          return 0;
        }
      })
      .catch(function (error) {
        setFlag(false);
      });
  };
  React.useEffect(() => {
    allAdmin();
  }, []);
  const displayAdmin = () => {
    if (AdminData.length === 0) {
      return (
        <Box sx={{ textAlign: "center" }}>
          <img alt="image" src={nofound} />
          <Typography
            component="h1"
            variant="h5"
            sx={{
              color: "#325240",
              fontWeight: "bold",
              margin: "0 auto 32px auto",
              width: "fit-content",
              textAlign: "center",
            }}
          >
            <span
              style={{
                display: "block",
              }}
            >
              No Products Found!
            </span>
            <span>Ready to start selling something awesome?</span>
          </Typography>
        </Box>
      );
    } else {
      return AdminData.map((data) => {
        return (
          <Card
            sx={{
              bgcolor: "#f9f9f9",
              margin: "8px",
              padding: "10px",
              alignItem: "center",
              border: "0.5px solid #325240",
              boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.2)",
              "&:hover": {
                bgcolor: "#f1f1f1",
                boxShadow: "0 16px 16px 4px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3}>
                <Grid item xs={1}>
                  <Avatar
                    alt="Remy Sharp"
                    src={data.profile_pic ? data.profile_pic : profile}
                  />
                </Grid>
                <Grid item xs={7} sx={{ textAlign: "center" }}>
                  <Typography
                    sx={{
                      color: "#325240",
                      fontSize: "18px",
                      fontWeight: "bold",
                      float: "left",
                      marginTop: "8px",
                    }}
                  >
                    {data.full_name}
                  </Typography>
                </Grid>

                <Grid item xs={3} sx={{ marginTop: "5px" }}>
                  <Chip
                    label={data.email_id}
                    sx={{ bgcolor: "#325240", color: "#fff" }}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Box>
          </Card>
        );
      });
    }
  };
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
      {displayAdmin()}
      {DialogBox}
      {errorfunction()}
      {backDrop()}
    </>
  );
};
export default Newadmin;
