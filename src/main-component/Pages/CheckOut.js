import React from "react";
import { useEffect } from "react";
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
  Breadcrumbs,
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
import {
  getCart,
  addInfoToCart,
  editCartProducts,
  deleteCartProduct,
  getCookie,
  deleteCookie,
} from "../Validator/CookieFunction";
import axios from "axios";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
import isEmpty from "validator/lib/isEmpty";
import { AiFillCloseCircle, AiOutlinePlus } from "react-icons/ai";
import { RiSubtractFill } from "react-icons/ri";
import { GrFormSubtract } from "react-icons/gr";
import nofound from "../../assets/Images/nofound.png";
import Footer from "../sub-component/Footer";
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
const CheckOut = () => {
  const [cartData, setCartData] = React.useState(getCart());
  const [deletecartproduct, setDeletecartproduct] = React.useState(0);
  const [countItem, setCountItem] = React.useState({
    item: 0,
    subtotal: 0.0,
  });
  const [state, setState] = React.useState({
    open: false,
    isLogged: false,
    message: "",
  });
  const [billData, setBillData] = React.useState({
    bill_name: "",
    bill_street_address: "",
    bill_email: "",
    bill_phone: "",
    bill_notes: "",
  });
  const [flag, setFlag] = React.useState(false);
  const { isLogged, open, message } = state;
  const handleClose = () => {
    setFlag(false);
    setState({ ...state, open: false });
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
  const createNewOrder = () => {
    const token = getCookie("token");
    const accountData = JSON.parse(getCookie("account"));
    const info = {
      bill: {
        customer_id: accountData._id,
        customer_name: billData.bill_name,
        customer_street_address: billData.bill_street_address,
        customer_email: billData.bill_email,
        customer_phone: billData.bill_phone,
        bill_notes: billData.bill_notes,
        total_products: countItem.item,
        subtotal: countItem.subtotal,
        total_amount: countItem.subtotal - (countItem.subtotal * 3) / 100,
      },
      products: getCart(),
    };
    // console.log("order : ", info);
    setFlag(true);
    axios({
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: info,
      url: `${process.env.REACT_APP_BASEURL}Order/create_Order`,
    })
      .then(function (response) {
        if (response.data.status === 504) {
          //console.log("error");
          setFlag(false);
        }
        if (response.data.status === 200) {
          // console.log("API : ", response.data.data);
          setFlag(false);
          const link = `/ibid/shop/checkout/${response.data.data}`;
          window.location.replace(link);
          deleteCookie("cart");
          return 0;
        }
      })
      .catch(function (error) {
        setFlag(false);
      });
  };
  useEffect(() => {
    displayCartProducts();
    let sum = 0;
    let total = 0;
    setCartData(getCart());
    console.log("getCart()", getCart());
    getCart().map((data) => {
      sum = sum + data.pro_qty;
      total = total + data.pro_qty * data.pro_sell_price;
    });
    setCountItem({
      // ...countItem,
      item: sum,
      subtotal: total,
    });
    console.log("change useeffect");
  }, [deletecartproduct]);
  const placeOrder = () => {
    if (isEmpty(billData.bill_name)) {
      setState({
        open: true,
        message: "Please Enter a FullName.",
      });
    } else if (isEmpty(billData.bill_email)) {
      setState({
        open: true,
        message: "Please Enter a Email-Id Address.",
      });
    } else if (!isEmail(billData.bill_email)) {
      setState({
        open: true,
        message: "Please Enter a Valid Email-Id Address.",
      });
    } else if (isEmpty(billData.bill_street_address)) {
      setState({
        open: true,
        message: "Please Enter a Street Address.",
      });
    } else if (isEmpty(billData.bill_phone)) {
      setState({
        open: true,
        message: "Please Enter a Phone number.",
      });
    } else if (!isLength(billData.bill_phone, { min: 10, max: 10 })) {
      setState({
        open: true,
        message: "Please Enter a 10-digit Phone Number.",
      });
    } else {
      createNewOrder();
    }
  };
  const displayCartProducts = () => {
    if (cartData.length) {
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
              {cartData.map((data) => {
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
              <tr class="cart_item">
                <td
                  style={{
                    padding: "12px 20px",
                    border: "1px solid #e6e6e6",
                  }}
                ></td>
                <td
                  style={{
                    padding: "12px 20px",
                    border: "1px solid #e6e6e6",
                  }}
                >
                  <Button
                    sx={{
                      bgcolor: "#325240",
                      color: "#f9f9f9",
                      marginLeft: "auto",
                      float: "right",
                      pr: 3,
                      pl: 3,
                      border: "2px solid transparent",
                      "&:hover": {
                        color: "#325240",
                        bgcolor: "#f9f9f9",
                        border: "2px solid #325240",
                      },
                    }}
                    onClick={() => {
                      placeOrder();
                    }}
                  >
                    place order
                  </Button>
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
          <Link
            href="/shop"
            sx={{
              textDecoration: "none",
            }}
          >
            <Button
              sx={{
                bgcolor: "#325240",
                color: "#f9f9f9",
                "&:hover": {
                  color: "#325240",
                  bgcolor: "#f9f9f9",
                  border: "2px solid #325240",
                },
              }}
            >
              GO TO Shop PAGE
            </Button>
          </Link>
        </Box>
      );
    }
  };
  const BillingDetails = () => {
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: "80%",
          m: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CssTextField
              name="bill_name"
              required
              fullWidth
              id="bill_name"
              label="Full Name"
              onChange={(e) => {
                setBillData({
                  ...billData,
                  bill_name: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <CssTextField
              required
              fullWidth
              id="bill_street_address"
              label="Street Address"
              name="bill_street_address"
              onChange={(e) => {
                setBillData({
                  ...billData,
                  bill_street_address: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CssTextField
              required
              fullWidth
              id="bill_email"
              label="Email Address"
              name="bill_email"
              onChange={(e) => {
                setBillData({
                  ...billData,
                  bill_email: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CssTextField
              required
              fullWidth
              name="bill_phone"
              label="Phone"
              type="number"
              id="bill_phone"
              onChange={(e) => {
                setBillData({
                  ...billData,
                  bill_phone: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <CssTextField
              multiline
              fullWidth
              maxRows={4}
              minRows={4}
              id="bill_notes"
              label="Order Notes"
              name="bill_notes"
              onChange={(e) => {
                setBillData({
                  ...billData,
                  bill_notes: e.target.value,
                });
              }}
            />
          </Grid>
        </Grid>
      </Box>
    );
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
          <Link underline="hover" sx={{ color: "#325240" }} href="/">
            <h2>Home</h2>
          </Link>
          <Typography
            sx={{ color: "#325240", fontSize: "24px", fontWeight: "bold" }}
          >
            CheckOut
          </Typography>
        </Breadcrumbs>
      </Box>
      <Typography
        sx={{
          color: "#325240",
          textAlign: "center",
          fontSize: "32px",
          mt: 3,
          mb: 3,
          fontWeight: "bold",
        }}
      >
        Billing details
      </Typography>
      <Box>{BillingDetails()}</Box>
      <Typography
        sx={{
          color: "#325240",
          textAlign: "center",
          fontSize: "32px",
          mt: 3,
          mb: 3,
          fontWeight: "bold",
        }}
      >
        Your Order
      </Typography>
      <Box>{displayCartProducts()}</Box>
      {backDrop()}
      {errorfunction()}
      <Footer />
    </>
  );
};

export default CheckOut;
