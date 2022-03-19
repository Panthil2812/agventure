import validator from "validator";

const ValidatorSignup = (info) => {
  if (validator.isEmpty(info.username)) {
    return {
      flag: false,
      message: "Please Enter a Username.",
    };
  } else if (validator.isEmpty(info.firstname)) {
    return {
      flag: false,
      message: "Please Enter a First name.",
    };
  } else if (!validator.isAlpha(info.firstname, ["en-IN"])) {
    return {
      flag: false,
      message: "plase enter vaild first name",
    };
  } else if (validator.isEmpty(info.lastname)) {
    return {
      flag: false,
      message: "Please Enter a Last name.",
    };
  } else if (!validator.isAlpha(info.lastname, ["en-IN"])) {
    return {
      flag: false,
      message: "plase enter vaild last name",
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
  } else if (info.gender === "") {
    return {
      flag: false,
      message: "Please Select a Gender.",
    };
  } else if (info.ctype === "") {
    return {
      flag: false,
      message: "Please Select a Type.",
    };
  } else if (validator.isEmpty(info.address)) {
    return {
      flag: false,
      message: "Please Select a Address.",
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
      message:
        "Congratulation,Your account has been Successfully created, Redirecting....",
    };
  }
};
export default ValidatorSignup;
