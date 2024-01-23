import Session from "supertokens-web-js/recipe/session";

async function logout () {
  await Session.signOut(); 
  window.location.href = "/";
}
module.exports = logout;