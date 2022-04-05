import React from "react";
import { makeStyles } from "@mui/styles";
import { GrEdit } from "react-icons/gr";
import axios from "axios";
import qs from "query-string";
import {
  Backdrop,
  Alert,
  Snackbar,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { storage } from "../../Firebase/index";
import profile from "../../assets/Images/profile.png";
import {
  setCookie,
  getCookie,
  deleteCookie,
} from "../Validator/CookieFunction";
const useStyles = makeStyles(() => ({
  avatarUpload: {
    position: "relative",
    maxWidth: "205px",
    margin: "50px auto",
    textAlign: "center",
  },
  avatarEdit: {
    position: "absolute",
    right: "12px",
    zIndex: "1",
    top: "10px",
  },
  cinput: {
    display: "none",
  },
  clabel: {
    display: "inline-block",
    width: "24px",
    height: "24px",
    padding: "5px",
    backgroundColor: "#f9f9f9",
    marginBottom: "0",
    textAlign: "center",
    borderRadius: "100%",
    border: "1px solid transparent",
    boxShadow: "0px 8px 8px 0px rgba(0, 0, 0, 0.12)",
    cursor: "pointer",
    fontWeight: "normal",
    transition: " all .2s ease-in-out",
    "&:hover": {
      background: "#f1f1f1",
      borderColor: "#d6d6d6",
    },
    "&:after": {
      content: "\f040",
      fontFamily: "FontAwesome",
      color: "#757575",
      position: "absolute",
      top: "10px",
      left: "0",
      right: "0",
      textAlign: "center",
      margin: "auto",
    },
  },
  avatarPreview: {
    width: "192px",
    height: "192px",
    position: "relative",
    borderRadius: "100%",
    border: "6px solid #325240",
    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)",
  },
  cdiv: {
    width: " 100%",
    height: "100%",
    borderRadius: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
}));
const ProfilePic = () => {
  const classes = useStyles();
  const account = JSON.parse(getCookie("account"));
  const token = getCookie("token");
  const [imagefile, setImagefile] = React.useState();
  const [imageurl, setImageurl] = React.useState(
    account.profile_pic ? account.profile_pic : profile
  );
  const [state, setState] = React.useState({
    open: false,
    isLogged: false,
    message: "",
  });
  const [flag, setFlag] = React.useState(false);
  const { isLogged, open, message } = state;
  const errorfunction = () => {
    if (isLogged) {
      return (
        <div>
          <Snackbar
            open={open}
            sx={{ width: "50%", zIndex: 9999 }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert
              variant="filled"
              onClose={handleClose}
              sx={{ width: "100%", bgcolor: "#325240" }}
            >
              {message}
            </Alert>
          </Snackbar>
        </div>
      );
    } else {
      return (
        <div>
          <Snackbar
            open={open}
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
    }
  };
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
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const handleupload = () => {
    setFlag(true);

    const uploadTask = storage.ref(`${account._id}`).put(imagefile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        console.log("calling function ...");
        storage
          .ref("")
          .child(account._id)
          .getDownloadURL()
          .then((url) => {
            console.log("main : ", url);
            const Data = {
              _id: account._id,
              email_id: account.email_id,
              profile_pic: url,
            };
            axios({
              method: "post",
              headers: {
                "content-type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${token}`,
              },
              data: qs.stringify(Data),
              url: `${process.env.REACT_APP_BASEURL}user/update_user`,
            })
              .then(function (response) {
                if (response.data.status === 504) {
                  setState({
                    open: true,
                    message: "User does not updated profile image.",
                  });
                  setFlag(false);
                }
                if (response.data.status === 200) {
                  setState({
                    isLogged: true,
                    open: true,
                    message:
                      "Congratulation,You have Successfully Updated Profile image",
                  });
                  setImageurl(response.data.data.profile_pic);
                  setCookie("account", JSON.stringify(response.data.data), 1);
                  setFlag(false);
                }
              })
              .catch(function (error) {
                setState({
                  open: true,
                  message: "Please Try again!",
                });
              });
          });
      }
    );
  };
  const handleonclickImageUpload = () => {
    if (imagefile) {
      //seterrorMessage(imagefile.size);
      if (imagefile.size > 1000001) {
        setState({
          open: true,
          message: "The file is too large,Allowed maximum size is 1MP.",
        });
      } else {
        handleupload();
      }
    } else {
      setState({
        open: true,
        message: "profile image is required",
      });
    }
  };
  const buttonuploadImage = () => {
    return (
      <>
        <Button
          type="submit"
          variant="contained"
          onClick={handleonclickImageUpload}
          sx={{
            mt: 3,
            mb: 2,
            color: "#f9f9f9",
            backgroundColor: "#325240",
            "&:hover": {
              backgroundColor: "#325240",
            },
          }}
        >
          Upload Image
        </Button>
        <div>{errorfunction()}</div>
        <div>{backDrop()}</div>
      </>
    );
  };
  return (
    <>
      <Box sx={{ alignContent: "center", alignItems: "center" }}>
        <div className={classes.avatarUpload}>
          <div className={classes.avatarEdit}>
            <input
              className={classes.cinput}
              type="file"
              id="imageUpload"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => {
                var image = document.getElementById("output");

                image.src = URL.createObjectURL(e.target.files[0]);
                setImagefile(e.target.files[0]);
              }}
            />

            <label className={classes.clabel} htmlFor="imageUpload">
              <GrEdit size={20} />
            </label>
          </div>
          <div className={classes.avatarPreview}>
            <img
              className={classes.cdiv}
              id="output"
              alt="dfvifv"
              src={imageurl}
            />
          </div>
          {buttonuploadImage()}
        </div>
      </Box>
    </>
  );
};
export default ProfilePic;
