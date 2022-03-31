import React from "react";
import {
  Popover,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  IconButton,
  Dialog,
  styled,
  Button,
  Autocomplete,
  FormControl,
  MenuItem,
  Menu,
  createTheme,
  TextField,
  Select,
  Grid,
  Chip,
  Snackbar,
  Divider,
  Pagination,
  ThemeProvider,
  Breadcrumbs,
  Container,
  Link,
  Alert,
  Card,
  CardMedia,
  Avatar,
  Box,
  Typography,
  Backdrop,
  CircularProgress,
  useTheme,
} from "@mui/material";
const SortName = [
  { label: "Default Sorting" },
  { label: "Sort by Popularity" },
  { label: "Sort by Latest" },
  { label: "Sort by Price: Low to High" },
  { label: "Sort by Price: High to Low" },
];
const categoryName = [
  { label: "All Products" },
  { label: "Dairy Products" },
  { label: "Fruits" },
  { label: "Grocery" },
  { label: "Vegetables" },
];
const CssTextField = styled(TextField)({
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
const CssFormControl = styled(FormControl)({
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
const ShopProducts = (props) => {
  const [searchCategory, setSearchCategory] = React.useState("All Products");
  const [searchSorting, setSearchSorting] = React.useState("Default Sorting");
  console.log(props.cityname);
  return (
    <div>
      <Box
        sx={{
          paddingLeft: "20px",
          borderBottom: "2px outset #f9f9f9",
        }}
      >
        <Breadcrumbs aria-label="breadcrumb" separator="›">
          <Link underline="hover" sx={{ color: "#325240" }} href="/">
            <h2>Home</h2>
          </Link>
          <Typography
            sx={{ color: "#325240", fontSize: "24px", fontWeight: "bold" }}
          >
            Shop
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box sx={{ height: "200vh", bgcolor: "#fff", padding: 3 }}>
        <Box
          sx={{
            bgcolor: "#f0f0f0",
            boxShadow: "0px 16px 16px 0px rgba(0, 0, 0, 0.2)",
            border: "1px solid #325240",
            borderRadius: "8px",
          }}
        >
          <Box
            spacing={3}
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-evenly",
              padding: "10px",
            }}
          >
            <a>Showing 1–9 of 15 results</a>
            <Box sx={{ minWidth: 220 }}>
              <CssFormControl
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
                  onChange={(event, value) => {
                    setSearchCategory(value.label);
                    console.log("value:", value);
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
              </CssFormControl>
            </Box>
            <Box sx={{ minWidth: 320 }}>
              <CssFormControl
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
                  onChange={(event, value) => {
                    setSearchSorting(value.label);
                    console.log(searchSorting);
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
              </CssFormControl>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 4, height: "100vh" }}>
          <a>panthil</a>
          <a>panthil</a>
          <a>panthil</a>
          <a>panthil</a>
        </Box>
      </Box>
    </div>
  );
};

export default ShopProducts;
