import React from "react";
import { useParams } from "react-router-dom";
import {
  CircularProgress,
  Backdrop,
  Slide,
  Button,
  FormControl,
  Alert,
  Snackbar,
  styled,
  ThemeProvider,
  createTheme,
  Typography,
  Grid,
  Breadcrumbs,
  Box,
  Paper,
  Link,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  ToggleButtonGroup,
  ToggleButton,
  InputLabel,
  Select,
  Autocomplete,
  MenuItem,
  Avatar,
} from "@mui/material";
import Footer from "../sub-component/Footer";
const SuccessOrder = () => {
  const { id } = useParams();
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
            Checkout
          </Typography>
          <Typography
            sx={{ color: "#325240", fontSize: "24px", fontWeight: "bold" }}
          >
            Success
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box sx={{ bgcolor: "#f0f0f0", p: 3 }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: "90%",
            m: "auto",
            p: 5,

            border: "2px solid #000",
          }}
        >
          <Typography
            sx={{
              mt: 1,
              color: "#325240",
              fontSize: "36px",
              fontWeight: "bold",
            }}
          >
            Your order has been placed!
          </Typography>
          <Typography
            sx={{
              mt: 1,
              color: "#325240",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            Your order has been successfully processed!
          </Typography>
          <Typography
            sx={{
              mt: 1,
              color: "#325240",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            You can view your ordr history by going to the dashboard page and by
            clicking on order.
          </Typography>
          <Typography
            sx={{
              mt: 1,
              color: "#325240",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            Please direct any questions you have th the vendor page
          </Typography>
          <Typography
            sx={{
              mt: 1,
              color: "#325240",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            Thanks for shopping with us online!
          </Typography>
          <Typography
            sx={{
              mt: 1,
              color: "#325240",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            Your Order ID is : {id}
          </Typography>
          <Box sx={{ textAlign: "right" }}>
            <Button
              sx={{
                width: "300px",
                bgcolor: "#325240",
                color: "#f9f9f9",
                m: 3,
                border: "2px solid transparent",
                borderRadius: "20px",
                "&:hover": {
                  color: "#325240",
                  bgcolor: "#f9f9f9",
                  border: "2px solid #325240",
                },
              }}
              onClick={() => {
                window.location.replace("/");
              }}
            >
              Go to home
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};
export default SuccessOrder;
