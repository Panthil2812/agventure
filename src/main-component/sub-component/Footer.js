import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import UnstyledInput from "./UnstyledInput";
import { styled } from "@mui/system";
import { makeStyles } from "@mui/styles";
import logo from "../../assets/logo2.png";
import EmailIcon from "@mui/icons-material/Email";
import Avatar from "@mui/material/Avatar";

import { FaFacebookF, FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import { RiGithubFill } from "react-icons/ri";
import { ImLocation2 } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { BsTwitter, BsGoogle, BsInstagram } from "react-icons/bs";

const ColorButton = styled(Button)(({ theme }) => ({
  color: "#0d4d29",
  backgroundColor: "#ddf6e4",
  marginTop: "6px",
  borderRadius: "25px",
  "&:hover": {
    backgroundColor: "#ddf6e4",
  },
}));
const useStyles = makeStyles(() => ({
  leftSide: {
    width: "30%",
    height: "40px",
    color: "#fff",
    float: "left",
    textAlign: "center",
    display: "inline-block",
  },
  rightSide: {
    width: "70%",
    height: "40px",
    float: "left",
    textAlign: "center",
    display: "inline-block",
  },
  link: {
    color: "#0d4d29",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  slink: {
    color: "#fff",
  },
}));
const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  600: "#0072E5",
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const StyledInputElement = styled("input")(
  ({ theme }) => `
  width: 300px;
  height: 50px
  font-size:20px;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 100;
  line-height: 1.5;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};

  border-radius: 25px ;
  padding: 12px 18px;

  &:hover {
    background:${grey[50]} ;
    border-color: ${grey[50]} ;
  }

  &:focus {
    outline:  solid ${grey[800]} ;
  }
`
);
const Footer = () => {
  const [email, setEmail] = React.useState("");
  const classes = useStyles();
  return (
    <>
      <Box
        sx={{
          p: 2,
          bgcolor: "#0d4d29",
          height: "50px",
          boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        <Grid container justifyContent="center" spacing={2}>
          <Grid container spacing={0}>
            <Grid item xs={5} sx={{ textAlign: "center", color: "#fff" }}>
              <h2>Subscribe to our Newsletter</h2>
            </Grid>
            <Grid item xs={7} sx={{ textAlign: "center", padding: "15px" }}>
              <div className={classes.leftSide}>
                <StyledInputElement
                  name="email"
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Your Email Address"
                />
              </div>

              <div
                className={classes.rightSide}
                sx={{
                  textAlign: "center",
                  marginTop: "10px",
                  marginTop: "19px",
                }}
              >
                <ColorButton
                  variant="contained"
                  onClick={() => {
                    console.log(email);
                  }}
                >
                  Subscribe
                </ColorButton>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          p: 2,
          height: "200px",
          boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        <Grid sx={{ flexGrow: 1, padding: "10px" }} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={3}>
              <Grid
                item
                sx={{
                  height: 200,
                  width: 250,
                  color: "#0d4d29",
                }}
              >
                <div align="left">
                  <img src={logo} alt="organic1" />
                  <hr
                    style={{
                      height: "2px",
                      borderWidth: "0",
                      color: "#0d4d29",
                      margin: "5px",
                      backgroundColor: "#0d4d29",
                    }}
                  />
                  <p>
                    Here you can use rows and columns to organize your footer
                    content. Lorem ipsum dolor sit amet.
                  </p>
                </div>
              </Grid>
              <Grid
                item
                sx={{
                  height: 200,
                  width: 250,
                  color: "#0d4d29",
                }}
              >
                <div align="center">
                  <h3>USEFULL LINKS</h3>
                  <hr
                    style={{
                      height: "2px",
                      borderWidth: "0",
                      color: "#0d4d29",
                      backgroundColor: "#0d4d29",
                    }}
                  />
                  <div style={{ margin: "5px" }}>
                    {" "}
                    <Link className={classes.link} to="/">
                      Home
                    </Link>
                  </div>
                  <div style={{ margin: "5px" }}>
                    {" "}
                    <Link className={classes.link} to="/auction">
                      Auction
                    </Link>
                  </div>
                  <div style={{ margin: "5px" }}>
                    {" "}
                    <Link className={classes.link} to="/shop">
                      Shop
                    </Link>
                  </div>
                  <div style={{ margin: "5px" }}>
                    {" "}
                    <Link className={classes.link} to="/vendor">
                      Vendor
                    </Link>
                  </div>
                </div>
              </Grid>
              <Grid
                item
                sx={{
                  height: 200,
                  width: 250,
                  color: "#0d4d29",
                }}
              >
                <div align="center">
                  <h3>OUR COMPANY</h3>
                  <hr
                    style={{
                      height: "2px",
                      borderWidth: "0",
                      color: "#0d4d29",
                      backgroundColor: "#0d4d29",
                    }}
                  />
                  <div style={{ margin: "5px" }}>
                    {" "}
                    <Link className={classes.link} to="/about">
                      About Us
                    </Link>
                  </div>
                  <div style={{ margin: "5px" }}>
                    {" "}
                    <Link className={classes.link} to="/">
                      How It Works
                    </Link>
                  </div>
                  <div style={{ margin: "5px" }}>
                    {" "}
                    <Link className={classes.link} to="/contact">
                      Contact Us
                    </Link>
                  </div>
                  <div style={{ margin: "5px" }}>
                    {" "}
                    <Link className={classes.link} to="/blog">
                      Blog
                    </Link>
                  </div>
                </div>
              </Grid>
              <Grid
                item
                sx={{
                  height: 200,
                  width: 250,
                  color: "#0d4d29",
                }}
              >
                <div align="left">
                  <h3>CONTACT</h3>
                  <hr
                    style={{
                      height: "2px",
                      borderWidth: "0",
                      color: "#0d4d29",
                      backgroundColor: "#0d4d29",
                    }}
                  />
                  <div style={{ margin: "10px" }}>
                    <ImLocation2 /> Rk University,Rajkot
                  </div>
                  <div style={{ margin: "10px" }}>
                    <FaPhoneAlt /> Phone: (0039)333 12 347
                  </div>
                  <div style={{ margin: "10px" }}>
                    <MdEmail /> Email: admin@ibid.com
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          bgcolor: "#0d4d29",
          textAlign: "center",
          padding: "10px 70px 10px 70px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          borderBottom: "3px solid #fff",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#3b5998" }}>
          <a className={classes.slink} href="https://www.facebook.com/">
            <FaFacebookF />
          </a>
        </Avatar>
        <Avatar sx={{ m: 1, bgcolor: "#55acee" }}>
          <a className={classes.slink} href="https://www.twitter.com/">
            <BsTwitter />
          </a>
        </Avatar>
        <Avatar sx={{ m: 1, bgcolor: "#dd4b39" }}>
          <a className={classes.slink} href="https://www.google.com/">
            <BsGoogle />
          </a>
        </Avatar>
        <Avatar sx={{ m: 1, bgcolor: "#3b5998" }}>
          <a className={classes.slink} href="https://www.instagram.com/">
            <BsInstagram />{" "}
          </a>
        </Avatar>
        <Avatar sx={{ m: 1, bgcolor: "#0082ca" }}>
          <a className={classes.slink} href="https://www.linkedin.com/">
            <FaLinkedinIn />{" "}
          </a>
        </Avatar>
        <Avatar sx={{ m: 1, bgcolor: "#333333" }}>
          <a className={classes.slink} href="https://www.gihub.com/">
            <RiGithubFill />{" "}
          </a>
        </Avatar>
      </Box>
      <Box sx={{ p: 2, bgcolor: "#0d4d29" }}>
        <Typography
          variant="body2"
          color="#ffffff"
          sx={{ fontWeight: "bold", fontSize: "15px" }}
          align="center"
        >
          {"Copyright © "}
          {"  "}
          <Link style={{ color: "#fff" }} to="/">
            Agventure
          </Link>
          {"  "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </>
  );
};
export default Footer;
