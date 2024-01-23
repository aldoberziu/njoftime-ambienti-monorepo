import { consumeCode } from "supertokens-web-js/recipe/passwordless"

async function handleMagicLinkClicked() {
  try {
    let response = await consumeCode()

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
    } else {
      // this can happen if the magic link has expired or is invalid
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

module.exports = handleMagicLinkClicked;