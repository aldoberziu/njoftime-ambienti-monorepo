import PasswordlessNode from "supertokens-node/recipe/passwordless";
import SessionNode from "supertokens-node/recipe/session";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles from "supertokens-node/recipe/userroles";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import { appInfo } from "./appInfo";
import { AuthConfig } from "../interfaces";

export let backendConfig = ():AuthConfig => {
    return {
        framework: "express",
        supertokens: {
            // These are the connection details of the app you created on supertokens.com
            connectionURI: "https://st-dev-29e5d5e0-856a-11ee-8cf3-5d664e22d3f6.aws.supertokens.io",
            apiKey: "gooUzpvPLS79=rdHOGRZal-Ctn",
        },
        appInfo,
        // recipeList contains all the modules that you want to
        // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
        recipeList: [
            PasswordlessNode.init({
                flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
                contactMethod: "EMAIL_OR_PHONE",
            }),
            SessionNode.init(),
            Dashboard.init(),
            UserRoles.init(),
            UserMetadata.init(),
        ],
        isInServerlessEnv: true,
    };
};
