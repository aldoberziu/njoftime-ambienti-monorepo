import { resendCode } from "supertokens-web-js/recipe/passwordless"

async function resendOTP() {
  try {
    let response = await resendCode()

    if (response.status === "RESTART_FLOW_ERROR") {
      // this can happen if the user has already successfully logged in into
      // another device whilst also trying to login to this one.
      window.alert("Login failed. Please try again")
      window.location.assign("/auth")
    } else {
      // OTP resent successfully.
      window.alert("Please check your email for the OTP")
    }
  } catch (err) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      window.alert(err.message)
    } else {
      window.alert("Oops! Something went wrong.")
    }
  }
}
module.exports = resendOTP;
