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
function validationForAi(data) {
    const { firstName,lastName,imgUrl,age} = data

  if (!firstName || !lastName) {
    throw new Error("please fill all the fields");
  } else if (!imgUrl) {
    throw new Error("please fill imgUrl");
  } else if (!age) {
    throw new Error("please fill age");
  }
}


function validateEditFields(req){
  
    const allowedFields = ["gender","about","skills","age","imgUrl","firstName"]

   const isAllowedEdit = Object.keys(req.body).every(fields=> allowedFields.includes(fields))
   return isAllowedEdit
}

module.exports = { validationSignupData , validateEditFields,validationForAi};
