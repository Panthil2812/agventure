import React from "react";
import {
  useMediaQuery,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  IconButton,
  Dialog,
  Button,
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
import axios from "axios";
import qs from "query-string";
import profile from "../../../assets/Images/profile.png";

import { getCookie } from "../../Validator/CookieFunction";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { BiRupee } from "react-icons/bi";
const Products = () => {
  const [userData, setUserData] = React.useState([]);
  const [flag, setFlag] = React.useState(false);
  const token = getCookie("token");
  const [open, setOpen] = React.useState(false);
  const [Did, setDid] = React.useState();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = (name) => {
    setDid(name);
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
    setDid("");
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
          setFlag(false);
          return 0;
        }
      })
      .catch(function (error) {
        setFlag(false);
      });
  };
  React.useEffect(() => {
    userAccount();
  }, []);
  return (
    <>
      <Box sx={{ marginTop: 4 }}>
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
          USER ACCOUNT
        </Typography>
        {userData.length &&
          userData.map((data) => {
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
                  <Grid container spacing={2}>
                    <Grid item xs={1}>
                      <Avatar
                        alt="Remy Sharp"
                        src={profile}
                        sx={{ height: "56px", width: "56px" }}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <Typography
                        sx={{
                          color: "#325240",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        panthil products
                        <br />
                        <Typography>price ₹ /unit</Typography>
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ marginTop: "8px" }}>
                      {1 ? (
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
                    <Grid item xs={2} sx={{ marginTop: "8px" }}>
                      <Chip
                        label="Out of Stock"
                        sx={{
                          width: "100px",
                          bgcolor: "#325240",
                          color: "#fff",
                        }}
                      />
                    </Grid>
                    <Grid item xs={1} sx={{ marginTop: "5px" }}>
                      <IconButton
                        sx={{ color: "blue" }}
                        onClick={() => {
                          // handleClickOpen("q2q2q");
                        }}
                      >
                        <ModeEditIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs={1} sx={{ marginTop: "5px" }}>
                      <IconButton
                        color="error"
                        onClick={() => {
                          // handleClickOpen("q2q2q");
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
              certain.{Did}
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
              onClick={handleClose}
              autoFocus
            >
              Delete Account
            </Button>
          </DialogActions>
        </Dialog>
        {backDrop()}
      </Box>
    </>
  );
};
export default Products;
