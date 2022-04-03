import React from "react";
import { BsBasketFill } from "react-icons/bs";
import { IoMdArrowDropup } from "react-icons/io";
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
import axios from "axios";
import nofound from "../../assets/Images/nofound.png";
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
  { label: "Ahmedabad" },
  { label: "Bangalore" },
  { label: "Delhi" },
  { label: "Mumbai" },
  { label: "Rajkot" },
  { label: "Surat" },
];
const SortName = [
  { label: "Default Sorting" },
  { label: "Sort by Latest" },
  { label: "Sort by Price: Low to High" },
  { label: "Sort by Price: High to Low" },
];
const categoryName = [
  { label: "All Products" },
  { label: "Dairy Products" },
  { label: "Fruits & Vegetables" },
  { label: "Grain" },
  { label: "nuts" },
  { label: "pluses" },
  { label: "Spices and condiments" },
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

  const [ProductData, setProductData] = React.useState([]);
  const [searchCategory, setSearchCategory] = React.useState("All Products");
  const [searchSorting, setSearchSorting] = React.useState("Default Sorting");
  const [cityname, setCityName] = React.useState(getCookie("city"));
  const [searchitem, setSearchItem] = React.useState("");
  const [currentpageData, setcurrentpageDate] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [flag, setFlag] = React.useState(false);
  const [productNumPerpage, setProductNumPage] = React.useState({
    numstart: 0,
    numend: 0,
  });
  const [DataperPage, setDataperPage] = React.useState(10);
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
  const handleClose = () => {
    setFlag(false);
  };
  const allProducts = () => {
    setFlag(true);
    axios({
      method: "get",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        // Authorization: `Bearer ${token}`,
      },
      url: `${process.env.REACT_APP_BASEURL}products/fetch_all_products_without_token`,
    })
      .then(function (response) {
        if (response.data.status === 504) {
          console.log("error");
          setFlag(false);
        }
        if (response.data.status === 200) {
          setProductData(response.data.data);
          setFlag(false);
          setPage(1);
          return 0;
        }
      })
      .catch(function (error) {
        setFlag(false);
      });
  };
  const handleChangePage = (event, value) => {
    console.log(value);
    setPage(value);
  };
  const handleOnSearch = (string, results) => {
    setSearchCategory("All Products");
    setSearchSorting("Default Sorting");
    setSearchItem(string);
  };
  const handleOnSelect = (item) => {
    setSearchCategory("All Products");
    setSearchSorting("Default Sorting");
    setSearchItem(item.pro_name);
  };
  React.useEffect(() => {
    allProducts();
  }, []);
  React.useEffect(() => {
    // console.log(cityname);

    const getSortKey = {
      "Default Sorting": { key: "_id", order: "asc" },
      "Sort by Latest": { key: "create_date", order: "asc" },
      "Sort by Price: Low to High": { key: "pro_sell_price", order: "desc" },
      "Sort by Price: High to Low": { key: "pro_sell_price", order: "asc" },
    };
    setcurrentpageDate(
      ProductData.filter(
        (e) =>
          searchCategory === "All Products" || e.pro_category === searchCategory
      )
        // .filter(
        //   (e) =>
        //     searchSorting === "Default Sorting" ||
        //     (searchSorting === "Sort by Latest" &&
        //       e.pro_sell_price
        //         .sort((d1, d2) => {
        //           return d1 - d2;
        //         })
        //         .reverse())
        // )
        .filter((e) => e.vendor_city === cityname)
        .filter(
          (e) =>
            e.pro_name.toLowerCase().includes(searchitem.toLowerCase()) ||
            e.vendor_email_id.toLowerCase().includes(searchitem.toLowerCase())
        )
        .sort((a, b) =>
          getSortKey[searchSorting].order === "asc"
            ? b[getSortKey[searchSorting].key] -
              a[getSortKey[searchSorting].key]
            : a[getSortKey[searchSorting].key] -
              b[getSortKey[searchSorting].key]
        )
    );
  }, [page, searchitem, cityname, searchCategory, searchSorting]);

  const DisplayProducts = React.useMemo(() => {
    console.log(currentpageData);
    const indexOfLastPost = page * DataperPage;
    const indexOfFirstPost = indexOfLastPost - DataperPage;
    setProductNumPage({
      numstart: indexOfFirstPost + 1,
      numend: indexOfLastPost,
    });
    return currentpageData.slice(indexOfFirstPost, indexOfLastPost);
  }, [page, currentpageData]);
  const displayProductsInShop = () => {
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
              No Products Found!
            </span>
            <span>Ready to start selling something awesome?</span>
          </Typography>
        </Box>
      );
    } else {
      return (
        <Box>
          <div
            style={{
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              // justifyContent: "center",
            }}
          >
            {DisplayProducts.map((data) => (
              <Box
                className={classes.productCard}
                key={data.id}
                onClick={() => {
                  console.log(data._id);
                }}
              >
                <Box
                  className={classes.badge}
                  onClick={(e) => {
                    console.log(data.pro_name);
                    e.stopPropagation();
                  }}
                >
                  <BsBasketFill size="20" />
                </Box>
                <Box className={classes.productTumb}>
                  <img
                    src={data.pro_image ? data.pro_image : profile}
                    alt="products_img"
                  />
                </Box>
                <Box className={classes.productDetails}>
                  <h2>{data.pro_name}</h2>

                  <Box className={classes.productBottomDetails}>
                    <Box className={classes.productPrice}>
                      PRICE :-₹{data.pro_sell_price}
                      <small>₹{data.pro_mrp}</small>
                    </Box>
                    {/* <Box className={classes.productLinks}>{data.pro_unit}</Box> */}
                    <Box className={classes.productLinks}>
                      {data.pro_unit}
                      <br />
                      {data.pro_stock === "In Stock" && (
                        <strong style={{ color: "#325240", paddingTop: "8px" }}>
                          {data.pro_stock}
                        </strong>
                      )}
                      {data.pro_stock === "Out of Stock" && (
                        <strong style={{ color: "#B10000", paddingTop: "8px" }}>
                          {data.pro_stock}
                        </strong>
                      )}
                      {/*  */}
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </div>
          <Box sx={{ mt: 7, mb: 7, display: "flex", justifyContent: "center" }}>
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
  const SearchBar = (
    <React.Fragment>
      <ReactSearchAutocomplete
        items={[{ pro_name: searchitem }, ...ProductData]}
        maxResults={6}
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        placeholder="Search Products"
        resultStringKeyName="pro_name"
        fuseOptions={{
          keys: ["pro_name", "vendor_email_id"],
        }}
        styling={{
          borderRadius: "9px",
          boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.2)",
          border: "3px solid #325240",

          marginBottom: "7vh",
          placeholderFontSize: "2.5vh",
          fontSize: "2.5vh",
          color: "#325240",
          backgroundColor: "#f9f9f9",
        }}
      />
    </React.Fragment>
  );
  return (
    <>
      {/* searchbar in top */}
      <Box
        sx={{
          padding: "10px 0px 5px 0px",
          bgcolor: "#325240",
          width: "100%",
          position: "fixed",
          zIndex: 9999,
          borderBottom: "2px outset #f9f9f9",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={2.1} sx={{ mt: "8px" }}>
            <Box sx={{ marginLeft: "20px" }}>
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
                  popupIcon={<IoMdArrowDropup color="white" />}
                  disableClearable
                  onChange={(event, value) => {
                    setCityName(value.label);
                    setSearchCategory("All Products");
                    setSearchSorting("Default Sorting");
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
              {SearchBar}
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
          <Box sx={{ bgcolor: "#f9f9f9" }}>
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
                <h3 style={{ color: "#325240" }}>
                  {/* Showing {productNumPerpage.numstart}–
                  {productNumPerpage.numend} of  */}
                  Showing {currentpageData.length} Results
                </h3>
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
                        disableClearable
                        onChange={(event, value) => {
                          setSearchCategory(value.label);
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
                        disableClearable
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
            {displayProductsInShop()}
            {backDrop()}
          </Box>
        </div>
        <Footer />
      </Box>
    </>
  );
};

export default Shop;
