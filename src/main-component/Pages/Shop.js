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
import { getCookie } from "../Validator/CookieFunction";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
// import ShopProducts from "../sub-component/ShopProducts";
import profile from "../../assets/Images/apples.png";
import Footer from "../sub-component/Footer";

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
const data = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Victor Wayne" },
  { id: 3, name: "Jane Doe" },
  { id: 4, name: "Jane Doe" },
  { id: 5, name: "John Doe" },
  { id: 6, name: "Victor Wayne" },
  { id: 7, name: "Jane Doe" },
  { id: 8, name: "John Doe" },
  { id: 9, name: "Victor Wayne" },
  { id: 10, name: "Jane Doe" },
  { id: 11, name: "John Doe" },
  { id: 12, name: "Victor Wayne" },
  { id: 13, name: "Jane Doe" },
  { id: 14, name: "Jane Doe" },
  { id: 15, name: "John Doe" },
  { id: 16, name: "Victor Wayne" },
  { id: 17, name: "Jane Doe" },
  { id: 18, name: "John Doe" },
  { id: 19, name: "Victor Wayne" },
  { id: 20, name: "Jane Doe" },
  { id: 21, name: "John Doe" },
  { id: 22, name: "Victor Wayne" },
  { id: 23, name: "Jane Doe" },
  { id: 24, name: "Jane Doe" },
  { id: 25, name: "John Doe" },
  { id: 26, name: "Victor Wayne" },
  { id: 27, name: "Jane Doe" },
  { id: 28, name: "John Doe" },
  { id: 29, name: "Victor Wayne" },
  { id: 30, name: "Jane Doe" },
];
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
  menuPaper: {
    maxHeight: 300,
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
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

const Shop = () => {
  const classes = useStyles();

  const [searchCategory, setSearchCategory] = React.useState("All Products");
  const [searchSorting, setSearchSorting] = React.useState("Default Sorting");
  const [cityname, setCityName] = React.useState(getCookie("city"));
  const [searchItem, setSearchItem] = React.useState("");
  const handleOnSearch = (string, results) => {
    console.log(string, results);
    setSearchItem(string);
  };
  const handleOnSelect = (item) => {
    // setSearchItem(item);
  };
  return (
    <>
      {/* searchbar in top */}
      <Box
        sx={{
          padding: "10px 0px 5px 0px",
          bgcolor: "#325240",
          width: "100%",
          position: "fixed",
          zIndex: 39,
          borderBottom: "2px outset #f9f9f9",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={2.1} sx={{ mt: "8px" }}>
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
                  value={cityname}
                  onChange={(event, value) => {
                    setCityName(value.label);
                  }}
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
          <Grid item xs={6.9}>
            <Box
              sx={{
                marginTop: "4px",
                borderRadius: "18px",
                boxShadow: "0 16px 16px 0 rgba(0, 0, 0, 0.2)",
                marginLeft: "10%",
                marginRight: "15%",
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
      {/* shop in page products diaplay */}
      <Box
        sx={{
          bgcolor: "#f9f9f9",
          position: "relative",
          width: "100%",
          top: "71px",
        }}
      >
        {/* <ShopProducts city={cityname} /> */}
        <div>
          {/* home > shop content */}
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
            {/* filter box  */}
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
                  justifyContent: "space-between", //space-around  //space-evenly
                  padding: "10px",
                  marginLeft: "30px",
                  marginRight: "30px",
                }}
              >
                <h3 style={{ color: "#325240" }}>Showing 1–9 of 15 results</h3>
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                  <Box sx={{ minWidth: 220, marginRight: "20px" }}>
                    <Css2FormControl
                      fullWidth
                      name="Category"
                      label="Category"
                      type="Category"
                      id="Category"
                    >
                      <Autocomplete
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
            </Box>
            {/* products card container */}
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
                  <Box
                    className={classes.productCard}
                    key={data.id}
                    onClick={() => {
                      console.log(data.id);
                    }}
                  >
                    <Box
                      className={classes.badge}
                      onClick={() => {
                        console.log(data.name);
                      }}
                    >
                      <BsBasketFill size="20" />
                    </Box>
                    <Box className={classes.productTumb}>
                      <img src={profile} alt="" />
                    </Box>
                    <Box className={classes.productDetails}>
                      <h2>{data.name}</h2>

                      <Box className={classes.productBottomDetails}>
                        <Box className={classes.productPrice}>
                          PRICE :-₹230.99<small>₹96.00</small>
                        </Box>
                        <Box className={classes.productLinks}>Kg</Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </div>
            </Box>
          </Box>
        </div>
        <Footer />
      </Box>
    </>
  );
};

export default Shop;
