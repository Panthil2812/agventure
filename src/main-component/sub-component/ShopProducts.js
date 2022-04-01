import React from "react";
import { BsBasketFill } from "react-icons/bs";
import profile from "../../assets/Images/apples.png";
import { makeStyles } from "@mui/styles";
import {
  Popover,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  IconButton,
  Dialog,
  styled,
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
  Container,
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
const SortName = [
  { label: "Default Sorting" },
  { label: "Sort by Popularity" },
  { label: "Sort by Latest" },
  { label: "Sort by Price: Low to High" },
  { label: "Sort by Price: High to Low" },
];
const categoryName = [
  { label: "All Products" },
  { label: "Dairy Products" },
  { label: "Fruits" },
  { label: "Grocery" },
  { label: "Vegetables" },
];
const useStyles = makeStyles(() => ({
  productCard: {
    width: "252px",
    margin: "20px",
    padding: "10px",
    position: "relative",
    background: "#f9f9f9",
    border: "1.5px solid #325240",
    borderRadius: "10px",
    boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    transform: "scale(1)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: "0 20px 20px 0 rgba(0, 0, 0, 0.2)",
    },
  },
  badge: {
    position: "absolute",
    right: "0",
    top: "0",
    margin: "25px",
    fontSize: "13px",
    padding: "10px",
    borderRadius: "50%",
    background: "#f9f9f9",
    color: "#325240",
    border: "1px solid #325240",
    zIndex: "2",
    overflow: "hidden",
    transform: "scale(1)",
    "&:hover": {
      background: "#325240",
      color: "#f9f9f9",
      border: "2px solid #f0f0f0",
      transform: "scale(1.01)",
      /* box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2)", */
    },
  },
  productTumb: {
    width: "100%",
    height: "270px",
    borderRadius: "5%",
    boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.2)",
    border: "2px solid #325240",
    overflow: "hidden",
    "& img": {
      width: "100%",
      height: "100%",
      transform: "scale(1)",
      transition: "all 0.5s ease-in-out",
    },
    "& :hover": {
      transform: "scale(1.2)",
    },
  },
  productDetails: {
    padding: "10px",
    "& h2": {
      fontWeight: "600",
      marginBottom: "18px",
      textAlign: "center",
      textTransform: "capitalize",
      color: "#325240",
      textDecoration: "none",
      transition: "0.3s",
    },
    "& p": {
      fontSize: "15px",
      lineHeight: "22px",
      marginBottom: "18px",
      color: "#325240",
    },
  },

  productBottomDetails: {
    overflow: "hidden",
    borderTop: "2px solid #325240",
    paddingTop: "10px",
    "& div": {
      float: "left",
      width: "50%",
    },
    "& small": {
      textAlign: "center",
      color: "#325240",
      fontSize: "80%",
      fontWeight: "600",
    },
  },

  productPrice: {
    fontSize: "18px",
    color: "#325240",
    fontWeight: "600",
    "& small": {
      marginLeft: "5px",
      fontSize: "80%",
      fontWeight: "400",
      textDecoration: "line-through",
      display: "inline-block",
    },
  },

  productLinks: {
    textAlign: "right",
    color: "#325240",
  },
}));
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
const ShopProducts = (props) => {
  const classes = useStyles();
  const data = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Victor Wayne" },
    { id: 3, name: "Jane Doe" },
    { id: 3, name: "Jane Doe" },
    { id: 1, name: "John Doe" },
    { id: 2, name: "Victor Wayne" },
    { id: 3, name: "Jane Doe" },
    { id: 1, name: "John Doe" },
    { id: 2, name: "Victor Wayne" },
    { id: 3, name: "Jane Doe" },
    { id: 1, name: "John Doe" },
    { id: 2, name: "Victor Wayne" },
    { id: 3, name: "Jane Doe" },
    { id: 3, name: "Jane Doe" },
    { id: 1, name: "John Doe" },
    { id: 2, name: "Victor Wayne" },
    { id: 3, name: "Jane Doe" },
    { id: 1, name: "John Doe" },
    { id: 2, name: "Victor Wayne" },
    { id: 3, name: "Jane Doe" },
    { id: 1, name: "John Doe" },
    { id: 2, name: "Victor Wayne" },
    { id: 3, name: "Jane Doe" },
    { id: 3, name: "Jane Doe" },
    { id: 1, name: "John Doe" },
    { id: 2, name: "Victor Wayne" },
    { id: 3, name: "Jane Doe" },
    { id: 1, name: "John Doe" },
    { id: 2, name: "Victor Wayne" },
    { id: 3, name: "Jane Doe" },
  ];
  const [searchCategory, setSearchCategory] = React.useState("All Products");
  const [searchSorting, setSearchSorting] = React.useState("Default Sorting");
  console.log(props.cityname);
  return (
    <div>
      <Box
        sx={{
          paddingLeft: "20px",
          borderBottom: "2px outset #f9f9f9",
        }}
      >
        <Breadcrumbs aria-label="breadcrumb" separator="›">
          <Link underline="hover" sx={{ color: "#325240" }} href="/">
            <h2>Home</h2>
          </Link>
          <Typography
            sx={{ color: "#325240", fontSize: "24px", fontWeight: "bold" }}
          >
            Shop
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box sx={{ bgcolor: "#fff" }}>
        <Box
          sx={{
            bgcolor: "#f0f0f0",
            boxShadow: "0px 16px 16px 0px rgba(0, 0, 0, 0.2)",
            border: "1px solid #325240",
            borderRadius: "8px",
            margin: 3,
          }}
        >
          <Box
            spacing={3}
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-evenly",
              padding: "10px",
            }}
          >
            <h3>Showing 1–9 of 15 results</h3>
            <Box sx={{ minWidth: 220 }}>
              <Css2FormControl
                fullWidth
                name="Category"
                label="Category"
                type="Category"
                id="Category"
              >
                <Autocomplete
                  disableClearable
                  id="combo-box-category"
                  options={categoryName}
                  value={searchCategory}
                  onChange={(event, value) => {
                    setSearchCategory(value.label);
                    console.log("value:", value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      name="Category"
                      id="Category"
                    />
                  )}
                />
              </Css2FormControl>
            </Box>
            <Box sx={{ minWidth: 320 }}>
              <Css2FormControl
                fullWidth
                name="Sorting"
                label="Sorting"
                type="Sorting"
                id="Sorting"
              >
                <Autocomplete
                  disableClearable
                  id="combo-box-sorting"
                  options={SortName}
                  value={searchSorting}
                  onChange={(event, value) => {
                    setSearchSorting(value.label);
                    console.log(searchSorting);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Sort By"
                      name="Sort By"
                      id="Sorting"
                    />
                  )}
                />
              </Css2FormControl>
            </Box>
          </Box>
        </Box>

        <Box>
          <div
            style={{
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {data.map((data) => (
              <div className={classes.productCard}>
                <div className={classes.badge}>
                  <BsBasketFill size="20" />
                </div>
                <div className={classes.productTumb}>
                  <img src={profile} alt="" />
                </div>
                <div className={classes.productDetails}>
                  <h2>{data.name}</h2>

                  <div className={classes.productBottomDetails}>
                    <div className={classes.productPrice}>
                      PRICE :-₹230.99<small>₹96.00</small>
                    </div>
                    <div className={classes.productLinks}>Kg</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default ShopProducts;
