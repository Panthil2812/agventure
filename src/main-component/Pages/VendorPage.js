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
const VendorPage = () => {
  const { id } = useParams();
  return (
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
          Panthil Malaviya
        </Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default VendorPage;
