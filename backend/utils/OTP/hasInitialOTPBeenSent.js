import { getLoginAttemptInfo } from "supertokens-web-js/recipe/passwordless";

async function hasInitialOTPBeenSent() {
    return await getLoginAttemptInfo() !== undefined;
}
module.exports = hasInitialOTPBeenSent;