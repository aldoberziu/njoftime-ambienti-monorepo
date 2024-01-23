import { getLoginAttemptInfo } from "supertokens-web-js/recipe/passwordless";

async function isThisSameBrowserAndDevice() {
    return await getLoginAttemptInfo() !== undefined;
}

module.exports = isThisSameBrowserAndDevice;