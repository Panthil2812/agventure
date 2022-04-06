import React from "react";
import { useEffect } from "react";
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Grid,
  IconButton,
  Button,
} from "@mui/material";
import {
  getCart,
  addInfoToCart,
  editCartProducts,
  deleteCartProduct,
} from "../Validator/CookieFunction";
import { AiFillCloseCircle, AiOutlinePlus } from "react-icons/ai";
import { RiSubtractFill } from "react-icons/ri";
import { GrFormSubtract } from "react-icons/gr";
import nofound from "../../assets/Images/nofound.png";
import Footer from "../sub-component/Footer";
const Cart = () => {
  const [cartData, setCartData] = React.useState(getCart());
  const [deletecartproduct, setDeletecartproduct] = React.useState(0);
  const [countItem, setCountItem] = React.useState({
    item: 0,
    subtotal: 0.0,
  });
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
  const displayCartProducts = () => {
    if (cartData.length) {
      return (
        <div>
          <Typography
            sx={{
              color: "#325240",
              textAlign: "center",
              fontSize: "24px",
              marginTop: "15px",
              fontWeight: "bold",
            }}
          >
            MY CART
          </Typography>
          <Box
            sx={{
              padding: "10px",
            }}
          >
            {cartData.map((data) => {
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
                  }}
                >
                  <img
                    style={{
                      width: "75px",
                      height: "70px",
                      borderRadius: "10px",
                    }}
                    src={data.pro_image.replace("/products/", "%2Fproducts%2F")}
                    alt="crat products image"
                  />
                  <Box
                    sx={{
                      width: "100%",
                      // border: "2px solid #325240",
                      marginRight: "8px",
                      marginLeft: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
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
                        Vendor : {data.vendor_name}
                      </Typography>
                    </Box>

                    <Typography
                      sx={{
                        color: "#325240",
                        fontSize: "18px",
                        fontWeight: "bold",
                        alignSelf: "center",
                      }}
                    >
                      ₹ {data.pro_sell_price}/{data.pro_unit}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignSelf: "center",
                        border: "2px solid #325240",
                        borderRadius: "5px",
                      }}
                    >
                      <Button
                        sx={{
                          padding: "5px",
                          marginRight: "20px",
                          borderRadius: "0px",
                          borderTopLeftRadius: "2px",
                          borderBottomLeftRadius: "2px",
                          color: "#325240",
                          alignSelf: "center",
                          borderRight: "2px solid #325240",
                          "&:hover": {
                            bgcolor: "#325240",
                            color: "#f0f0f0",
                          },
                        }}
                        onClick={() => {
                          editCartProducts(data, 0);
                          setDeletecartproduct(Math.random());
                        }}
                      >
                        <RiSubtractFill size="20" />
                      </Button>
                      <Typography
                        sx={{
                          color: "#325240",
                          fontSize: "18px",
                          alignSelf: "center",
                        }}
                      >
                        {data.pro_qty}
                      </Typography>
                      <Button
                        sx={{
                          padding: "5px",
                          marginLeft: "20px",
                          borderRadius: "0px",
                          borderTopRightRadius: "2px",
                          borderBottomRightRadius: "2px",
                          color: "#325240",
                          alignSelf: "center",
                          borderLeft: "2px solid #325240",
                          "&:hover": {
                            color: "#f0f0f0",
                            bgcolor: "#325240",
                          },
                        }}
                        onClick={() => {
                          editCartProducts(data, 1);
                          setDeletecartproduct(Math.random());
                        }}
                      >
                        <AiOutlinePlus size="20" />
                      </Button>
                    </Box>
                    <Typography
                      sx={{
                        color: "#325240",
                        fontSize: "18px",
                        fontWeight: "bold",
                        alignSelf: "center",
                        // marginRight: 5,
                      }}
                    >
                      Total: ₹ {data.pro_sell_price * data.pro_qty}/
                      {data.pro_unit}
                    </Typography>
                    <Box sx={{ display: "flex", alignSelf: "center" }}>
                      <IconButton
                        sx={{
                          bgcolor: "#B10000",
                          padding: "5px",
                          borderRadius: "10px",
                          color: "#f0f0f0",
                          alignSelf: "center",
                          "&:hover": {
                            color: "#B10000",
                            border: "1px solid #B10000",
                          },
                        }}
                        onClick={() => {
                          deleteCartProduct(data._id);
                          setDeletecartproduct(Math.random());
                        }}
                      >
                        <AiFillCloseCircle size="25" />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
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
        </Box>
      );
    }
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
            Cart
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box
        sx={{
          height: "100vh",
        }}
      >
        {displayCartProducts()}
      </Box>
      <Footer />
    </>
  );
};

export default Cart;
