import { createCode } from "supertokens-web-js/recipe/passwordless"

async function sendOTP(email) {
  try {
    let response = await createCode({
      email
    })
    /**
         * For phone number, use this:
            
            let response = await createCode({
                phoneNumber: "+1234567890"
            });
         
        */

    if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
      // this can happen due to automatic account linking. See that section in our docs.
    } else {
      // OTP sent successfully.
      window.alert("Please check your email for an OTP")
    }
  } catch (err) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you,
      // or if the input email / phone number is not valid.
      window.alert(err.message)
    } else {
      window.alert("Oops! Something went wrong.")
    }
  }
}

module.exports = sendOTP;