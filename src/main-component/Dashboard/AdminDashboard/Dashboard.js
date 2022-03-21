import React from "react";
import { makeStyles } from "@mui/styles";
import { GrEdit } from "react-icons/gr";
import { Box, Button } from "@mui/material";
import { storage } from "../../../Firebase/index";
const useStyles = makeStyles(() => ({
  avatarUpload: {
    position: "relative",
    maxWidth: "205px",
    margin: "50px auto",
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
    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.12)",
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
const Dashboard = () => {
  const [imagefile, setImagefile] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState("");
  const classes = useStyles();
  const handleupload = async () => {
    ///  console.log(imagefile);
    const uploadTask = storage.ref(`image/${imagefile.name}`).put(imagefile);
    // console.log(uploadTask._ref("images").getDownloadURL());
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      }
    );
    const imagdf = await storage
      .ref("images")
      .child(imagefile.name)
      .getDownloadURL();
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
              onInput={(e) => {
                if (e.target.files[0]) {
                  var image = document.getElementById("output");
                  image.src = URL.createObjectURL(e.target.files[0]);
                  const file = e.target.files[0];
                  setImagefile(file);
                  console.log(imagefile);
                } else {
                  console.log("panthil");
                }
              }}
            />

            <label className={classes.clabel} htmlFor="imageUpload">
              <GrEdit size={20} />
            </label>
          </div>
          <div className={classes.avatarPreview}>
            <div className={classes.cdiv}>
              <img
                className={classes.cdiv}
                id="output"
                src="http://i.pravatar.cc/500?img=7"
                alt="dfv"
              />
            </div>
          </div>
        </div>
        <Button
          type="submit"
          variant="contained"
          onClick={handleupload}
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
        <div>{imageUrl}</div>
      </Box>
    </>
  );
};
export default Dashboard;
