import React, { useEffect } from "react";
import {
  useMediaQuery,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  IconButton,
  Dialog,
  Button,
  Autocomplete,
  FormControl,
  createTheme,
  TextField,
  Grid,
  Chip,
  Snackbar,
  Pagination,
  ThemeProvider,
  styled,
  Alert,
  Card,
  CardMedia,
  Avatar,
  Box,
  Typography,
  Backdrop,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import profile from "../../../assets/Images/profile.png";
import nofound from "../../../assets/Images/nofound.png";
import { getCookie } from "../../Validator/CookieFunction";
import DeleteIcon from "@mui/icons-material/Delete";

const Orders = () => {
  const account = JSON.parse(getCookie("account"));

  const token = getCookie("token");
  const [state, setState] = React.useState({
    open1: false,
    isLogged: false,
    message: "",
  });
  const { isLogged, open1, message } = state;
  const [orderData, setOrderData] = React.useState([]);
  const [flag, setFlag] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [Did, setDid] = React.useState();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setFlag(false);
    setState({
      ...state,
      open1: false,
    });
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
  const handleDeleteDialogSubmit = () => {
    setFlag(true);
    axios({
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${process.env.REACT_APP_BASEURL}products/delete_products/${Did}`,
    })
      .then(function (response) {
        // handle success
        // const infomation = qs.stringify(response);
        console.log(response.data);
        if (response.data.status === 500) {
          setState({
            open1: true,
            message: "User does not deleted.",
          });
          setFlag(false);
        }
        if (response.data.status === 200) {
          setState({
            isLogged: true,
            open1: true,
            message:
              "Congratulation,You have Successfully logged out,Redirecting....",
          });
          setTimeout(() => {
            setFlag(false);
            setOpen(false);
          }, 2000);
          // window.location.replace("/dashboard");
        }
      })
      .catch(function (error) {
        setState({
          open1: true,
          message: "Please Try again!",
        });
      });
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
  const customerOrder = () => {
    setFlag(true);
    axios({
      method: "get",
      headers: {
        // "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      url: `${process.env.REACT_APP_BASEURL}Order/customer_Order/${account._id}`,
    })
      .then(function (response) {
        if (response.data.status === 504) {
          setFlag(false);
        }
        if (response.data.status === 200) {
          setOrderData(response.data.data);
          setFlag(false);
          return 0;
        }
      })
      .catch(function (error) {
        setFlag(false);
      });
  };
  useEffect(() => {
    customerOrder();
  }, []);

  const deleteDialogBox = (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{ bgcolor: "#f9f9f9", color: "#325240", textAlign: "center" }}
        >
          {"Delete Products"}
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#f9f9f9", color: "#325240" }}>
          <DialogContentText>
            Once you delete a Product, there is no going back. Please be
            certain.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#f9f9f9", color: "#325240" }}>
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
            onClick={() => {
              setOpen(false);
              setDid("");
            }}
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
            onClick={handleDeleteDialogSubmit}
          >
            Delete Product
          </Button>
          <div>
            {errorFunction()}
            {backDrop()}
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );

  const showProducts = () => {
    if (!orderData.length) {
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
              No order Found!
            </span>
            <span>Ready to start selling something awesome?</span>
          </Typography>
        </Box>
      );
    } else {
      return (
        <Box
          sx={{
            padding: "10px",
          }}
        >
          {orderData.map((data) => {
            return (
              <Box
                sx={{
                  bgcolor: "#f9f9f9",
                  border: "2px solid #325240",
                  borderRadius: "10px",
                  margin: 3,
                  padding: 1,
                  boxShadow: "0px 16px 16px 0px rgba(0, 0, 0, 0.2)",
                  transform: "scale(1)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.04)",
                    boxShadow: "0 20px 20px 0 rgba(0, 0, 0, 0.2)",
                  },
                }}
                onClick={() => {
                  window.location.replace(`/ibid/customer/order/${data._id}`);
                }}
                key={data._id}
              >
                <Box sx={{ color: "#325240" }}>
                  <Typography
                    sx={{
                      color: "#325240",
                      fontSize: "18px",
                      fontWeight: "600",
                    }}
                  >
                    Order Id:{data._id}
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>Amount:{data.total_amount}</Typography>
                    <Typography>
                      {new Date(data.create_date).toDateString()}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
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
            margin: "0 auto 32px auto",
            width: "fit-content",
            borderBottom: "2px outset #325240",
            textAlign: "center",
          }}
        >
          My Orders
        </Typography>

        <Box sx={{ mt: 7 }}>{showProducts()}</Box>
        {deleteDialogBox}
        {backDrop()}
        {errorFunction()}
      </Box>
    </>
  );
};
export default Orders;
