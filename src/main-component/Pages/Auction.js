import React from "react";
import { useEffect } from "react";
import { AiFillHeart, AiFillCloseCircle } from "react-icons/ai";
import { IoMdArrowDropup } from "react-icons/io";
import profile from "../../assets/Images/profile.png";
import { styled } from "@mui/material/styles";
import {
  Popover,
  Link,
  Button,
  Autocomplete,
  FormControl,
  TextField,
  Grid,
  Snackbar,
  Pagination,
  Breadcrumbs,
  Alert,
  Box,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  getCookie,
  getCart,
  addInfoToCart,
  deleteCartProduct,
} from "../Validator/CookieFunction";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
// import ShopProducts from "../sub-component/ShopProducts";
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
    width: "352px",
    margin: "20px",
    position: "relative",
    background: "#f9f9f9",
    border: "1.5px solid #325240",
    borderRadius: "10px",
    boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    transform: "scale(1)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: "0 20px 20px 0 rgba(0, 0, 0, 0.2)",
    },
  },
  badge: {
    position: "absolute",
    right: "0",
    top: "0",
    margin: "25px",
    fontSize: "13px",
    padding: "5px",
    borderRadius: "5px",
    background: "#f9f9f9",
    alignSelf: "center",

    color: "#325240",
    border: "2px solid #325240",
    zIndex: "2",
    overflow: "hidden",
    transform: "scale(1)",
    "&:hover": {
      background: "#325240",
      color: "#f9f9f9",
      border: "2px solid #f0f0f0",
      transform: "scale(1.01)",
      boxShadow: "0 18px 18px 0 rgba(0, 0, 0, 0.2)",
    },
  },
  productTumb: {
    width: "100%",
    height: "280px",
    // m: 1,
    // boxShadow: "0 8px 8px 4px rgba(0, 0, 0, 0.2)",
    borderBottom: "2px solid #325240",
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
    "& h2": {
      fontWeight: "600",
      marginBottom: "14px",
      marginTop: "14px",
      textAlign: "center",
      textTransform: "capitalize",
      color: "#325240",
      textDecoration: "none",
      transition: "0.3s",
    },
    "& h3": {
      fontWeight: "600",
      marginBottom: "14px",
      marginTop: "14px",
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
    padding: "10px",
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
    fontSize: "16px",
    color: "#325240",
    fontWeight: "600",
    "& small": {
      marginLeft: "5px",
      fontSize: "90%",
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
const ScrollBox = styled(Box)({
  "::-webkit-scrollbar": {
    width: "4px",
  },

  "::-webkit-scrollbar-thumb": {
    background: "#325240",
  },

  "::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
});
const Shop = () => {
  // const accountData = JSON.parse(getCookie("account"));
  // const accountId = accountData._id;
  //
  const classes = useStyles();
  const [anchorCartEl, setAnchorCartEl] = React.useState(null);
  let cartFlag = Boolean(anchorCartEl);
  const popover_id = cartFlag ? "simple-popover" : undefined;
  const [state, setState] = React.useState({
    open1: false,
    isLogged: false,
    message: "",
  });
  const { isLogged, open1, message } = state;
  const [ProductData, setProductData] = React.useState([]);
  const [searchCategory, setSearchCategory] = React.useState("All Products");
  const [searchSorting, setSearchSorting] = React.useState("Default Sorting");
  const [cityname, setCityName] = React.useState(getCookie("city"));
  const [searchitem, setSearchItem] = React.useState("");
  const [currentpageData, setcurrentpageDate] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [flag, setFlag] = React.useState(false);
  const [DataperPage, setDataperPage] = React.useState(12);
  const [deletecartproduct, setDeletecartproduct] = React.useState(0);
  const [countItem, setCountItem] = React.useState({
    item: 0,
    subtotal: 0.0,
  });
  const handleCartClick = (event) => {
    setAnchorCartEl(event.currentTarget);
  };
  const handleCartClose = () => {
    setAnchorCartEl(null);
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
  const handleMessageClose = () => {
    setState({ ...state, open1: false });
  };
  const messageFunction = () => {
    // console.log("calling .....");
    // console.log("function", state);
    if (isLogged) {
      return (
        <div>
          <Snackbar
            open={open1}
            sx={{ width: "50%", zIndex: 9999 }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={3000}
            onClose={handleMessageClose}
          >
            <Alert
              variant="filled"
              onClose={handleMessageClose}
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
            onClose={handleMessageClose}
          >
            <Alert
              variant="filled"
              onClose={handleMessageClose}
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
  const handleClose = () => {
    setFlag(false);
  };
  const allProducts = () => {
    setFlag(true);
    axios({
      method: "get",
      headers: {
        // "content-type": "application/x-www-form-urlencoded",
        // Authorization: `Bearer ${token}`,
      },
      url: `${process.env.REACT_APP_BASEURL}auction/get_auction_products`,
    })
      .then(function (response) {
        if (response.data.status === 504) {
          //console.log("error");
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
  useEffect(() => {
    setTimeout(() => {
      document.getElementsByTagName("body")[0].style.paddingRight = 0;
      // console.log("cart data: ", cartData);
    }, 100);
  }, [cartFlag]);
  useEffect(() => {
    DisplayCartPopover();
    console.log("change useeffect");
  }, [deletecartproduct]);

  const handleChangePage = (event, value) => {
    // console.log(value);
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
    // getCartProducts();
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
    //console.log(currentpageData);
    const indexOfLastPost = page * DataperPage;
    const indexOfFirstPost = indexOfLastPost - DataperPage;
    return currentpageData.slice(indexOfFirstPost, indexOfLastPost);
  }, [page, currentpageData]);
  const auctionTimerBox = (, start, end) => {
    const time = 
    const setTime = "set" + time;
    [time, setTime] = React.useState({
      day: 0,
      hour: 0,
      min: 0,
      sec: 0,
    });
    setInterval(() => {
      const d = new Date();
      if (end - d.getTime() >= 0 && start <= d.getTime()) {
        const d = new Date();
        const diff = end - d.getTime();
        const day = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hour = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const min = Math.floor((diff / (1000 * 60)) % 60);
        const sec = Math.floor((diff / 1000) % 60);
        ({
          day: day,
          hour: hour,
          min: min,
          sec: sec,
        });
        console.log("diff: ", diff);
        console.log("day diff : ", day);
        console.log("Hours diff : ", hour);
        console.log("Minutes diff : ", min);
        console.log("Seconds diff : ", sec);
      } else if (end - d.getTime() <= 0) {
        console.log("time ended");
        setTime({
          day: 0,
          hour: 0,
          min: 0,
          sec: 0,
        });
      } else {
        console.log("comimg soon");
        setTime({
          day: 0,
          hour: 0,
          min: 0,
          sec: 0,
        });
      }
    }, 1000);
    return (
      <div>
        <Box
          sx={{
            width: "auto",
            bgcolor: "#f9f9f9",
            color: "#325240",
            textAlign: "center",
            p: 1,
            m: 1,
            border: "2px solid #325240",
            borderRadius: "10px",
          }}
        >
          <Typography sx={{ mb: 1, fontSize: "14px" }}>
            {/* {setInterval(() => {
                      data.pro_end_time.getTime() - date.getTime() >= 0 &&
                        data.pro_start_time.getTime() <= date.getTime();
                    }, 1000)} */}
            Time Left:
          </Typography>

          <Grid container spacing={0.5}>
            <Grid item xs={3} sx={{ textAlign: "center" }}>
              <Typography sx={{ fontSize: "14px" }}>
                {time.day}
                <br />
                Days
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                borderLeft: "1px solid black",
                textAlign: "center",
              }}
            >
              <Typography sx={{ fontSize: "14px" }}>
                {time.hour}
                <br />
                Hours
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                borderLeft: "1px solid black",
                textAlign: "center",
              }}
            >
              <Typography sx={{ fontSize: "14px" }}>
                {time.min}
                <br />
                Min
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                borderLeft: "1px solid black",
                textAlign: "center",
              }}
            >
              <Typography sx={{ fontSize: "14px" }}>
                {time.sec}
                <br />
                Sec
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  };
  const displayProductsInShop = () => {
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
              width: "100%",
              maxWidth: "90%",
              margin: "auto",
              justifyContent: "space-between",
            }}
          >
            {DisplayProducts.map((data) => {
              return (
                <Box
                  className={classes.productCard}
                  key={data._id}
                  onClick={() => {
                    //const link = `/ibid/products/${data._id}`;
                    //window.location.replace(link);
                  }}
                >
                  <Box
                    className={classes.badge}
                    // onClick={(e) => {
                    //   const info = {
                    //     pro_image: data.pro_image,
                    //     pro_name: data.pro_name,
                    //     pro_qty: data.pro_qty,
                    //     pro_sell_price: data.pro_sell_price,
                    //     pro_unit: data.pro_unit,
                    //     vendor_id: data.vendor_id,
                    //     vendor_name: data.vendor_name,
                    //     _id: data._id,
                    //   };
                    //   if (getCookie("account")) {
                    //     if (getCookie("city") === data.vendor_city) {
                    //       if (data.pro_stock === "Out of Stock") {
                    //         setState({
                    //           open1: true,
                    //           message: "Sorry Products is Out of Stock",
                    //         });
                    //       } else {
                    //         if (getCart().length <= 9) {
                    //           addInfoToCart(info);
                    //           setDeletecartproduct(Math.random());
                    //           setState({
                    //             isLogged: true,
                    //             open1: true,
                    //             message: "Successfully Product Add in Cart",
                    //           });
                    //         } else {
                    //           setState({
                    //             open1: true,
                    //             message:
                    //               "Sorry, you maximun 10 Products Add in Cart.",
                    //           });
                    //         }
                    //       }
                    //     } else {
                    //       setState({
                    //         open1: true,
                    //         message:
                    //           "Sorry, you must be products select in your city.",
                    //       });
                    //     }
                    //   } else {
                    //     setState({
                    //       open1: true,
                    //       message:
                    //         "Sorry, you must be logged in to place a Cart.",
                    //     });
                    //   }
                    //   e.stopPropagation();
                    // }}
                  >
                    <AiFillHeart size="25" />
                  </Box>

                  <Box className={classes.productTumb}>
                    <img
                      src={data.pro_image ? data.pro_image : profile}
                      alt="products_img"
                    />
                  </Box>
                  {auctionTimerBox(
                    data._id,
                    data.pro_start_time,
                    data.pro_end_time
                  )}
                  <Box className={classes.productDetails}>
                    <h2>{data.pro_name}</h2>

                    <h3>Bid : {data.pro_sell_price}₹</h3>
                  </Box>
                </Box>
                // </Link>
              );
            })}
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

  const cartText = `${countItem.item} items - ₹${countItem.subtotal.toFixed(
    2
  )}`;

  const DisplayCartPopover = () => {
    const cart_Data = getCart();
    console.log(cart_Data);
    if (!cart_Data.length) {
      return (
        <React.Fragment>
          <Box sx={{ padding: "20px" }}>
            <Typography
              var
              sx={{
                color: "#325240",
                textAlign: "center",
                fontSize: "24px",
                fontWeight: "bold",
                borderBottom: "2px solid #325240",
              }}
            >
              CART
            </Typography>
            <Box
              sx={{
                color: "#325240",
                padding: "8px",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "550",
                }}
              >
                No products in the cart.
              </Typography>
            </Box>
          </Box>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Box sx={{ padding: "20px" }}>
            <Typography
              var
              sx={{
                color: "#325240",
                textAlign: "center",
                fontSize: "24px",
                fontWeight: "bold",
                borderBottom: "2px solid #325240",
              }}
            >
              CART
            </Typography>
            <Box sx={{ borderBottom: "2px solid #325240" }}>
              <ScrollBox sx={{ overflow: "auto", maxHeight: "232px" }}>
                {cart_Data.map((data) => {
                  return (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          bgcolor: "#f9f9f9",
                          margin: "5px",
                          padding: "5px",
                          borderBottom: "1px solid #000",
                          "&:last-child": {
                            borderBottom: "0px",
                          },
                        }}
                      >
                        <img
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "10px",
                            border: "1px solid #325240",
                          }}
                          src={data.pro_image.replace(
                            "/products/",
                            "%2Fproducts%2F"
                          )}
                          alt="crat image"
                        />
                        <Box
                          sx={{ flex: "1 0 auto", pl: 3, alignSelf: "center" }}
                        >
                          <Typography
                            sx={{ fontSize: "18px", color: "#325240" }}
                          >
                            {data.pro_name}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "#325240",
                            }}
                          >
                            {data.pro_qty} x ₹ {data.pro_sell_price}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignSelf: "center",
                            color: "#B10000",
                          }}
                        >
                          <AiFillCloseCircle
                            size="20"
                            onClick={() => {
                              deleteCartProduct(data._id);
                              setDeletecartproduct(Math.random());
                            }}
                          />
                        </Box>
                      </Box>
                    </>
                  );
                })}
              </ScrollBox>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#325240",
                  padding: "8px",
                }}
              >
                <Typography sx={{ fontSize: "18px", fontWeight: "550" }}>
                  SUBTOTAL:
                </Typography>
                <Typography sx={{ fontSize: "18px", fontWeight: "550" }}>
                  ₹{countItem.subtotal.toFixed(2)} /-
                </Typography>
              </Box>
              <Link
                href="/ibid/cart"
                sx={{
                  textDecoration: "none",
                }}
              >
                <Button
                  fullWidth
                  sx={{
                    color: "#f9f9f9",
                    bgcolor: "#325240",
                    border: "2px solid transparent",

                    "&: hover": {
                      border: "2px solid #325240",
                      color: "#325240",
                    },
                  }}
                >
                  View Cart
                </Button>
              </Link>
              <Link
                href="/ibid/checkout"
                sx={{
                  textDecoration: "none",
                }}
              >
                <Button
                  fullWidth
                  sx={{
                    color: "#f9f9f9",
                    marginTop: "10px",
                    bgcolor: "#325240",
                    border: "2px solid transparent",

                    "&: hover": {
                      border: "2px solid #325240",
                      color: "#325240",
                    },
                  }}
                >
                  CheckOut
                </Button>
              </Link>
            </Box>
          </Box>
        </React.Fragment>
      );
    }
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
              alignSelf: "center",
              "& :hover": {
                color: "#fff",
              },
            }}
          >
            <div>
              <Box
                aria-describedby={popover_id}
                id="body-testing"
                onClick={handleCartClick}
                sx={{
                  marginRight: "30px",
                  float: "right",
                  padding: "5px",
                  color: "#ddf6e4",
                  bgcolor: "#325240",
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
                  WishList
                </Typography>
                <AiFillHeart size="25" />
              </Box>
              <Popover
                id={popover_id}
                open={cartFlag}
                anchorEl={anchorCartEl}
                onClose={handleCartClose}
                cartFlag={anchorCartEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Box
                  sx={{
                    height: "auto",
                    width: "60vh",
                    bgcolor: "#F9F9F9",
                    border: "2px solid #325240",
                  }}
                >
                  {DisplayCartPopover()}
                </Box>
              </Popover>
            </div>
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
              bgcolor: "#f0f0f0",
              borderBottom: "2px outset #f9f9f9",
            }}
          >
            <Breadcrumbs aria-label="breadcrumb" separator="›">
              <Typography sx={{ color: "#325240" }}>
                <h2>Auction</h2>
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
                          setPage(1);
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
                          //console.log(searchSorting);
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
            {messageFunction()}
          </Box>
        </div>
        <Footer />
      </Box>
    </>
  );
};

export default Shop;
