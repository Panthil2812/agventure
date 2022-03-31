import React from "react";
import { BsBasketFill } from "react-icons/bs";
import { styled, alpha } from "@mui/material/styles";
import {
  Popover,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  IconButton,
  Dialog,
  Button,
  Autocomplete,
  FormControl,
  MenuItem,
  Menu,
  createTheme,
  TextField,
  Select,
  Grid,
  Chip,
  Snackbar,
  Divider,
  Pagination,
  ThemeProvider,
  Breadcrumbs,
  Link,
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
import { ImCross } from "react-icons/im";
import { BsCurrencyPound } from "react-icons/bs";
import { getCookie } from "../Validator/CookieFunction";

import { ReactSearchAutocomplete } from "react-search-autocomplete";
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#325240",
  },
  // MuiFormLabel-root-MuiInputLabel-root
  "& .MuiInput-underline:after": {
    // borderWidth: "2px",
    // borderBottomColor: "#325240",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      // borderWidth: "2px",
      // borderColor: "#325240",
    },
    "&:hover fieldset": {
      borderWidth: "2px",
      borderColor: "#325240",
    },
    "&.Mui-focused fieldset": {
      // borderWidth: "2px",
      // borderColor: "#325240",
    },
  },
});
const CssFormControl = styled(FormControl)({
  "& .MuiFormLabel-root": {
    color: "#fff",
  },
  "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root": {
    color: "#f9f9f9",
  },
  "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui": {
    color: "#f9f9f9",
  },
  "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
    color: "f9f9f9",
  },
  "& .MuiInputBase-root": {
    border: "none",
    color: "#ddf6e4",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
  },
});
const meunName = [
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
const useStyles = makeStyles(() => ({
  menuPaper: {
    maxHeight: 300,
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
}));
const Shop = () => {
  const classes = useStyles();
  const [cityname, setCityName] = React.useState(getCookie("city"));

  const handleOnSearch = (string, results) => {
    console.log(string, results);
    //setSearchItem(string);
  };
  const handleOnSelect = (item) => {
    // setSearchItem(item);
  };
  return (
    <>
      <Box
        sx={{
          padding: "10px 0px 5px 0px",
          bgcolor: "#325240",
          width: "100%",
          position: "fixed",
          zIndex: 39,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={2} sx={{ mt: "8px" }}>
            <Box
              sx={{
                marginLeft: "10px",
              }}
            >
              <CssFormControl
                fullWidth
                required
                name="vcity"
                label="City"
                type="City"
                id="vcity"
              >
                <Autocomplete
                  required
                  id="combo-box-city"
                  options={meunName}
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      label="City"
                      name="vcity"
                      id="vcity"
                    />
                  )}
                />
              </CssFormControl>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box
              sx={{
                marginTop: "8px",
                borderRadius: "18px",
                boxShadow: "0 16px 16px 0 rgba(0, 0, 0, 0.2)",
                marginLeft: "15%",
                marginRight: "10%",
              }}
            >
              <ReactSearchAutocomplete
                //  items={[{ pro_name: searchitem }, ...ProductData]}
                maxResults={6}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                placeholder="Search Products"
                resultStringKeyName="pro_name"
                fuseOptions={{
                  keys: ["pro_name", "pro_category"],
                }}
                styling={{
                  // marginBottom: "7vh"
                  placeholderFontSize: "2.5vh",
                  fontSize: "2.5vh",
                  color: "#325240",
                  backgroundColor: "#f9f9f9",
                }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              "& :hover": {
                color: "#fff",
              },
            }}
          >
            <Box
              sx={{
                marginRight: "30px",
                float: "right",
                padding: "5px",
                color: "#ddf6e4",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  textAlign: "right",
                  marginRight: "10px",
                }}
              >
                My Cart
                <br />0 items - ₹0.00
              </Typography>
              <BsBasketFill size="25" />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          bgcolor: "#f9f9f9",
          position: "relative",
          width: "100%",
          top: "71px",
          paddingLeft: "20px",
          borderBottom: "2px outset #325240",
        }}
      >
        <Breadcrumbs aria-label="breadcrumb" separator="›">
          <Link underline="hover" color="inherit" href="/">
            <h2>Home</h2>
          </Link>
          <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
            Shop
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
        <h1>panthil malaviya</h1>
      </Box>
    </>
  );
};

export default Shop;
{
  /* <CssFormControl sx={{}}> */
}
{
  /* <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cityname}
                sx={{
                  // marginLeft: "30px",
                  // paddingRight: "0px",
                  "& .MuiSelect-icon": {
                    color: "#ddf6e4",
                  },
                }}
                onChange={(event) => {
                  setCityName(event.target.value);
                }}
                MenuProps={{ classes: { paper: classes.menuPaper } }}
              >
                {meunName.map((City) => (
                  <MenuItem value={City.label} key={City.label}>
                    {City.label}
                  </MenuItem>
                ))}
              </Select> */
}
{
  /* </CssFormControl> */
}
