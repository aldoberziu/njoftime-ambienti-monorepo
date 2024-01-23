// const PasswordlessNode = require("supertokens-node/recipe/passwordless");
// const SessionNode = require("supertokens-node/recipe/session");
// const Dashboard = require("supertokens-node/recipe/dashboard");
// const UserRoles = require("supertokens-node/recipe/userroles");
// const { appInfo } = require("./appInfo");

// exports.backendConfig = () => {
//     return {
//         framework: "express",
//         supertokens: {
//             connectionURI: "https://st-dev-29e5d5e0-856a-11ee-8cf3-5d664e22d3f6.aws.supertokens.io",
//             apiKey: "gooUzpvPLS79=rdHOGRZal-Ctn",
//         },
//         appInfo,
//         recipeList: [
//             PasswordlessNode.init({
//                 flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
//                 contactMethod: "EMAIL_OR_PHONE",
//             }),
//             SessionNode.init(),
//             Dashboard.init(),
//             UserRoles.init(),
//         ],
//         isInServerlessEnv: true,
//     };
// };