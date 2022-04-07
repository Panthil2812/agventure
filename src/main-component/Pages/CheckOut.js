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
const CheckOut = () => {
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
          <table
            style={{
              margin: " 0 -1px 24px 0",
              textAlign: "left",
              width: "100%",
              maxWidth: "80%",
              margin: "auto",
              borderCollapse: "separate",
              border: "none",
              borderSpacing: "0px",
            }}
            class="table-checkout"
          >
            <tbody>
              {cartData.map((data) => {
                return (
                  <tr class="cart_item">
                    <td
                      style={{
                        padding: "12px 20px",
                        border: "1px solid #e6e6e6",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#325240",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        {data.pro_name} x {data.pro_qty}
                        <br />
                        <Typography>Vendor: {data.vendor_name}</Typography>
                      </Typography>
                    </td>
                    <td
                      style={{
                        padding: "12px 20px",
                        border: "1px solid #e6e6e6",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#325240",
                          fontSize: "18px",
                          fontWeight: "bold",
                          marginLeft: "auto",
                          float: "right",
                        }}
                      >
                        {data.pro_qty * data.pro_sell_price} ₹
                      </Typography>
                    </td>
                  </tr>
                );
              })}
              <tr class="cart_item">
                <td
                  style={{
                    padding: "12px 20px",
                    border: "1px solid #e6e6e6",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#325240",
                      fontSize: "18px",
                      fontWeight: "bold",
                      float: "right",
                    }}
                  >
                    Subtotal
                  </Typography>
                </td>
                <td
                  style={{
                    padding: "12px 20px",
                    border: "1px solid #e6e6e6",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#325240",
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginLeft: "auto",
                      float: "right",
                    }}
                  >
                    {countItem.subtotal} ₹
                  </Typography>
                </td>
              </tr>{" "}
              <tr class="cart_item">
                <td
                  style={{
                    padding: "12px 20px",
                    border: "1px solid #e6e6e6",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#325240",
                      fontSize: "18px",
                      fontWeight: "bold",
                      float: "right",
                    }}
                  >
                    Discount
                  </Typography>
                </td>
                <td
                  style={{
                    padding: "12px 20px",
                    border: "1px solid #e6e6e6",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#325240",
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginLeft: "auto",
                      float: "right",
                    }}
                  >
                    {(countItem.subtotal * 3) / 100} ₹
                  </Typography>
                </td>
              </tr>
              <tr class="cart_item">
                <td
                  style={{
                    padding: "12px 20px",
                    border: "1px solid #e6e6e6",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#325240",
                      fontSize: "18px",
                      fontWeight: "bold",
                      float: "right",
                    }}
                  >
                    Total Amount
                  </Typography>
                </td>
                <td
                  style={{
                    padding: "12px 20px",
                    border: "1px solid #e6e6e6",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#325240",
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginLeft: "auto",
                      float: "right",
                    }}
                  >
                    {parseInt(
                      countItem.subtotal - (countItem.subtotal * 3) / 100
                    )}{" "}
                    ₹
                  </Typography>
                </td>
              </tr>
              <tr class="cart_item">
                <td
                  style={{
                    padding: "12px 20px",
                    border: "1px solid #e6e6e6",
                  }}
                ></td>
                <td
                  style={{
                    padding: "12px 20px",
                    border: "1px solid #e6e6e6",
                  }}
                >
                  <Button
                    sx={{
                      bgcolor: "#325240",
                      color: "#f9f9f9",
                      marginLeft: "auto",
                      float: "right",
                      pr: 3,
                      pl: 3,
                      border: "2px solid transparent",
                      "&:hover": {
                        color: "#325240",
                        bgcolor: "#f9f9f9",
                        border: "2px solid #325240",
                      },
                    }}
                    onClick={() => {
                      window.location.replace("/ibid/checkout");
                    }}
                  >
                    place order
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
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
          <Link
            href="/shop"
            sx={{
              textDecoration: "none",
            }}
          >
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
          </Link>
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
            CheckOut
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
        MY ORDER
      </Typography>
      <Box>{displayCartProducts()}</Box>
      <Footer />
    </>
  );
};

export default CheckOut;
