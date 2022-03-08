// import * as React from "react";
// import Snackbar from "@mui/material/Snackbar";
// import MuiAlert from "@mui/material/Alert";
// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// export default function Message(props) {
//   const [state, setState] = React.useState({
//     open: props.open1,
//     vertical: "top",
//     horizontal: "center",
//   });

//   const { vertical, horizontal, open } = state;
//   const handleClose = () => {
//     setState({ ...state, open: false });
//   };
//   return (
//     <div>
//       <Snackbar
//         open={state.open}
//         sx={{ width: "50%" }}
//         anchorOrigin={{ vertical, horizontal }}
//         autoHideDuration={3000}
//         onClose={handleClose}
//       >
//         <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
//           {props.message}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// }
// // errorMessage && (
// //   <Snackbar
// //     open={open}
// //     sx={{ width: "50%" }}
// //     anchorOrigin={{ vertical: "top", horizontal: "center" }}
// //     autoHideDuration={3000}
// //     onClose={handleClose}
// //   >
// //     <Alert
// //       onClose={handleClose}
// //       severity="success"
// //       sx={{ width: "100%" }}
// //     >
// //       {errorMessage}
// //     </Alert>
// //   </Snackbar>
// // ) && (
// //   <Snackbar
// //     open={open}
// //     sx={{ width: "50%" }}
// //     anchorOrigin={{ vertical: "top", horizontal: "center" }}
// //     autoHideDuration={3000}
// //     onClose={handleClose}
// //   >
// //     <Alert
// //       onClose={handleClose}
// //       severity="success"
// //       sx={{ width: "100%" }}
// //     >
// //       Login Success! Redirecting....
// //     </Alert>
// //   </Snackbar>
// // )
// Invalid Username/email and passw
