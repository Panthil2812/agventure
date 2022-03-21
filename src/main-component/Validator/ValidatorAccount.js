import validator from "validator";

const ValidatorSignup = (info) => {
  if (validator.isEmpty(info.username)) {
    return {
      flag: false,
      message: "Please Enter a Username.",
    };
  } else if (validator.isEmpty(info.emailid)) {
    return {
      flag: false,
      message: "Please Enter a Email Id.",
    };
  } else if (!validator.isEmail(info.emailid)) {
    return {
      flag: false,
      message: "Please Enter a Valid Email-Id Address.",
    };
  } else if (validator.isEmpty(info.city)) {
    return {
      flag: false,
      message: "Please Select a City Name.",
    };
  } else if (validator.isEmpty(info.state)) {
    return {
      flag: false,
      message: "Please Select a State.",
    };
  } else if (validator.isEmpty(info.phone)) {
    return {
      flag: false,
      message: "Please Enter a Phone number.",
    };
  } else if (!validator.isLength(info.phone, { min: 10, max: 10 })) {
    return {
      flag: false,
      message: "Please Enter a 10-digit Phone Number.",
    };
  } else {
    return {
      flag: true,
      message: "Congratulation,Your account has been Successfully Updated.",
    };
  }
};
export default ValidatorSignup;
