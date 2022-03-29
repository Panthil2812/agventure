import React from "react";
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
import img from "../../assets/Images/selectcity.png";
import { setCookie } from "../Validator/CookieFunction";
const CityName = [
  { label: "Mumbai" },
  { label: "Delhi" },
  { label: "Bangalore" },
  { label: "Hyderabad" },
  { label: "Ahmedabad" },
  { label: "Chennai" },
  { label: "Kolkata" },
  { label: "Surat" },
  { label: "Pune" },
  { label: "Jaipur" },
  { label: "Lucknow" },
  { label: "Kanpur" },
  { label: "Nagpur" },
  { label: "Indore" },
  { label: "Thane" },
  { label: "Bhopal" },
  { label: "Visakhapatnam" },
  { label: "Pimpri and Chinchwad" },
  { label: "Patna" },
  { label: "Vadodara" },
  { label: "Ghaziabad" },
  { label: "Ludhiana" },
  { label: "Agra" },
  { label: "Nashik" },
  { label: "Faridabad" },
  { label: "Meerut" },
  { label: "Rajkot" },
  { label: "Kalyan" },
  { label: "Vasai" },
  { label: "Varanasi" },
];
const theme = createTheme();
const CssFormControl = styled(FormControl)({
  "& .MuiTextField-root": { m: 1, width: "50ch" },
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
const Selectcity = () => {
  const [cityvalue, setCityValue] = React.useState("");
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          "&::after": {
            position: "fixed",
            content: '""',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url('${img}') `,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            zIndex: -1,
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            bgcolor: "#f9f9f9",
            height: "auto",
            padding: "30px",
            paddingBottom: "40px",
            alignItem: "center",
            textAlign: "center",
            margin: "10%",
            color: "#325240",
            borderRadius: "56px",
            boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 1)",
          }}
        >
          <h2>
            Online services in this portal are available only for the Citys
            listed below
          </h2>
          <h2>Please select the City from where the service is to be taken</h2>
          <CssFormControl
            required
            name="vcity"
            label="Select City Name"
            type="City"
            id="vcity"
          >
            <Autocomplete
              required
              id="combo-box-city"
              options={CityName}
              onChange={(event, value) => {
                setCityValue(value.label);
                setCookie("city", value.label, 24);
                window.location.replace("/");
              }}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label="Select City Name"
                  name="vcity"
                  id="vcity"
                />
              )}
            />
          </CssFormControl>
        </Box>
        {console.log(cityvalue)}
      </Box>
    </>
  );
};

export default Selectcity;
