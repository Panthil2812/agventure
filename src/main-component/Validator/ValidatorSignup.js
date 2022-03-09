import React from "react";
import validator from "validator";

const ValidatorSignup = (info) => {
  if (validator.isEmpty(info.firstname)) {
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
  } else if (validator.isEmpty(info.password)) {
    return {
      flag: false,
      message: "Please Enter a Password.",
    };
  } else if (
    !validator.isStrongPassword(info.password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return {
      flag: false,
      message:
        "Please password must be at least 8 characters long and at least one Symbols,Number.",
    };
  } else if (validator.isEmpty(info.repassword)) {
    return {
      flag: false,
      message: "Please Enter a Re-password.",
    };
  } else if (!validator.equals(info.repassword, info.password)) {
    return {
      flag: false,
      message: "Password don't Match.Try Again !.",
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
  } else if (!info.checkbox) {
    return {
      flag: false,
      message: "Please click check box.",
    };
  } else {
    return {
      flag: true,
      message: "Sign up Success! Redirecting....",
    };
  }
};
export default ValidatorSignup;
