const validator = require("validator");

function validationSignupData(data) {
  const { firstName, lastName, email, password } = data;

  if (!firstName || !lastName) {
    throw new Error("please fill all the fields");
  } else if (!validator.isEmail(email)) {
    throw new Error("email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("password is not valid");
  }
}


function validateEditFields(req){
  
    const allowedFields = ["email","gender","about","skills","age","imgUrl"]

   const isAllowedEdit = Object.keys(req.body).every(fields=> allowedFields.includes(fields))
   return isAllowedEdit
}

module.exports = { validationSignupData , validateEditFields};
