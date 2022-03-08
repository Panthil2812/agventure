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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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

export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.FormData);
    data.set("First Name", data.get("First Name") + "panthil");
    // eslint-disable-next-line no-console
    console.log(data.target.value);
  };
  const [Gender, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container columns={12} sx={{ height: "100vh" }}>
        <ScrollDiv
          item
          xs={6}
          sx={{
            height: "100vh",
            overflow: "auto",
          }}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              marginTop: 8,
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
                my: 8,
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
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CssTextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CssTextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
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
                    name="re-password"
                    label="
                    Re-Password"
                    type="re-password"
                    id="re-password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box CssTextField sx={{ minWidth: 120 }}>
                    <CssFormControl
                      fullWidth
                      required
                      name="Gender"
                      label="Gender"
                      type="Gender"
                      id="Gender"
                      autoComplete="Gender"
                    >
                      <InputLabel id="demo-simple-select-label">
                        Gender
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={Gender}
                        label="Gender"
                        onChange={handleChange}
                        className={theme.select}
                      >
                        <MenuItem value={10}>Male</MenuItem>
                        <MenuItem value={20}>Female</MenuItem>
                        <MenuItem value={30}>Other</MenuItem>
                      </Select>
                    </CssFormControl>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="success" />
                    }
                    sx={{ color: "#33691e" }}
                    label="I want to receive inspiration, marketing promotions and updates via email."
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
          xs={6}
          sx={{
            height: "100vh",
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Grid>
      </Grid>
    </ThemeProvider>
  );
}
