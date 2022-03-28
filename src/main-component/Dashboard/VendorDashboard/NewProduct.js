import * as React from "react";
import axios from "axios";
import qs from "query-string";
import profile from "../../../assets/Images/profile.png";
import { BsPlusLg } from "react-icons/bs";

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
import validator from "validator";
import { storage } from "../../../Firebase/index";
import Products from "./Products";
import { makeStyles } from "@mui/styles";
import ValidatorProduct from "../../Validator/ValidatorProduct";
import {
  setCookie,
  getCookie,
  deleteCookie,
} from "../../Validator/CookieFunction";
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
const categoryName = [
  { label: "Dairy Products" },
  { label: "Fruits" },
  { label: "Grocery" },
  { label: "Vegetables" },
];
const unitName = [
  { label: "Piece" },
  { label: "Kg" },
  { label: "Gram" },
  { label: "Liter" },
  { label: "Mm" },
  { label: "Ml" },
  { label: "Packet" },
  { label: "Box" },
  { label: "Pound" },
  { label: "Dozen" },
  { label: "Ton" },
];
const Stock = [{ label: "In Stock" }, { label: "Out of Stock" }];
const NewProduct = () => {
  const classes = useStyles();
  const account = JSON.parse(getCookie("account"));
  const token = getCookie("token");
  const [state, setState] = React.useState({
    open: false,
    isLogged: false,
    message: "",
  });
  const [flag, setFlag] = React.useState(false);
  const [imagefile, setImagefile] = React.useState();
  const { isLogged, open, message } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const info = {
      pro_image: imagefile,
      pro_name: validator.trim(data.get("pro_name")),
      pro_category: data.get("pro_category"),
      pro_unit: data.get("pro_unit"),
      pro_mrp: data.get("pro_mrp"),
      pro_sell_price: data.get("pro_sell_price"),
      pro_stock: data.get("pro_stock"),
      pro_hsn: validator.trim(data.get("pro_hsn")),
      sdescription: validator.trim(data.get("sdescription")),
      ldescription: validator.trim(data.get("ldescription")),
    };

    const errorMessage = ValidatorProduct(info);
    // console.log(errorMessage);
    if (!errorMessage.flag) {
      setState({
        open: true,
        message: errorMessage.message,
      });
    } else {
      const d = new Date();
      let time = d.getTime();
      setFlag(true);
      const uploadTask = storage
        .ref(`images/products/${account._id}_${time}_${imagefile.name}`)
        .put(imagefile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          console.log("calling function ...");
          storage
            .ref("images/products/")
            .child(`${account._id}_${time}_${imagefile.name}`)
            .getDownloadURL()
            .then((url) => {
              console.log("main : ", url);
              const Data = {
                vendor_id: account._id,
                vendor_email_id: account.email_id,
                vendor_city: account.city,
                vendor_state: account.state,
                vendor_phone: account.phone,
                pro_name: info.pro_name,
                pro_category: info.pro_category,
                sdescription: info.sdescription,
                ldescription: info.ldescription,
                pro_image: url,
                pro_unit: info.pro_unit,
                pro_mrp: info.pro_mrp,
                pro_sell_price: info.pro_sell_price,
                pro_stock: info.pro_stock,
                pro_hsn: info.pro_hsn,
              };
              axios({
                method: "post",
                headers: {
                  "content-type": "application/x-www-form-urlencoded",
                  Authorization: `Bearer ${token}`,
                },
                data: qs.stringify(Data),
                url: `${process.env.REACT_APP_BASEURL}products/add_product`,
              })
                .then(function (response) {
                  if (response.data.status === 200) {
                    setState({
                      isLogged: true,
                      open: true,
                      message: "You have Successfully Added New Products",
                    });
                    setFlag(false);
                    window.location.replace("/dashboard/VendorDashboard/2");
                  }
                })
                .catch(function (error) {
                  setState({
                    open: true,
                    message: "Please Try again!",
                  });
                });
            });
        }
      );
    }
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
          bgcolor: "#325240",
          "&:hover": {
            backgroundColor: "#325240",
          },
        }}
      >
        Save Product
      </Button>
      <div>{errorfunction()}</div>
      <div>{backDrop()}</div>
    </React.Fragment>
  );
  return (
    <>
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
        ADD NEW PRODUCT
      </Typography>
      <Box
        sx={{
          margin: "auto",
          width: "50%",
          marginTop: 2,
          padding: "20px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          border: "2px dashed #325240",
        }}
      >
        <Box sx={{ alignContent: "center", alignItems: "center" }}>
          <div className={classes.avatarUpload}>
            <div className={classes.avatarEdit}>
              <input
                className={classes.cinput}
                type="file"
                id="imageUpload1"
                accept=".png, .jpg, .jpeg"
                onChange={(e) => {
                  var pro_image1 = document.getElementById("pro_image1");

                  pro_image1.src = URL.createObjectURL(e.target.files[0]);
                  setImagefile(e.target.files[0]);
                }}
              />

              <label className={classes.clabel} htmlFor="imageUpload1">
                <BsPlusLg />
              </label>
            </div>
            <div className={classes.avatarPreview}>
              <img
                className={classes.cdiv}
                id="pro_image1"
                alt="pro_image1"
                src={profile}
              />
            </div>
          </div>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CssTextField
                name="pro_name"
                required
                fullWidth
                type="name"
                id="pro_name"
                label="Product Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box CssTextField sx={{ minWidth: 120 }}>
                <CssFormControl
                  fullWidth
                  required
                  name="pro_category"
                  label="Category"
                  type="name"
                  id="pro_category"
                >
                  <Autocomplete
                    required
                    id="combo-box-category"
                    options={categoryName}
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        label="Category"
                        name="pro_category"
                        id="pro_category"
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
                  name="pro_unit"
                  label="Unit"
                  type="name"
                  id="pro_unit"
                >
                  <Autocomplete
                    required
                    id="combo-box-unit"
                    options={unitName}
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        label="Unit"
                        id="pro_unit"
                        name="pro_unit"
                      />
                    )}
                  />
                </CssFormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CssTextField
                required
                fullWidth
                id="pro_mrp"
                label="MRP"
                type="number"
                name="pro_mrp"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CssTextField
                required
                fullWidth
                type="number"
                name="pro_sell_price"
                label="Selling Price"
                id="pro_sell_price"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box CssTextField sx={{ minWidth: 120 }}>
                <CssFormControl
                  fullWidth
                  required
                  name="pro_stock"
                  label="Stock"
                  type="Stock"
                  id="pro_stock"
                >
                  <Autocomplete
                    required
                    id="combo-box-stock"
                    options={Stock}
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        label="Stock"
                        id="pro_stock"
                        name="pro_stock"
                      />
                    )}
                  />
                </CssFormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CssTextField
                required
                fullWidth
                name="pro_hsn"
                label="HSN Code"
                type="name"
                id="pro_hsn"
              />
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                required
                multiline
                fullWidth
                maxRows={2}
                minRows={1}
                id="sdescription"
                label="Short Description"
                name="sdescription"
              />
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                required
                multiline
                fullWidth
                minRows={1}
                id="ldescription"
                label="Long Description"
                name="ldescription"
              />
            </Grid>
          </Grid>
          {buttons}
        </Box>
      </Box>
    </>
  );
};
export default NewProduct;
