import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useMediaQuery,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  IconButton,
  Dialog,
  Breadcrumbs,
  Link,
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
import Footer from "../../sub-component/Footer";

const CustomerOrderDetaillPage = () => {
  const { id } = useParams();
  const account = JSON.parse(getCookie("account"));

  const token = getCookie("token");
  const [state, setState] = React.useState({
    open1: false,
    isLogged: false,
    message: "",
  });
  const { isLogged, open1, message } = state;
  const [orderProductsData, setOrderProductsData] = React.useState([]);
  const [flag, setFlag] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [Did, setDid] = React.useState();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [countItem, setCountItem] = React.useState({
    item: 0,
    subtotal: 0.0,
  });
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
  const customerOrderProducts = () => {
    setFlag(true);
    axios({
      method: "get",
      headers: {
        // "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      url: `${process.env.REACT_APP_BASEURL}Order/customer_Order_Products/${id}`,
    })
      .then(function (response) {
        if (response.data.status === 504) {
          setFlag(false);
        }
        if (response.data.status === 200) {
          setOrderProductsData(response.data.data);
          setFlag(false);
          return 0;
        }
      })
      .catch(function (error) {
        setFlag(false);
      });
  };
  useEffect(() => {
    customerOrderProducts();
    let sum = 0;
    let total = 0;
    orderProductsData.map((data) => {
      sum = sum + data.pro_qty;
      total = total + data.pro_qty * data.pro_sell_price;
    });
    setCountItem({
      // ...countItem,
      item: sum,
      subtotal: total,
    });
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
    if (orderProductsData.length) {
      return (
        <div>
          <table
            style={{
              margin: " 0 -1px 24px 0",
              textAlign: "left",
              width: "100%",
              maxWidth: "80%",
              margin: "auto",
              borderCollapse: "separate",
              border: "none",
              borderSpacing: "0px",
            }}
            class="table-checkout"
          >
            <tbody>
              {orderProductsData.map((data) => {
                return (
                  <tr class="cart_item">
                    <td
                      style={{
                        padding: "12px 20px",
                        border: "1px solid #e6e6e6",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#325240",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        {data.pro_name} x {data.pro_qty}
                        <br />
                        <Typography>Vendor: {data.vendor_name}</Typography>
                      </Typography>
                    </td>
                    <td
                      style={{
                        padding: "12px 20px",
                        border: "1px solid #e6e6e6",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#325240",
                          fontSize: "18px",
                          fontWeight: "bold",
                          marginLeft: "auto",
                          float: "right",
                        }}
                      >
                        {data.pro_qty * data.pro_sell_price} ₹
                      </Typography>
                    </td>
                  </tr>
                );
              })}
              <tr class="cart_item">
                <td
                  style={{
                    padding: "12px 20px",
                    border: "1px solid #e6e6e6",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#325240",
                      fontSize: "18px",
                      fontWeight: "bold",
                      float: "right",
                    }}
                  >
                    Subtotal
                  </Typography>
                </td>
                <td
                  style={{
                    padding: "12px 20px",
                    border: "1px solid #e6e6e6",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#325240",
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginLeft: "auto",
                      float: "right",
                    }}
                  >
                    {countItem.subtotal} ₹
                  </Typography>
                </td>
              </tr>
              <tr class="cart_item">
                <td
                  style={{
                    padding: "12px 20px",
                    border: "1px solid #e6e6e6",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#325240",
                      fontSize: "18px",
                      fontWeight: "bold",
                      float: "right",
                    }}
                  >
                    Discount( 3% )
                  </Typography>
                </td>
                <td
                  style={{
                    padding: "12px 20px",
                    border: "1px solid #e6e6e6",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#325240",
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginLeft: "auto",
                      float: "right",
                    }}
                  >
                    {(countItem.subtotal * 3) / 100} ₹
                  </Typography>
                </td>
              </tr>
              <tr class="cart_item">
                <td
                  style={{
                    padding: "12px 20px",
                    border: "1px solid #e6e6e6",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#325240",
                      fontSize: "18px",
                      fontWeight: "bold",
                      float: "right",
                    }}
                  >
                    Total Amount
                  </Typography>
                </td>
                <td
                  style={{
                    padding: "12px 20px",
                    border: "1px solid #e6e6e6",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#325240",
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginLeft: "auto",
                      float: "right",
                    }}
                  >
                    {parseInt(
                      countItem.subtotal - (countItem.subtotal * 3) / 100
                    )}{" "}
                    ₹
                  </Typography>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <Box sx={{ textAlign: "center", margin: "10%" }}>
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
              No Products in Cart
            </span>
          </Typography>
        </Box>
      );
    }
  };
  return (
    <>
      <Box
        sx={{
          paddingLeft: "20px",
          bgcolor: "#f0f0f0",
          borderBottom: "2px outset #325240",
        }}
      >
        <Breadcrumbs aria-label="breadcrumb" separator="›">
          <Link
            underline="hover"
            sx={{ color: "#325240" }}
            href="/dashboard/CustomerDashboard/1"
          >
            <h2>Customer Dashboard</h2>
          </Link>
          <Typography
            sx={{ color: "#325240", fontSize: "24px", fontWeight: "bold" }}
          >
            {id}
          </Typography>
        </Breadcrumbs>
      </Box>
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

        <Box sx={{ mt: 7, mb: 7 }}>{showProducts()}</Box>
        {deleteDialogBox}
        {backDrop()}
        {errorFunction()}
        <Footer />
      </Box>
    </>
  );
};

export default CustomerOrderDetaillPage;
