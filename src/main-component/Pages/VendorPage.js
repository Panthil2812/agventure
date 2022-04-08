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
  Avatar,
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
const useStyles = makeStyles(() => ({
  menuPaper: {
    maxHeight: 300,
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
  productCard: {
    width: "252px",
    margin: "12px",
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
const VendorPage = () => {
  const { id } = useParams();
  const classes = useStyles();
  const token = getCookie("token");
  const [flag, setFlag] = React.useState(false);
  const [vendorData, setVendorData] = React.useState([]);
  const [vendorProductData, setVendorProductData] = React.useState([]);
  const handleClose = () => {
    setFlag(false);
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
  const callVendorData = () => {
    setFlag(true);
    axios({
      method: "get",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      url: `${process.env.REACT_APP_BASEURL}products/vendor_page/${id}`,
    })
      .then(function (response) {
        if (response.data.status === 504) {
          //console.log("error");
          setFlag(false);
        }
        if (response.data.status === 200) {
          setVendorData(response.data.vendor);
          setVendorProductData(response.data.data);
          setFlag(false);
          return 0;
        }
      })
      .catch(function (error) {
        setFlag(false);
      });
  };
  const displayProducts = () => {
    if (vendorProductData.length) {
      return (
        <Box sx={{ mt: 3, mb: 9 }}>
          <div
            style={{
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {vendorProductData.map((data) => (
              <Box
                className={classes.productCard}
                key={data._id}
                onClick={() => {
                  const link = `/ibid/products/${data._id}`;
                  window.location.replace(link);
                }}
              >
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
    } else {
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
    }
  };
  const vendorDetailsCard = () => {
    return (
      <div>
        <Box
          sx={{
            p: 6,
            width: "100%",
            maxWidth: "90%",
            margin: "auto",
            alignItems: "center",
            borderRadius: "20px",
            border: "4px solid #f9f9f9",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Avatar
              src={vendorData.profile_pic ? vendorData.profile_pic : profile}
              alt="products image"
              sx={{
                width: "300px",
                height: "350px",
                borderRadius: "5%",
                border: "4px solid #325240",
                boxShadow: "0px 16px 16px 5px rgba(0, 0, 0, 0.2)",
                // transform: "scale(1)",
                // transition: "all 0.3s ease-in-out",
                // "&:hover": {
                //   transform: "scale(1.1)",
                //   boxShadow: "0 20px 20px 0 rgba(0, 0, 0, 0.2)",
                // },
              }}
            />
            <Box sx={{ width: "65%" }}>
              <Box sx={{ display: "flex", width: "100%", marginBottom: 2 }}>
                <Box sx={{ flex: "0 1 25%", marginRight: 2 }}>
                  <Typography
                    sx={{
                      color: "#325240",
                      fontSize: "18px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Vendor Name :
                  </Typography>
                </Box>
                <Box sx={{ flex: "1 1 84%" }}>
                  <Typography
                    sx={{
                      color: "#325240",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {vendorData.full_name}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", width: "100%", marginBottom: 2 }}>
                <Box sx={{ flex: "0 1 25%", marginRight: 2 }}>
                  <Typography
                    sx={{
                      color: "#325240",
                      fontSize: "18px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Email Id :
                  </Typography>
                </Box>
                <Box sx={{ flex: "1 1 84%" }}>
                  <Typography
                    sx={{
                      color: "#325240",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {vendorData.email_id}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", width: "100%", marginBottom: 2 }}>
                <Box sx={{ flex: "0 1 25%", marginRight: 2 }}>
                  <Typography
                    sx={{
                      color: "#325240",
                      fontSize: "18px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Address :
                  </Typography>
                </Box>
                <Box sx={{ flex: "0 1 85%" }}>
                  <Typography
                    sx={{
                      color: "#325240",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {vendorData.address}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", width: "100%", marginBottom: 2 }}>
                <Box sx={{ flex: "0 1 25%", marginRight: 2 }}>
                  <Typography
                    sx={{
                      color: "#325240",
                      fontSize: "18px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Contact No :
                  </Typography>
                </Box>
                <Box sx={{ flex: "0 1 85%" }}>
                  <Typography
                    sx={{
                      color: "#325240",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {vendorData.phone}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", width: "100%", marginBottom: 2 }}>
                <Box sx={{ flex: "0 1 25%", marginRight: 2 }}>
                  <Typography
                    sx={{
                      color: "#325240",
                      fontSize: "18px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Total Products :
                  </Typography>
                </Box>
                <Box sx={{ flex: "0 1 85%" }}>
                  <Typography
                    sx={{
                      color: "#325240",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {vendorProductData.length}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Typography
          sx={{
            m: 5,
            color: "#325240",
            fontSize: "36px",
            fontWeight: "600",
            textAlign: "center",
            textDecoration: "underline ",
          }}
        >
          Vendor Products
        </Typography>
        <Box sx={{ mt: 7, width: "100%", maxWidth: "95%", margin: "auto" }}>
          {displayProducts()}
        </Box>
      </div>
    );
  };
  React.useEffect(() => {
    callVendorData();
  }, []);
  return (
    <div>
      <Box
        sx={{
          paddingLeft: "20px",
          bgcolor: "#f0f0f0",
          borderBottom: "2px outset #325240",
        }}
      >
        <Breadcrumbs aria-label="breadcrumb" separator="›">
          <Link underline="hover" sx={{ color: "#325240" }} href="/vendor">
            <h2>Vendor</h2>
          </Link>
          <Typography
            sx={{ color: "#325240", fontSize: "24px", fontWeight: "bold" }}
          >
            {vendorData.full_name}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box
        sx={{
          // height: "50%",
          bgcolor: "#f0f0f0",
          pt: 4,

          position: "relative",
        }}
      >
        {vendorDetailsCard()}
        <Box>{backDrop()}</Box>
        <Footer />
      </Box>
    </div>
  );
};

export default VendorPage;
