import React from "react";
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
  deleteCartProduct,
} from "../Validator/CookieFunction";
import { AiFillCloseCircle } from "react-icons/ai";
import profile from "../../assets/Images/apples.png";
import Footer from "../sub-component/Footer";
const Cart = () => {
  const [cartData, setCartData] = React.useState(getCart());
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
        <Box
          sx={{
            padding: "10px",
          }}
        >
          {["1", "2", "3", "4"].map((data) => {
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
                  src={profile}
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
                      Products name
                    </Typography>
                    <Typography
                      sx={{
                        color: "#325240",
                        fontSize: "14px",
                      }}
                    >
                      Vendor : panthil Malaviya
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
                    ₹ 100.00 /Kg
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
                          // border: "2px solid #325240",
                        },
                      }}
                    >
                      <AiFillCloseCircle size="25" />
                    </Button>
                    <Typography
                      sx={{
                        color: "#325240",
                        fontSize: "18px",
                        fontWeight: "bold",
                        alignSelf: "center",
                      }}
                    >
                      1
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
                        },
                      }}
                    >
                      <AiFillCloseCircle size="25" />
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
                    Total: ₹ 100.00 /Kg
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
                    >
                      <AiFillCloseCircle size="25" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Cart;
