import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { BsBasketFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoMdArrowDropup } from "react-icons/io";
import profile from "../../assets/Images/profile.png";
import { styled } from "@mui/material/styles";
import {
  Popover,
  Link,
  Button,
  Chip,
  Autocomplete,
  FormControl,
  TextField,
  Grid,
  Avatar,
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
import apples from "../../assets/Images/apples.png";
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
const ProductPage = () => {
  const { id } = useParams();
  const classes = useStyles();
  const token = getCookie("token");
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
  const [VendorData, setVendorData] = React.useState([]);
  const [flag, setFlag] = React.useState(false);
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
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      url: `${process.env.REACT_APP_BASEURL}products/products_page/${id}`,
    })
      .then(function (response) {
        if (response.data.status === 504) {
          //console.log("error");
          setFlag(false);
        }
        if (response.data.status === 200) {
          setProductData(response.data.product);
          setVendorData(response.data.data);
          setFlag(false);
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
    let sum = 0;
    let total = 0;
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
  React.useEffect(() => {
    allProducts();
  }, []);
  const displayVendorProduct = () => {
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
          {VendorData.map((data) => (
            <Box
              className={classes.productCard}
              key={data._id}
              onClick={() => {
                const link = `/ibid/products/${data._id}`;
                window.location.replace(link);
              }}
            >
              <Box
                className={classes.badge}
                onClick={(e) => {
                  // console.log("KKK", data);

                  // setFlag(true);
                  if (getCookie("account")) {
                    if (getCookie("city") === data.vendor_city) {
                      if (data.pro_stock === "Out of Stock") {
                        setState({
                          open1: true,
                          message: "Sorry Products is Out of Stock",
                        });
                      } else {
                        addInfoToCart(data);
                        setDeletecartproduct(Math.random());
                        setState({
                          isLogged: true,
                          open1: true,
                          message: "Successfully Product Add in Cart",
                        });
                      }
                    } else {
                      setState({
                        open1: true,
                        message:
                          "Sorry, you must be products select in your city.",
                      });
                    }
                  } else {
                    setState({
                      open1: true,
                      message: "Sorry, you must be logged in to place a Cart.",
                    });
                  }
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
                <h3>{data.pro_name}</h3>

                <Box className={classes.productBottomDetails}>
                  <Box className={classes.productPrice}>
                    PRICE :-₹{data.pro_sell_price.toFixed(2)}
                    <br />
                    <small>₹{data.pro_mrp.toFixed(2)}</small>
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
                  </Box>
                </Box>
              </Box>
            </Box>
            // </Link>
          ))}
        </div>
      </Box>
    );
  };

  const cartText = `${countItem.item} items - ₹${countItem.subtotal.toFixed(
    2
  )}`;

  const DisplayCartPopover = () => {
    const cart_Data = getCart();
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
  const productDetailsCard = () => {
    return (
      <Box
        sx={{
          display: "flex",
          p: 4,
          width: "100%",
          maxWidth: "90%",
          margin: "auto",
          alignItems: "center",
          justifyContent: "space-around",
          // border: "2px solid #fff",
          borderRadius: "20px",
        }}
      >
        <Avatar
          src={ProductData.pro_image}
          alt="products image"
          sx={{
            width: "400px",
            height: "450px",
            borderRadius: "5%",
            border: "4px solid #f9f9f9",
            boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.2)",
            // overflow: "hidden",
            transform: "scale(1)",
            transition: "all 0.5s ease-in-out",
            "& :hover": {
              transform: "scale(1.07)",
            },
          }}
        />
        <Box
          sx={{
            width: "600px",
          }}
        >
          <Typography
            sx={{ fontSize: "32px", fontWeight: "600", color: "#325240" }}
          >
            {ProductData.pro_name}
          </Typography>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "300",
              color: "#325240",
              mt: 2,
            }}
          >
            The Ragdoll is a cat breed with blue eyes and a distinct colorpoint
            coat. It is a large and muscular semi-longhair cat with a soft and
            silky coat.
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#325240",
              mt: 2,
            }}
          >
            Category : {ProductData.pro_category}
          </Typography>
          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: "600",
              color: "#325240",
              mt: 1,
            }}
          >
            Price : ₹ {ProductData.pro_sell_price} /-
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "200",
              color: "#325240",
              mt: 0,
            }}
          >
            Unit : {ProductData.pro_unit}
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "200",
              color: "#325240",
              mt: 1,
            }}
          >
            HSN : 12345678
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "300",
              color: "#325240",
              mt: 1,
              pb: 1,
              borderBottom: "2px solid #fff",
            }}
          >
            {ProductData.pro_stock === "In Stock" ? (
              <Chip
                label="In Stock"
                sx={{ color: "#f9f9f9", bgcolor: "#325240" }}
              />
            ) : (
              <Chip
                label="Out Of Stock"
                sx={{ color: "#f9f9f9", bgcolor: "#B10000" }}
              />
            )}
          </Typography>

          <Button
            sx={{
              color: "#f9f9f9",
              bgcolor: "#325240",
              border: "2px solid transparent",
              mt: 2,
              p: 1,
              "&: hover": {
                border: "2px solid #325240",
                color: "#325240",
              },
            }}
          >
            <BsBasketFill size="25" />
            <Typography sx={{ ml: 2, mr: 2 }}>add to cart</Typography>
          </Button>
        </Box>
      </Box>
    );
  };
  return (
    <>
      <Box
        sx={{
          bgcolor: "#325240",
          width: "100%",
          borderBottom: "2px outset #f9f9f9",
          display: "flex",
          justifyContent: "space-between",
          position: "fixed",
          zIndex: "99999",
        }}
      >
        <Box
          sx={{
            paddingLeft: "20px",
            // bgcolor: "#f0f0f0",
            // borderBottom: "2px outset #325240",
            // top: "71px",
          }}
        >
          <Breadcrumbs
            aria-label="breadcrumb"
            separator="›"
            sx={{ color: "#fff" }}
          >
            <Link underline="hover" sx={{ color: "#f9f9f9" }} href="/shop">
              <h2>Shop</h2>
            </Link>
            <Typography
              sx={{ color: "#f9f9f9", fontSize: "24px", fontWeight: "bold" }}
            >
              {ProductData.pro_name}
            </Typography>
          </Breadcrumbs>
        </Box>

        <Box
          aria-describedby={popover_id}
          id="body-testing"
          onClick={handleCartClick}
          sx={{
            marginRight: "30px",

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
            My Cart
            <br />
            {cartText}
          </Typography>
          <BsBasketFill size="25" />
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
      </Box>
      <Box
        sx={{
          // height: "50%",
          bgcolor: "#f0f0f0",
          pt: 4,
          position: "relative",
          top: "71px",
        }}
      >
        {productDetailsCard()}
        <Footer />
      </Box>
    </>
  );
};

export default ProductPage;
