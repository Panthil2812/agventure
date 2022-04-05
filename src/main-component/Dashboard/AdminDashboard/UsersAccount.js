import * as React from "react";
import {
  useMediaQuery,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  IconButton,
  Dialog,
  Snackbar,
  Alert,
  Button,
  Pagination,
  Grid,
  Chip,
  Card,
  CardMedia,
  Avatar,
  Box,
  Typography,
  Backdrop,
  CircularProgress,
  useTheme,
} from "@mui/material";

import profile from "../../../assets/Images/profile.png";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import qs from "query-string";
import nofound from "../../../assets/Images/nofound.png";

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { getCookie } from "../../Validator/CookieFunction";
const UsersAccount = () => {
  const token = getCookie("token");
  const theme = useTheme();
  const [userData, setUserData] = React.useState([]);
  const [currentpageData, setcurrentpageDate] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [DataperPage, setDataperPage] = React.useState(10);
  const [searchitem, setSearchItem] = React.useState("");
  const [state, setState] = React.useState({
    open1: false,
    isLogged: false,
    message: "",
  });
  const { isLogged, open1, message } = state;
  const [flag, setFlag] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [Did, setDid] = React.useState();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleChangePage = (event, value) => {
    console.log(value);
    setPage(value);
  };
  const errorFunction = () => {
    if (isLogged) {
      return (
        <div>
          <Snackbar
            open={open1}
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
            open={open1}
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
  const handleClickOpen = (name) => {
    setDid(name);
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
    setDid("");
  };
  const handleDialogSubmit = () => {
    setFlag(true);
    axios({
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${process.env.REACT_APP_BASEURL}users/deleteUser/${Did}`,
    })
      .then(function (response) {
        // handle success
        // const infomation = qs.stringify(response);
        console.log(response.data);
        if (response.data.status === 500) {
          setState({
            open1: true,
            message: "User does not found",
          });
          setFlag(false);
        }
        if (response.data.status === 200) {
          setState({
            isLogged: true,
            open1: true,
            message:
              "You have Successfully Delete user account,Redirecting....",
          });
          setFlag(false);
          window.location.replace("/dashboard/AdminDashboard/3");
        }
      })
      .catch(function (error) {
        setState({
          open1: true,
          message: "Please Try again!",
        });
      });
  };
  const handleClose = () => {
    setFlag(false);
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
  const userAccount = () => {
    setFlag(true);
    axios({
      method: "get",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      url: `${process.env.REACT_APP_BASEURL}users/fetch_users`,
    })
      .then(function (response) {
        if (response.data.status === 504) {
          console.log("error");
          setFlag(false);
        }
        if (response.data.status === 200) {
          const ff = response.data.data;
          // const jj = JSON.parse(ff);
          console.log(
            "database :  ",
            response.data.data,
            typeof response.data.data
          );
          setUserData(response.data.data);
          console.log("userdata : ", userData);
          setFlag(false);
          setPage(1);
          return 0;
        }
      })
      .catch(function (error) {
        setFlag(false);
      });
  };
  const handleOnSearch = (string, results) => {
    console.log(string, results);
    setSearchItem(string);
  };
  const handleOnSelect = (item) => {
    // setSearchItem(item);
  };
  React.useEffect(() => {
    userAccount();
  }, []);
  React.useEffect(() => {
    setcurrentpageDate(
      userData.filter(
        (e) =>
          e.full_name.toLowerCase().includes(searchitem.toLowerCase()) ||
          e.user_name.toLowerCase().includes(searchitem.toLowerCase()) ||
          e.email_id.toLowerCase().includes(searchitem.toLowerCase())
      )
    );
  }, [page, searchitem]);

  const DisplayProducts = React.useMemo(() => {
    const indexOfLastPost = page * DataperPage;
    const indexOfFirstPost = indexOfLastPost - DataperPage;
    return currentpageData.slice(indexOfFirstPost, indexOfLastPost);
  }, [page, currentpageData]);
  const dialogBox = (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={{ color: "#325240" }}>
          {"Delete User Account"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#325240" }}>
            Once you delete a Account, there is no going back. Please be
            certain.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            align="right"
            sx={{
              color: "#f9f9f9",
              backgroundColor: "#325240",
              "&:hover": {
                backgroundColor: "#325240",
              },
            }}
            onClick={handleDialogClose}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            variant="contained"
            color="success"
            align="right"
            sx={{
              color: "#f9f9f9",
              backgroundColor: "#B10000",
              "&:hover": {
                backgroundColor: "#B10000",
              },
            }}
            onClick={handleDialogSubmit}
          >
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
  const SearchBar = (
    <React.Fragment>
      <ReactSearchAutocomplete
        items={[{ user_name: searchitem }, ...userData]}
        maxResults={6}
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        placeholder="Search User account"
        // onClear={handleOnClear}
        resultStringKeyName="user_name"
        fuseOptions={{
          keys: ["user_name", "full_name", "email_id"],
        }}
        styling={{
          zIndex: "50",
          borderRadius: "9px",
          boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.2)",
          border: "3px solid #325240",
          height: "7vh",
          marginBottom: "7vh",
          placeholderFontSize: "2.5vh",
          fontSize: "2.5vh",
          color: "#325240",
          backgroundColor: "#f9f9f9",
        }}
      />
    </React.Fragment>
  );
  const showUserAccount = () => {
    if (currentpageData.length === 0) {
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
              No User Account Found!
            </span>
            <span>Ready to start selling something awesome?</span>
          </Typography>
        </Box>
      );
    } else {
      return (
        <Box>
          {DisplayProducts.map((data) => {
            return (
              <Card
                sx={{
                  bgcolor: "#f9f9f9",
                  margin: "8px",
                  padding: "10px",
                  alignItem: "center",
                  border: "1.5px solid #325240",
                  boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.2)",
                  "&:hover": {
                    bgcolor: "#f1f1f1",
                    boxShadow: "0 16px 16px 4px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <Box sx={{ flexGrow: 1 }} key={data._id}>
                  <Grid container spacing={3}>
                    <Grid item xs={1}>
                      <Avatar
                        alt="Remy Sharp"
                        src={data.profile_pic ? data.profile_pic : profile}
                        sx={{ height: "50px", width: "50px" }}
                      />
                    </Grid>
                    <Grid item xs={7}>
                      <Typography
                        sx={{
                          color: "#325240",
                          fontSize: "15px",
                          fontWeight: "bold",
                        }}
                      >
                        {data.user_name}
                        <br />
                        <Typography>{data.email_id}</Typography>
                      </Typography>
                    </Grid>
                    <Grid item xs={3} sx={{ marginTop: "8px" }}>
                      {data.type ? (
                        <Chip
                          label="Vendor"
                          color="warning"
                          sx={{ width: "100px" }}
                        />
                      ) : (
                        <Chip
                          label="Customer"
                          sx={{
                            width: "100px",
                            bgcolor: "#325240",
                            color: "#fff",
                          }}
                        />
                      )}
                      {/* <Chip label="Vendor" color="warning" />
                       */}
                    </Grid>
                    <Grid item xs={1} sx={{ marginTop: "5px" }}>
                      <IconButton
                        color="error"
                        onClick={() => {
                          handleClickOpen(data._id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            );
          })}
          <Box sx={{ mt: 7, display: "flex", justifyContent: "center" }}>
            <Pagination
              count={Math.ceil(currentpageData.length / DataperPage)}
              variant="outlined"
              sx={{
                "& .css-lqq3n7-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
                  {
                    backgroundColor: "#325240",
                    color: "#fff",
                  },
                "& .css-lqq3n7-MuiButtonBase-root-MuiPaginationItem-root": {
                  backgroundColor: "#f9f9f9",
                  color: "#325240",
                  border: "1px solid #325240",
                },
              }}
              page={page}
              onChange={handleChangePage}
            />
          </Box>
        </Box>
      );
    }
  };
  return (
    <>
      <Box sx={{ marginTop: 4 }}>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            color: "#325240",
            fontWeight: "bold",
            marginBottom: 4,
            borderBottom: "2px outset #325240",
            textAlign: "center",
          }}
        >
          USER ACCOUNT
        </Typography>
        <Box>
          <Box
            sx={{
              boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.2)",
              marginLeft: "25%",
              marginRight: "25%",
            }}
          >
            {SearchBar}
          </Box>
          <Box sx={{ mt: 7 }}>{showUserAccount()}</Box>
        </Box>

        {dialogBox}
        {backDrop()}
        {errorFunction()}
      </Box>
    </>
  );
};
export default UsersAccount;
