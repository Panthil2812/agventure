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
import profile from "../../assets/Images/apples.png";
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
    return (
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
                    borderRadius: "10px",
                  }}
                >
                  <Button
                    sx={{
                      bgcolor: "#325240",
                      padding: "5px",
                      marginRight: "15px",
                      borderRadius: "0px",
                      borderTopLeftRadius: "6px",
                      borderBottomLeftRadius: "6px",
                      color: "#f0f0f0",
                      alignSelf: "center",
                      "&:hover": {
                        bgcolor: "#f0f0f0",
                        color: "#325240",
                        borderRight: "1px solid #325240",
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
                      bgcolor: "#325240",
                      padding: "5px",
                      marginLeft: "15px",
                      borderRadius: "0px",
                      borderTopRightRadius: "6px",
                      borderBottomRightRadius: "6px",
                      color: "#f0f0f0",
                      alignSelf: "center",
                      "&:hover": {
                        bgcolor: "#f0f0f0",
                        color: "#325240",
                        borderLeft: "1px solid #325240",
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
                  Total: ₹ {data.pro_sell_price * data.pro_qty}/{data.pro_unit}
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
    );
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
