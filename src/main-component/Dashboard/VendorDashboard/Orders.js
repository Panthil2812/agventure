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
import { BsPlusLg } from "react-icons/bs";

import axios from "axios";
import qs from "query-string";
import profile from "../../../assets/Images/profile.png";
import nofound from "../../../assets/Images/nofound.png";
import { storage } from "../../../Firebase/index";
import { getCookie } from "../../Validator/CookieFunction";
import DeleteIcon from "@mui/icons-material/Delete";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { BiRupee } from "react-icons/bi";
import ValidatorProduct from "../../Validator/ValidatorProduct";
import capitalizeFirstLetter from "../../Validator/capitalizeFirstLetter";
const useStyles = makeStyles(() => ({
  avatarUpload: {
    position: "relative",
    margin: "auto",
  },
  avatarEdit: {
    position: "absolute",
    right: "12px",
    zIndex: "12",
    top: "10px",
  },
  cinput: {
    display: "none",
  },
  clabel: {
    display: "inline-block",
    width: "20px",
    height: "20px",
    padding: "5px",
    backgroundColor: "#f9f9f9",
    borderRadius: "100%",
    textAlign: "center",
    border: "2px solid #325240",
    boxShadow: "0px 8px 8px 0px rgba(0, 0, 0, 0.12)",

    "&:hover": {
      background: "#f1f1f1",
      borderColor: "#d6d6d6",
    },
  },
  avatarPreview: {
    width: "132px",
    height: "132px",
    position: "relative",
    borderRadius: "8%",
    border: "2px solid #325240",
    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)",
  },
  cdiv: {
    width: " 100%",
    height: "100%",
    borderRadius: "6%",
    backgroundPosition: "center",
  },
}));
const theme = createTheme();

