import React from "react";
import { BsBasketFill } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdArrowDropup, IoIosArrowDroprightCircle } from "react-icons/io";

import banner from "../../assets/Images/banner.png";
import profile from "../../assets/Images/profile.png";
import { styled } from "@mui/material/styles";
import {
  Popover,
  Link,
  Avatar,
  Button,
  IconButton,
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
import { getCookie } from "../Validator/CookieFunction";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
// import ShopProducts from "../sub-component/ShopProducts";
import Footer from "../sub-component/Footer";
import axios from "axios";
import nofound from "../../assets/Images/nofound.png";
const meunName = [
  { label: "Ahmedabad" },
  { label: "Bangalore" },
  { label: "Delhi" },
  { label: "Mumbai" },
  { label: "Rajkot" },
  { label: "Surat" },
];
const Css2FormControl = styled(FormControl)({
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

const Vendor = () => {
  const [vendorData, setVendorData] = React.useState([]);
  const [cityname, setCityName] = React.useState(getCookie("city"));
  const [currentpageData, setcurrentpageDate] = React.useState([]);
  const [searchitem, setSearchItem] = React.useState("");
  const [flag, setFlag] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [DataperPage, setDataperPage] = React.useState(9);
  const [state, setState] = React.useState({
    open1: false,
    isLogged: false,
    message: "",
  });
  const { isLogged, open1, message } = state;
  const handleClose = () => {
    setFlag(false);
    setState({
      ...state,
      open1: false,
    });
  };
  const handleChangePage = (event, value) => {
    // console.log(value);
    setPage(value);
  };
  const handleOnSearch = (string, results) => {
    setSearchItem(string);
  };
  const handleOnSelect = (item) => {
    setSearchItem(item.user_name);
  };
  const callVendorData = () => {
    setFlag(true);
    axios({
      method: "get",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        // Authorization: `Bearer ${token}`,
      },
      url: `${process.env.REACT_APP_BASEURL}vendor/fetch_vendor`,
    })
      .then(function (response) {
        if (response.data.status === 504) {
          //console.log("error");
          setFlag(false);
        }
        if (response.data.status === 200) {
          setVendorData(response.data.data);
          setFlag(false);
          setPage(1);
          return 0;
        }
      })
      .catch(function (error) {
        setFlag(false);
      });
  };
  React.useEffect(() => {
    callVendorData();
  }, []);
  React.useEffect(() => {
    // console.log(cityname);
    setcurrentpageDate(
      vendorData
        .filter((e) => e.city === cityname)
        .filter(
          (e) =>
            e.user_name.toLowerCase().includes(searchitem.toLowerCase()) ||
            e.email_id.toLowerCase().includes(searchitem.toLowerCase()) ||
            e.full_name.toLowerCase().includes(searchitem.toLowerCase())
        )
    );
  }, [page, searchitem, cityname]);
  const DisplayVendor = React.useMemo(() => {
    //console.log(currentpageData);
    const indexOfLastPost = page * DataperPage;
    const indexOfFirstPost = indexOfLastPost - DataperPage;
    return currentpageData.slice(indexOfFirstPost, indexOfLastPost);
  }, [page, currentpageData]);
  const backDrop = () => {
    return (
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={flag}
          onClick={handleClose}
        >
          <CircularProgress sx={{ color: "#325240" }} />
        </Backdrop>
      </>
    );
  };
  const errorFunction = () => {
    return (
      <div>
        <Snackbar
          open={open1}
          sx={{ width: "50%", zIndex: 9999 }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            variant="filled"
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </div>
    );
  };

  const SearchBar = (
    <React.Fragment>
      <ReactSearchAutocomplete
        items={[{ user_name: searchitem }, ...vendorData]}
        maxResults={6}
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        placeholder="Search vendor"
        resultStringKeyName="user_name"
        fuseOptions={{
          keys: ["user_name", "email_id"],
        }}
        styling={{
          borderRadius: "9px",
          boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.2)",
          border: "3px solid #325240",

          marginBottom: "7vh",
          placeholderFontSize: "2.5vh",
          fontSize: "2.5vh",
          color: "#325240",
          backgroundColor: "#f9f9f9",
        }}
      />
    </React.Fragment>
  );
  const vendorCardDisplay = () => {
    if (DisplayVendor.length) {
      return (
        <Box>
          <div
            style={{
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              padding: "20px",

              // justifyContent: "space-between",
            }}
          >
            {DisplayVendor.map((data) => {
              return (
                <Box
                  key={data._id}
                  sx={{
                    border: "2px solid #325240",
                    borderRadius: "27px",
                    marginBottom: 3,
                    marginTop: 3,
                    height: "40vh",
                    position: "relative",
                    width: "60vh",
                    margin: "20px",
                    boxShadow: "0px 16px 16px 5px rgba(0, 0, 0, 0.2)",
                    transform: "scale(1)",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.1)",
                      boxShadow: "0 20px 20px 0 rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <img
                    src={banner}
                    alt="banner"
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: "25px",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      padding: "20px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "24px",
                        fontWeight: "600px",
                        color: "#325240",
                      }}
                    >
                      {data.full_name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "300px",
                        color: "#325240",
                        mt: 2,
                      }}
                    >
                      {data.address}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "300px",
                        color: "#325240",
                        mt: 2,
                      }}
                    >
                      <FaPhoneAlt /> +91 {data.phone}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,

                      zIndex: 99,
                      right: 0,
                      mb: 3,
                      mr: 3,
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={data.profile_pic ? data.profile_pic : profile}
                      sx={{
                        width: 75,
                        height: 75,
                        border: 3,
                        borderColor: "#f9f9f9",
                        boxShadow: "0px 16px 16px 10px rgba(0, 0, 0, 0.3)",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      width: "100%",
                      bottom: 0,

                      bgcolor: "#325240",
                      borderBottomRightRadius: "20px",
                      borderBottomLeftRadius: "20px",
                    }}
                  >
                    <IconButton
                      sx={{ color: "#f9f9f9", paddingLeft: 3 }}
                      onClick={() => {
                        if (getCookie("account")) {
                          window.location.replace(`/ibid/vendor/${data._id}`);
                        } else {
                          setState({
                            open1: true,
                            message:
                              "Sorry, You must be logged in to Vendor details",
                          });
                        }
                      }}
                    >
                      <IoIosArrowDroprightCircle size="30" />
                    </IconButton>
                  </Box>
                </Box>
              );
            })}
          </div>

          <Box sx={{ mt: 7, mb: 7, display: "flex", justifyContent: "center" }}>
            <Pagination
              count={Math.ceil(currentpageData.length / DataperPage)}
              variant="outlined"
              sx={{
                "& .css-lqq3n7-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
                  {
                    backgroundColor: "#325240",
                    color: "#fff",
                  },
                "& .css-lqq3n7-MuiButtonBase-root-MuiPaginationItem-root": {
                  backgroundColor: "#f9f9f9",
                  color: "#325240",
                  border: "1px solid #325240",
                },
              }}
              page={page}
              onChange={handleChangePage}
            />
          </Box>
        </Box>
      );
    } else {
      return (
        <Box sx={{ textAlign: "center", padding: "30px" }}>
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
              No Vendor Found!
            </span>
          </Typography>
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
            onClick={() => {
              window.location.replace("/");
            }}
          >
            GO TO HOME PAGE
          </Button>
        </Box>
      );
    }
  };
  return (
    <>
      <Box
        sx={{
          bgcolor: "#f9f9f9",
          position: "relative",
          width: "100%",
          // top: "71px",
        }}
      >
        <div>
          <Box
            sx={{
              paddingLeft: "20px",
              bgcolor: "#f0f0f0",
              borderBottom: "2px outset #f9f9f9",
            }}
          >
            <Breadcrumbs aria-label="breadcrumb" separator="›">
              {/* <Link underline="hover" sx={{ color: "#325240" }} href="/">
                <h2>Home</h2>
              </Link> */}
              <Typography sx={{ color: "#325240" }}>
                <h2>Vendor</h2>
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box
            sx={{
              bgcolor: "#f0f0f0",
              boxShadow: "0px 16px 16px 0px rgba(0, 0, 0, 0.2)",
              border: "1px solid #325240",
              borderRadius: "8px",
              margin: 3,
            }}
          >
            <Box
              spacing={3}
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between", //space-around  //space-evenly
                padding: "10px",
                marginLeft: "30px",
                marginRight: "30px",
              }}
            >
              <h3 style={{ color: "#325240" }}>
                {/* Showing {productNumPerpage.numstart}–
                  {productNumPerpage.numend} of  */}
                Showing {DisplayVendor.length} Results
              </h3>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Box sx={{ minWidth: 220, marginRight: "20px" }}>
                  <Css2FormControl
                    fullWidth
                    required
                    name="vcity"
                    label="City"
                    type="City"
                    id="vcity"
                  >
                    <Autocomplete
                      required
                      id="combo-box-city"
                      options={meunName}
                      value={cityname}
                      popupIcon={<IoMdArrowDropup color="#325240" />}
                      disableClearable
                      onChange={(event, value) => {
                        setCityName(value.label);
                      }}
                      renderInput={(params) => (
                        <TextField
                          required
                          {...params}
                          label="City"
                          name="vcity"
                          id="vcity"
                        />
                      )}
                    />
                  </Css2FormControl>
                </Box>

                <Box
                  sx={{
                    minWidth: 420,
                    marginTop: "4px",
                    // borderRadius: "18px",
                    // boxShadow: "0 16px 16px 0 rgba(0, 0, 0, 0.2)",
                    zIndex: 999,
                    marginLeft: "20%",
                    marginRight: "25%",
                  }}
                >
                  {SearchBar}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            {vendorCardDisplay()}
            {errorFunction()}
            {backDrop()}
          </Box>
        </div>
        <Footer />
      </Box>
    </>
  );
};

export default Vendor;
