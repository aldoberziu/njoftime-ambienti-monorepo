import { getLoginAttemptInfo } from "supertokens-web-js/recipe/passwordless";

async function hasInitialMagicLinkBeenSent() {
    return await getLoginAttemptInfo() !== undefined;
}

module.exports = hasInitialMagicLinkBeenSent;