const Css2FormControl = styled(FormControl)({
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

const categoryName = [
  { label: "Pending" },
  { label: "Cancelled" },
  { label: "Delivery" },
  { label: "On hold" },
];
const Orders = () => {
  const classes = useStyles();
  const account = JSON.parse(getCookie("account"));
  const token = getCookie("token");
  const [state, setState] = React.useState({
    open1: false,
    isLogged: false,
    message: "",
  });
  const { isLogged, open1, message } = state;
  const [ProductData, setproductData] = React.useState([]);
  const [currentpageData, setcurrentpageDate] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [searchCategory, setSearchCategory] = React.useState("");
  const [DataperPage, setDataperPage] = React.useState(10);
  const [flag, setFlag] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const handleChangePage = (event, value) => {
    console.log(value);
    setPage(value);
  };
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
  const vendorProducts = () => {
    setFlag(true);
    axios({
      method: "get",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      url: `${process.env.REACT_APP_BASEURL}Order/vendor_Order_products/${account._id}`,
    })
      .then(function (response) {
        if (response.data.status === 504) {
          console.log("error");
          setFlag(false);
        }
        if (response.data.status === 200) {
          setproductData(response.data.data);
          setFlag(false);
          setPage(1);
          return 0;
        }
      })
      .catch(function (error) {
        setFlag(false);
      });
  };
  React.useEffect(() => {
    setcurrentpageDate(
      ProductData.filter(
        (e) => searchCategory === "" || e.pro_status === searchCategory
      )
    );
  }, [page, ProductData, searchCategory]);
  React.useEffect(() => {
    vendorProducts();
  }, []);

  const DisplayProducts = React.useMemo(() => {
    const indexOfLastPost = page * DataperPage;
    const indexOfFirstPost = indexOfLastPost - DataperPage;
    return currentpageData.slice(indexOfFirstPost, indexOfLastPost);
  }, [page, currentpageData]);

  const showProducts = () => {
    if (!currentpageData.length) {
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
          {DisplayProducts.map((data) => {
            // console.log(data.pro_image);

            return (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
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
                key={data._id}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={1} sx={{ alignSelf: "center" }}>
                      <img
                        style={{
                          width: "75px",
                          height: "70px",
                          borderRadius: "10px",
                        }}
                        src={data.pro_image.replace(
                          "/products/",
                          "%2Fproducts%2F"
                        )}
                        alt="crat products image"
                      />
                    </Grid>
                    <Grid item xs={4} sx={{ alignSelf: "center" }}>
                      <Box
                        sx={{
                          alignSelf: "center",
                          marginLeft: "20px",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#325240",
                            fontSize: "18px",
                            fontWeight: "bold",
                          }}
                        >
                          {data.pro_name}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#325240",
                            fontSize: "14px",
                          }}
                        >
                          ₹ {data.pro_sell_price} x {data.pro_qty}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4} sx={{ alignSelf: "center" }}>
                      <Typography
                        sx={{
                          color: "#325240",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        <Chip
                          label={data.customer_id}
                          sx={{ bgcolor: "#325240", color: "#fff" }}
                        />
                      </Typography>
                    </Grid>
                    <Grid item xs={3} sx={{ alignSelf: "center" }}>
                      {data.pro_status === "Delivery" && (
                        <Chip
                          label={data.pro_status}
                          sx={{ bgcolor: "#325240", color: "#fff" }}
                        />
                      )}
                      {data.pro_status === "Cancelled" && (
                        <Chip
                          label={data.pro_status}
                          sx={{ bgcolor: "#B10000", color: "#fff" }}
                        />
                      )}
                      {data.pro_status != "Cancelled" &&
                        data.pro_status != "Delivery" && (
                          <Box sx={{ minWidth: 120, marginRight: "20px" }}>
                            <Css2FormControl
                              fullWidth
                              name="Status"
                              label="Status"
                              type="Status"
                              id="Status"
                            >
                              <Autocomplete
                                id="combo-box-category"
                                options={categoryName}
                                disableClearable
                                value={data.pro_status}
                                onChange={(event, value) => {
                                  data.pro_status = value.label;
                                  setFlag(true);
                                  axios({
                                    method: "post",
                                    headers: {
                                      "content-type":
                                        "application/x-www-form-urlencoded",
                                      Authorization: `Bearer ${token}`,
                                    },
                                    data: qs.stringify(data),
                                    url: `${process.env.REACT_APP_BASEURL}Order/vendor_Order_edit_products`,
                                  })
                                    .then(function (response) {
                                      if (response.data.status === 200) {
                                        setState({
                                          isLogged: true,
                                          open1: true,
                                          message:
                                            "You have Successfully Change Status",
                                        });
                                        setPage(1);
                                      }
                                    })
                                    .catch(function (error) {
                                      setState({
                                        open1: true,
                                        message: "Please Try again!",
                                      });
                                    });
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Status"
                                    name="Status"
                                    id="Status"
                                  />
                                )}
                              />
                            </Css2FormControl>
                          </Box>
                        )}
                    </Grid>
                  </Grid>
                </Box>
              </Box>
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
            margin: "0 auto 32px auto",
            width: "fit-content",
            borderBottom: "2px outset #325240",
            textAlign: "center",
          }}
        >
          Orders
        </Typography>
        <Box
          sx={{
            bgcolor: "#f0f0f0",
            boxShadow: "0px 16px 16px 0px rgba(0, 0, 0, 0.2)",
            border: "1px solid #325240",
            borderRadius: "8px",
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              marginLeft: "30px",
              marginRight: "30px",
            }}
          >
            <h3 style={{ color: "#325240" }}>
              Total {ProductData.length} Order
            </h3>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Box sx={{ minWidth: 220, marginRight: "20px" }}>
                <Css2FormControl
                  fullWidth
                  name="Status"
                  label="Status"
                  type="Status"
                  id="Status"
                >
                  <Autocomplete
                    id="combo-box-category"
                    options={categoryName}
                    value={searchCategory}
                    disableClearable
                    onChange={(event, value) => {
                      setPage(1);
                      setSearchCategory(value.label);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Status"
                        name="Status"
                        id="Status"
                      />
                    )}
                  />
                </Css2FormControl>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 7 }}>{showProducts()}</Box>

        {backDrop()}
        {errorFunction()}
      </Box>
    </>
  );
};
export default Orders;
