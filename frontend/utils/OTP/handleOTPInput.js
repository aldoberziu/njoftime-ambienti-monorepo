import { consumeCode } from "supertokens-web-js/recipe/passwordless"

async function handleOTPInput(otp) {
  try {
    let response = await consumeCode({
      userInputCode: otp
    })

    if (response.status === "OK") {
      if (
        response.createdNewRecipeUser &&
        response.user.loginMethods.length === 1
      ) {
        // user sign up success
      } else {
        // user sign in success
      }
      window.location.assign("/home")
    } else if (response.status === "INCORRECT_USER_INPUT_CODE_ERROR") {
      // the user entered an invalid OTP
      window.alert(
        "Wrong OTP! Please try again. Number of attempts left: " +
          (response.maximumCodeInputAttempts -
            response.failedCodeInputAttemptCount)
      )
    } else if (response.status === "EXPIRED_USER_INPUT_CODE_ERROR") {
      // it can come here if the entered OTP was correct, but has expired because
      // it was generated too long ago.
      window.alert("Old OTP entered. Please regenerate a new one and try again")
    } else {
      // this can happen if the user tried an incorrect OTP too many times.
      // or if it was denied due to security reasons in case of automatic account linking
      window.alert("Login failed. Please try again")
      window.location.assign("/auth")
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

module.exports = handleOTPInput;