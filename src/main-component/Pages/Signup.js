import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
function Copyright(props) {
  return (
    <Typography variant="body2" color="#33691e" align="center" {...props}>
      {"Copyright © "}
      <Link color="#33691e" href="https://google.com/">
        Agventure
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderWidth: "2px",
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderWidth: "2px",
      borderColor: "green",
    },
    "&:hover fieldset": {
      borderWidth: "2px",
      borderColor: "green",
    },
    "&.Mui-focused fieldset": {
      borderWidth: "2px",
      borderColor: "green",
    },
  },
});
const CssFormControl = styled(FormControl)({
  "& .MuiFormControlLabel-label": {
    color: "green",
  },
  "::-webkit-scrollbar": {
    display: "none",
  },
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderWidth: "2px",
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderWidth: "2px",
      borderColor: "green",
    },
    "&:hover fieldset": {
      borderWidth: "2px",
      borderColor: "green",
    },
    "&.Mui-focused fieldset": {
      borderWidth: "2px",
      borderColor: "green",
    },
  },
});
const ScrollDiv = styled(Grid)({
  "::-webkit-scrollbar": {
    display: "none",
  },
});
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
const StateName = [
  { label: "Daman" },
  { label: "Diu" },
  { label: "Silvassa" },
  { label: "Mumbai" },
  { label: "Delhi" },
  { label: "Karnataka" },
  { label: "Andhra Pradesh" },
  { label: "Gujarat" },
  { label: "Tamil Nadu" },
  { label: "Rajasthan" },
  { label: "Uttar Pradesh" },
  { label: "Madhya Pradesh" },
  { label: "Bihar" },
  { label: "Punjab" },
  { label: "Arunachal Pradesh" },
  { label: "Assam" },
  { label: "Chhattisgarh" },
  { label: "Goa" },
  { label: "Haryana" },
  { label: "Himachal Pradesh" },
  { label: "Jharkhand" },
  { label: "Kerala" },
  { label: "Manipur" },
  { label: "Meghalaya" },
  { label: "Mizoram" },
  { label: "Nagaland" },
  { label: "Odisha" },
  { label: "Sikkim" },
  { label: "Tripura" },
  { label: "Uttarakhand" },
  { label: "West Bengal" },
];
export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const info = {
      firstname: data.get("firstname"),
      lastname: data.get("lastname"),
      emailid: data.get("emailid"),
      password: data.get("password"),
      repassword: data.get("repassword"),
      gender: Gender,
      ctype: Type,
      address: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      phone: data.get("phone"),
      checkbox: data.get("checkbox"),
    };
    console.log(info);
  };
  const [Gender, setGender] = React.useState("");
  const [Type, setType] = React.useState("");
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh", color: "green" }}>
        <ScrollDiv
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{ height: "100vh", overflow: "auto" }}
        >
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#33691e" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{ color: "#33691e", fontWeight: "bold" }}
            >
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                my: 4,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CssTextField
                    autoComplete="given-name"
                    name="firstname"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CssTextField
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CssTextField
                    required
                    fullWidth
                    id="emailid"
                    label="Email Address"
                    name="emailid"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CssTextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CssTextField
                    required
                    fullWidth
                    name="repassword"
                    label="
                    Re-Password"
                    type="password"
                    id="repassword"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box CssTextField sx={{ minWidth: 120 }}>
                    <CssFormControl
                      fullWidth
                      required
                      name="gender"
                      label="Gender"
                      type="Gender"
                      id="gender"
                      autoComplete="Gender"
                    >
                      <InputLabel id="demo-simple-select-label">
                        Gender
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={Gender}
                        name="gender"
                        label="gender"
                        onChange={handleGenderChange}
                      >
                        <MenuItem value={0}>Male</MenuItem>
                        <MenuItem value={1}>Female</MenuItem>
                      </Select>
                    </CssFormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box CssTextField sx={{ minWidth: 120 }}>
                    <CssFormControl
                      fullWidth
                      required
                      name="ctype"
                      label="Type"
                      type="select"
                      id="ctype"
                      autoComplete="Type"
                    >
                      <InputLabel id="demo-simple-select-label">
                        Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={Type}
                        label="Type"
                        name="ctype"
                        onChange={handleTypeChange}
                        className={theme.select}
                      >
                        <MenuItem value={0}>Vendor</MenuItem>
                        <MenuItem value={1}>Customers</MenuItem>
                      </Select>
                    </CssFormControl>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <CssTextField
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="address"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box CssTextField sx={{ minWidth: 120 }}>
                    <CssFormControl
                      fullWidth
                      required
                      name="city"
                      label="City"
                      type="City"
                      id="city"
                      autoComplete="City"
                    >
                      <Autocomplete
                        required
                        id="combo-box-city"
                        options={CityName}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="City"
                            name="city"
                            id="city"
                            autoComplete="City"
                          />
                        )}
                      />
                    </CssFormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box CssTextField sx={{ minWidth: 120 }}>
                    <CssFormControl
                      fullWidth
                      required
                      name="state"
                      label="State"
                      type="State"
                      id="state"
                      autoComplete="State"
                    >
                      <Autocomplete
                        required
                        id="combo-box-state"
                        options={StateName}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="State"
                            id="state"
                            name="state"
                            autoComplete="State"
                          />
                        )}
                      />
                    </CssFormControl>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <CssTextField
                    required
                    fullWidth
                    name="phone"
                    label="Phone"
                    type="Phone"
                    id="phone"
                    autoComplete="new-Phone"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="allowExtraEmails"
                        name="checkbox"
                        id="checkbox"
                        color="success"
                      />
                    }
                    sx={{ color: "#33691e" }}
                    label="I've read and accept the terms and conditions *"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    href="/signin"
                    variant="body2"
                    sx={{ color: "green", fontWeight: "bold" }}
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5, fontWeight: "bold" }} />
            </Box>
          </Box>
        </ScrollDiv>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}
