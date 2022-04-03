import React from "react";
import Popover from "@mui/material/Popover";
import apples from "../../assets/Images/apples.png";
import {
  Typography,
  Box,
  Button,
  styled,
  IconButton,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { BsBasketFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsCurrencyPound } from "react-icons/bs";
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

export default function MouseOverPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const cratFlag = Boolean(anchorEl);
  const popover_id = cratFlag ? "simple-popover" : undefined;
  const DisplayCartPopover = () => {
    const paa = false;
    if (paa) {
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
                {["1", "2", "3", "4", "5", "6", "7"].map((data) => {
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
                          }}
                          src={apples}
                          alt="crat image"
                        />
                        <Box sx={{ flex: "1 0 auto", pl: 3 }}>
                          <Typography
                            sx={{ fontSize: "18px", color: "#325240" }}
                          >
                            Cabbage
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "#325240",
                            }}
                          >
                            {data} x 45.00
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "#B10000",
                          }}
                        >
                          <AiFillCloseCircle
                            size="20"
                            onClick={() => {
                              alert("delete product");
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
                  TOTAL:
                </Typography>
                <Typography sx={{ fontSize: "18px", fontWeight: "550" }}>
                  ₹1011.00 /-
                </Typography>
              </Box>
              <Button
                fullWidth
                sx={{
                  color: "#f9f9f9",
                  bgcolor: "#325240",
                  "&: hover": {
                    border: "2px solid #325240",
                    color: "#325240",
                  },
                }}
                onClick={() => {
                  alert("view cart");
                }}
              >
                View Cart
              </Button>
              <Button
                fullWidth
                sx={{
                  color: "#f9f9f9",
                  bgcolor: "#325240",
                  marginTop: "10px",
                  "&: hover": {
                    border: "2px solid #325240",
                    color: "#325240",
                  },
                }}
                onClick={() => {
                  alert("CheckOut ");
                }}
              >
                CheckOut
              </Button>
            </Box>
          </Box>
        </React.Fragment>
      );
    }
  };
  return (
    <div>
      <Box
        aria-describedby={popover_id}
        // onClick={handleClick}
        onMouseEnter={handleClick}
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
          My Cart
          <br />0 items - ₹0.00
        </Typography>
        <BsBasketFill size="25" />
      </Box>
      <Popover
        id={popover_id}
        open={cratFlag}
        anchorEl={anchorEl}
        onClose={handleClose}
        cratFlag={anchorEl}
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
  );
}
